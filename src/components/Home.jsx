import React from "react";
import "./Home.scss";
import heroIllustration from "../Assets/home_illustration.svg";
import blobShape from "../Assets/blob.svg";

const Home = () => {
  return (
    <section className="home">
      {/* Left Side - Text */}
      <div className="home__content">
        <h1>Hi, I’m Wayne 👋</h1>
        <h2>Creative Frontend Developer</h2>
        <p>
          I design and build modern, responsive websites with a focus on
          performance, accessibility, and clean design.
        </p>
        <button className="btn-primary">View My Work</button>
      </div>

      {/* Illustration wrapper */}
      <div className="home__illustration-wrapper">
        {/* Masked blob background */}
        <div
          className="home__illustration-blob"
          style={{
            WebkitMask: `url(${blobShape}) no-repeat center / 116% 116%`,
            mask: `url(${blobShape}) no-repeat center / 116% 116%`,
          }}
        />

        {/* Image positioned above/outside mask */}
        <img
          className="home__illustration-image"
          src={heroIllustration}
          alt="Working remotely illustration"
        />
      </div>
    </section>
  );
};

export default Home;
