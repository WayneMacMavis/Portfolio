import React from 'react';
import video_bg from './assets/home-bg.mp4';
import "./Home.css";

import './Home.css';

function Home() {

  return (
    <div className="App">
      <header className="App-header"> </header>
      <video className='video_bg' autoPlay loop muted>
          <source src={video_bg} type='video/mp4' />
      </video>
      <div className='text-container'>
    <h1 class="text">Wayne Mac Mavis</h1>
    <h2 class="text">Web Developer</h2>
    </div>
    </div>
  );
}

export default Home;