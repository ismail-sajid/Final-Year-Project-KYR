import React from "react";
import "./styles/Intro.css";

type HandleShowVideo = () => void;

interface Props {
  handleShowVideo: HandleShowVideo;
}

const Intro = ({ handleShowVideo }: Props) => {
  return (
    <>
      <div className="text-container">
        <div className="text-postion">
          <p className="intro-text">
            <span>KYR (Know Your Rights)</span> is a platform that provides
            information about laws relevant to your situation, allows you to
            share incidents and receive help from other users, and helps you
            connect with lawyers.
          </p>
          <p className="question" onClick={handleShowVideo}>
            Having trouble using KYR?
          </p>
        </div>
      </div>
    </>
  );
};

export default Intro;
