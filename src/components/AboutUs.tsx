import React from "react";
import "./styles/AboutUs.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import Logo from "./styles/logo.png";
import AboutUsCards from "./AboutUsCards";
import LinkedInIconBlack from "./styles/LinkedInblack.png";
import AboutUsText from "./AboutUsText";

const AboutUs = () => {
  
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar />
      <div className="about-us-container">
        <div className="image-text-container">
          <img className="main-image" src={Logo} />

          <AboutUsText />
          <AboutUsCards />
        </div>
      </div>

      <HighlightedCases />
      <BlackBg />
    </>
  );
};

export default AboutUs;
