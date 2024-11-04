import React from "react";
import "./hero.css";

function Hero() {
  return (
    <div className="hero-section">
      <h1>Blog Boldly, Share Freely</h1>
      <p>Your Journey, Your Words, Our Platform</p>
      <a href="/login" className="cta-button">
        Start Your Story now
      </a>
    </div>
  );
}

export default Hero;
