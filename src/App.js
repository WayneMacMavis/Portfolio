import React from 'react';
import './App.scss'; // We'll create this for global styles
import ProgressBar from "./components/ProgressBar";
import NavBar from './components/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <NavBar />
      <Home />
      <About />
      <Skills />
      <Projects />
    </div>
  );
}

export default App;
