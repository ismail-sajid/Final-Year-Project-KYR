import React, { useState } from "react";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import AllPostsNew from "./AllPostsNew";



function OnlyAllPosts() {
  window.scrollTo(0, 0);
  
  return (
    <>
      <div className="bodybg">
        <div>
          <Navbar />
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

export default OnlyAllPosts;