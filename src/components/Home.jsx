import React from "react";
import "./Home.scss";
import heroIllustration from "../Assets/home_illustration.svg";

const Home = () => {
  return (
    <section className="home">
      {/* Left side text */}
      <div className="home__content">
        <h1>Hi, I’m Wayne 👋</h1>
        <h2>Creative Frontend Developer</h2>
        <p>
          I design and build modern, responsive websites with a focus on
          performance, accessibility, and clean design.
        </p>
        <button className="btn-primary">View My Work</button>
      </div>

      {/* Right side illustration with wavey edge */}
      <div className="home__illustration">
        <img src={heroIllustration} alt="Working remotely illustration" />
      </div>
    </section>
  );
};

export default Home;
