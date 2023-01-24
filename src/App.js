import './App.css';
import video_bg from './assets/home-bg.mp4';
import About from './about';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header"> </header>
   <Navbar />
      <video className='video_bg' autoPlay loop muted>
          <source src={video_bg} type='video/mp4' />
      </video>
      <About />
    </div>
  );
}

export default App;
