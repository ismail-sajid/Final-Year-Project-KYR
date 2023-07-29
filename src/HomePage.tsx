import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HighlightedCases from "./components/HighlightedCases";
import Video from "./components/Video";
import PromptInput from "./components/PromptInput";
import PromptOutput from "./components/PromptOutput";
import CasePost from "./components/CasePost";
import Intro from "./components/intro";
import BlackBg from "./components/BlackBg";
import AllPostsNew from "./components/AllPostsNew";
import "./App.css";


function HomePage() {
  window.scrollTo(0, 0);
  const [showPromptOutput, setShowPromptOutput] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [applicableLaws, setApplicableLaws] = useState<string[]>([]);
  


  const handleShowPromptOutput = () => {
    setShowPromptOutput(true);
  };

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  return (
    <>
      <div className="bodybg">
        <div>
          <Navbar />
        </div>
        <div>
          <Intro handleShowVideo={handleShowVideo} />
        </div>

        {showVideo && (
          <div>
            <Video />
          </div>
        )}
        
        <div>
          <PromptInput handleShowPromptOutput={handleShowPromptOutput} />
        </div>
        <div>
          <HighlightedCases />
        </div>
        <div>
          <AllPostsNew/>
        </div>
        <div>
          <BlackBg />
        </div>

        
      </div>
    </>
  );
}

export default HomePage;