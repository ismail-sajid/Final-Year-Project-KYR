import React, { useState } from "react";
import "./styles/HowDoesItWork.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import HowDoesItWorkText from "./HowDoesItWorkText";

type HandleShowDetails = () => void;

interface Props {
  handleShowDetails: HandleShowDetails;
}

const HowDoesItWork = () => {
  window.scrollTo(0, 0);
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };
  return (
    <>
      <Navbar />
      <div className="how-does-it-container">
        <div className="how-does-it-text-container">
          <h2 className="main-heading">How Does It Work</h2>
          <p className="how-does-it-text">
            Our platform offers a seamless way to search for laws by leveraging
            Natural Language Processing techniques. We have developed a robust
            system that simplifies the process and provides you with relevant
            information tailored to your specific situation. Here's how it
            works:
            <br />
            <div className="how-does-it-work-video">
              <iframe
                className="how-does-it-work-video-player"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/FjjHfztsZFc"
                title="KYR Tutorial"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <br />
            <p className="details-question" onClick={handleShowDetails}>
              Show More Details..
            </p>
            {showDetails && (
              <div>
                <HowDoesItWorkText />
              </div>
            )}
          </p>
        </div>
      </div>

      <HighlightedCases />
      <BlackBg />
    </>
  );
};

export default HowDoesItWork;
