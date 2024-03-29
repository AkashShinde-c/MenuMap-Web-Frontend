import React, { useContext, useRef, useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.svg";
import logo_round from "../assets/logo.svg";
import home from "../assets/home.svg";
import contact from "../assets/contact.svg";
import about from "../assets/about.png";
import About from "./About";
import MyContext from "../context/MyContext";
import notes from "../assets/notes.png"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { showAbout, updateValue } = useContext(MyContext);
  const chceckboxRef = useRef();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar-custom" id="navbar-custom">
      {showAbout && <About />}
      <div className="left-nav">
      <div className="logo cursor-pointer" onClick={() => navigate('/')}>
  <img src={logo_round} alt="logo" />
  <span className="mr-2">Menu Map</span> {/* Adding margin-right utility class */}
</div>
<div>
  <p className="cursor-pointer font-bold text-white" onClick={() => navigate('/tabview')}>
    Tab View
  </p>
</div>
      </div>
      <div className="right-nav">
        
        <label className="btn btn-circle btn-sm  swap swap-rotate bg-#9400FF">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={toggleMenu} ref={chceckboxRef}/>

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        <div className={`menu-show ${showMenu ? "" : "menu-hide"}`} onClick={showMenu ?()=>{toggleMenu(); chceckboxRef.current.checked = false}:()=>{}} anchor="navbar-custom">
        {showMenu && <div className="wrapper   absolute bottom-0 top-0 w-screen h-screen  bg-transparent" onClick={toggleMenu}></div>}
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
          <div className="nav-item">
            <img src={notes} alt="contact" />
            <a href="https://wa.me/+919373801864" target="_blank">
              <div className="menu-item">Messages</div>
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
