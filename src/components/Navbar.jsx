import React, { useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="right-nav">
        <div className="ham-burger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className={`menu-show ${showMenu ? "" : "menu-hide"}`}>
          <div className="menu-item">Home</div>
          <div className="menu-item">About</div>
          <div className="menu-item">Contact</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
