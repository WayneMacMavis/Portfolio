import React from 'react';
import './App.scss'; // We'll create this for global styles
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* Later we’ll add Home, Projects, About, Contact sections here */}
    </div>
  );
}

export default App;
