import React from "react";
import "./styles/AboutUs.css";
import LinkedInIconBlack from "./styles/LinkedInwhite.png";
import Ismail from "./styles/ismail.png";
import Aneeq from "./styles/aneeq.png";
import Usman from "./styles/usman.png";

const AboutUsCards = () => {
  return (
    <>
      <h1 className="about-us-headings">MEET THE TEAM</h1>
      <div className="display-card-container">
        <div className="display-card">
          <img className="profile-pic" src={Ismail}></img>
          <p className="display-card-text">
            Ismail Sajid
          </p>

          <a href="https://www.linkedin.com/in/ismail-sajid/" target="_blank">
            <img className="linkedin-icon" src={LinkedInIconBlack}></img>
          </a>
        </div>
        <div className="display-card">
          <img className="profile-pic" src={Aneeq}></img>
          <p className="display-card-text">
           M. Aneeq Aamir
          </p>
          <div className="linkedin-link">
            <a href="https://www.linkedin.com/in/maneeq" target="_blank">
              <img className="linkedin-icon" src={LinkedInIconBlack}></img>
            </a>
          </div>
        </div>
        <div className="display-card">
          <img className="profile-pic" src={Usman}></img>
          <p className="display-card-text">M Usman Noor</p>
          <div className="linkedin-link">
            <a href="http://linkedin.com/in/usman-noor-0a52b2236" target="_blank">
              <img className="linkedin-icon" src={LinkedInIconBlack}></img>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCards;
