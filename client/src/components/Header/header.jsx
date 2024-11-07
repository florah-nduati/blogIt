import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
   
    navigate("/login"); 
  };

  return (
    <div className="header-navigation">
      <h1 className="logo-text">blogIt</h1>
      <nav>
        <ol className="navigation-list">
          <li className="navigation-item">
            <a href="/" className="navigation-link">home</a>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navigation-item">
                <a href="/write" className="navigation-link">Write</a>
              </li>
              <li className="navigation-item">
                <a href="/blogs" className="navigation-link">Blogs</a>
              </li>
              <li className="navigation-item">
                <a href="/profile" className="navigation-link">Profile</a>
              </li>
              <li className="navigation-item">
                <a href="#" className="navigation-link" onClick={handleLogout}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li className="navigation-item">
                <a href="/login" className="navigation-link">login</a>
              </li>
              <li className="navigation-item">
                <a href="/sign up" className="navigation-link">sign up</a>
              </li>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
}

export default Header;

