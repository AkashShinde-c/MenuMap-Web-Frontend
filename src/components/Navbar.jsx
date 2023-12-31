import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.svg";
import logo_round from "../assets/logo_round.svg";
import home from "../assets/home.svg";
import contact from "../assets/contact.svg";
import about from "../assets/about.png";
import About from "./About";
import MyContext from "../context/MyContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {showAbout,updateValue} = useContext(MyContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      {showAbout&&<About/>}
      <div className="left-nav">
        <div className="logo">
          <img src={logo_round} alt="logo" />
          <span>Menu Map</span>
        </div>
      </div>
      <div className="right-nav">
        <div className="ham-burger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className={`menu-show ${showMenu ? "" : "menu-hide"}`}>
          <div className="nav-item" onClick={toggleMenu}>
            <img src={home} alt="home" />
            <div className="menu-item">Home</div>
          </div>
          <div
            className="nav-item"
            onClick={() => {
              updateValue(!showAbout);
              console.log("Came here", showAbout);
            }}
          >
            <img src={about} alt="about" />
            <div className="menu-item">About</div>
          </div>
          <div className="nav-item">
            <img src={contact} alt="contact" />
            <a href="https://wa.me/+919373801864" target="_blank">
              <div className="menu-item">Contact</div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
