import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header-navigation">
      <h1 className="logo-text">blogIt</h1>
      <nav>
        <ol className="navigation-list">
          <li className="navigation-item">
            {" "}
            <a href="/" className="navigation-link">
              home
            </a>
          </li>
          <li className="navigation-item">
            {" "}
            <a href="/About" className="navigation-link">
              about blogIt
            </a>
          </li>
          <li className="navigation-item">
            {" "}
            <a href="/login" className="navigation-link">
              login
            </a>
          </li>
          <li className="navigation-item">
            {" "}
            <a href="/sign up" className="navigation-link">
              sign up
            </a>
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Header;
