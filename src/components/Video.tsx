import React from "react";
import "./styles/Video.css";

const Video = () => {
  return (
    <div className="video">
      <iframe
        className="video-player"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/FjjHfztsZFc"
        title="KYR Tutorial"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
