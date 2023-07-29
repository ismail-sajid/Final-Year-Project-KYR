import React from "react";
import "./styles/PageNotFound.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="page-not-found-container">
        <div className="error-text-container">
          <h3 className="main-heading-error">PAGE NOT FOUND</h3>
        </div>
      </div>

      <HighlightedCases />
      <BlackBg />
    </>
  );
};

export default PageNotFound;
