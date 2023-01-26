import './App.css';
import Home from './Home';
import About from './about';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Routex, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routex>
      <div className="App">
        <Navbar />
        <Home />
        <About />
      </div>
      <Routes>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
      </Routes>
    </Routex>
  );
}

export default App;
