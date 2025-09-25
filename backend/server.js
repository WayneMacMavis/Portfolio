import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const msg = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  };

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Mock email:', msg);
      return res.status(200).json({ success: 'Mock message sent!' });
    }

    await sgMail.send(msg);
    res.status(200).json({ success: 'Message sent successfully!' });
  } catch (err) {
    console.error('SendGrid error:', err.response?.body || err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);