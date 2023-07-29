import React, { useState, useEffect } from "react";
import "./styles/PromptOutput.css";

type HandleShowPromptOutput = () => void;
type Lawyer = [number, string, string, string, any, string, number];

interface Props {
  applicableLaws: string[];
  applicableTopic: string[];
}

const PromptOutput: React.FC<Props> = ({ applicableLaws, applicableTopic }) => {
  const [Lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [showLawyers, setShowLawyers] = useState(false);
  const [outputContent, setOutputContent] = useState(
    <>
      <ol>
        <h1>Applicable Laws</h1>
        {applicableLaws.map((law, index) => (
          <li key={index}>{law}</li>
        ))}
      </ol>
    </>
  );

  const getApplicableLawyers = () => {
    return Lawyers.map((laywer) => {
      const LawyersID = laywer[0];
      const Name = laywer[1];
      const Specialization = laywer[2];
      const Email = laywer[3];
      const Rating = laywer[4];
      const Price = laywer[5];
      const W_Experience = laywer[6];

      // Return the JSX for each rendered post
      return (
        <li key={LawyersID} className="laywer-card">
          <h4>{Name}</h4>
          <br />

          <div className="lawyer-info">
            <p className="specialization">Specialization: {Specialization}</p>
            <p className="rating">Rating: {Rating}/5</p>
            <p className="experience">Experience: {W_Experience} Years</p>
            <p className="price">Price: {Price}</p>
          </div>
          <p className="lawyer-email">Email: {Email}</p>
        </li>
      );
    });
  };

  const handleApplicableLaws = () => {
    setShowLawyers(false);
    setOutputContent(
      // Update output content with applicable laws
      <>
        <ol>
          <h1>Applicable Laws</h1>
          {applicableLaws.map((law, index) => (
            <li key={index}>{law}</li>
          ))}
        </ol>
      </>
    );
  };

  const handleRelevantLawyers = () => {
    setShowLawyers(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicabletopic: applicableTopic }),
    };

    fetch("http://127.0.0.1:5000/lawyers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLawyers(data.applicablelawyers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (showLawyers && Lawyers.length > 0) {
      setOutputContent(
        // Update output content with applicable lawyers
        <>{getApplicableLawyers()}</>
      );
    }
  }, [Lawyers, showLawyers]);

  const handleGenerateReport = () => {
    setOutputContent(
      <>
        we are in Generate Report.
        <br />
      </>
    );
  };

  return (
    <div className="prompt-container">
      <div className="output-container">{outputContent}</div>
      <div className="action-btn">
        <button className="apli-btn" onClick={handleApplicableLaws}>
          <p>Applicable Laws</p>
        </button>
        <button className="lawyer-btn" onClick={handleRelevantLawyers}>
          <p>Relevant Lawyers</p>
        </button>
      </div>
    </div>
  );
};

export default PromptOutput;
