import React from 'react';
import './App.scss'; // We'll create this for global styles
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About/About';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <About />
      <Skills />
      <Projects />
      {/* Later we’ll add Home, Projects, About, Contact sections here */}
    </div>
  );
}

export default App;
