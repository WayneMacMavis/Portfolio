import React from 'react';
import './App.scss'; // We'll create this for global styles
import NavBar from './Components/NavBar';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      {/* Later we’ll add Home, Projects, About, Contact sections here */}
    </div>
  );
}

export default App;
