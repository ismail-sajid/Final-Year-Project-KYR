import React from "react";
import "./styles/Navbar.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBullhorn,
  faListUl,
  faBookOpen,
  faQuestion,
  faLock,
  faHeadphones,
  faHome,
  faBars,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import  { useRef } from "react";

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = localStorage.getItem("token");
 
  

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };
  const setAuthorized=()=>{
    localStorage.setItem("token", "");
    window.location.href = "/home";
  };
  

  return (
    <>
    <div className="empty-container">
        <div className="nav-container ">
          <nav className="main-nav" ref={navRef}>

            
            <Link to="/" style={{ textDecoration: "none" }}>
              <img className="logo" src={logo}></img>

             
            </Link>
            
            <ul className="nav-items">
            
            <Link to="/" style={{ textDecoration: "none" }}>
            {isAuthenticated && (

                  <button className="nav-item-button" onClick={setAuthorized}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="icon-button" />
                    <span className="nav-text-style-button">Sign Out</span>
                  </button>
                
                  
                  )
                }
                <li className="nav-item">
                  <FontAwesomeIcon icon={faHome} className="icon" />
                  <span className="nav-text-style">Home</span>
                </li>
              </Link>
              {!isAuthenticated && (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <span className="nav-text-style">Login/Register</span>
                  </li>
                  </Link>
                  )
                }
                {isAuthenticated && (
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <span className="nav-text-style">Profile</span>
                  </li>
                </Link>
                  
                  )
                }
              
              <Link to="/posts" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <FontAwesomeIcon icon={faBullhorn} className="icon" />
                  <span className="nav-text-style">Posts</span>
                </li>
              </Link>
              
              <Link to="/about" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <FontAwesomeIcon icon={faQuestion} className="icon" />
                  <span className="nav-text-style">About Us</span>
                </li>
              </Link>
              <Link to="/how-does-it-work" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <FontAwesomeIcon icon={faBookOpen} className="icon" />
                  <span className="nav-text-style">How Does It Work</span>
                </li>
              </Link>
              <Link to="/privacy" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <span className="nav-text-style">Privacy Policy</span>
                </li>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <FontAwesomeIcon icon={faHeadphones} className="icon" />
                  <span className="nav-text-style">Contact Us</span>
                </li>
              </Link>
              <li className="nav-item-close">
                <button className="nav-btn1" onClick={showNavbar}>
                  <FontAwesomeIcon icon={faXmark} className="icon" />
                </button>
              </li>
              
            </ul>
            </nav>
          <div className="both">
            <img className="newlogo" src={logo}></img>
            <button className="nav-btn1" onClick={showNavbar}>
              <FontAwesomeIcon icon={faBars} className="icon-nav" />
            </button>
          </div>
        </div>
      </div>
    </>

  );
}

export default Navbar;