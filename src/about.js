import Profile from './assets/profile.jpg';

import './about.css';

function App() {
  return (
    <section className="about-section">
      <h1>About</h1>
      <div className="all-sections">
        <div data-aos="fade-right" className="mini-section">
          <div className="hexagon">
            <i className="fa fa-fighter-jet" aria-hidden="true"></i>
          </div>
          <div className="text-mini-section">
            <h2>Fast</h2>
            <p>
              Fast load times and lag free interaction, my highest priority.
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className="mini-section">
          <div className="hexagon">
            <i className="fa fa-window-restore" aria-hidden="true"></i>
          </div>
          <div className="text-mini-section">
            <h2>Responsive</h2>
            <p>My layouts will work on any device, big or small.</p>
          </div>
        </div>
        <div data-aos="fade-up" className="mini-section">
          <div className="hexagon">
            <i className="fa fa-rocket" aria-hidden="true"></i>
          </div>
          <div className="text-mini-section">
            <h2>Intuitive</h2>
            <p>Strong preference for easy to use, intuitive UX/UI.</p>
          </div>
        </div>
        <div data-aos="fade-left" className="mini-section">
          <div className="hexagon">
            <i className="fa fa-bolt" aria-hidden="true"></i>
          </div>
          <div className="text-mini-section">
            <h2>Dynamic</h2>
            <p>
              Websites don't have to be static, I love making pages come to life
            </p>
          </div>
        </div>
      </div>
      <div className="who-am-i">
        <div data-aos="zoom-in-up" className="image-me"><img src={Profile} alt='Me'></img></div>
        <div className="all-who">
          <h2 data-aos="zoom-in-down">Who am I?</h2>
          <div className="div-para">
            <p data-aos="zoom-in-down">
              Hello everyone, my name is Heithem Kacem and I am a Front End
              Developer from Tunisia, Mahdia. I am self-taught developer,
              passionate and very fast learner. I have learned how to program
              through various resources, currently I am learning on Freecodecamp
              and Udacity. I am eager to learn and grow - Everyday. My ambition
              is to make awesome websites, not just good enough.
            </p>
          </div>
          <button data-aos="zoom-in-down" className="hvr-bounce-to-right">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;