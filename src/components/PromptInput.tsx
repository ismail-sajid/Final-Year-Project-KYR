import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/PromptInput.css";
import PostOptions from "./PostOptions";
import PromptOutput from "./PromptOutput";


type HandleShowPromptOutput = () => void;


interface Props {
  handleShowPromptOutput: HandleShowPromptOutput;


}


const PromptInput = ({ handleShowPromptOutput }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const isAuthenticated = localStorage.getItem("token");
  const [applicableLaws, setApplicableLaws] = useState<string[]>([]);
  const [showPromptOutput, setShowPromptOutput] = useState(false);
  const [applicabletopic, setApplicableTopic] = useState<string[]>([]);
  const [StringApplicableTopic, setStringApplicableTopic] = useState("");


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const handlePostPrompt = () => {
    setShowPromptOutput(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: inputValue }),
    };


    fetch("http://127.0.0.1:5000/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Set the applicableLaws state with the received data
        setApplicableLaws(data.applicablelaws);
        setApplicableTopic(data.applicabletopic);
        


        // Call the desired function to show the prompt output
        setShowPromptOutput(true);
        handleShowPromptOutput();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handlePostAboutThis = () => {
    setShowPostOptions(false);
    if (isAuthenticated) {
      setShowPromptOutput(false);
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue }),
      };
  
      fetch("http://127.0.0.1:5000/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // Set the applicabletopic state with the received data
           setStringApplicableTopic(data.applicabletopic)
           setApplicableLaws(data.applicablelaws)
      
           
          
           
           
          // Call the desired function to show the prompt output
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    
      setShowPostOptions(true);
     
    } else {
      setButtonClicked(true);
    }
  };


  const handleCancelPost = () => {
    setShowPostOptions(false);
  };
  const handleCloseLaws = () => {
  setShowPromptOutput(false)
};
  
  return (
    <>
      <div className="prompt-input-container">
        <textarea
          className="prompt-input"
          placeholder="Tell us what happened..."
          value={inputValue}
          onChange={handleChange}
        />
        <div className="btns">
          <button className="prompt-btn1" onClick={handlePostAboutThis}>
            Post About This
          </button>
          {!showPromptOutput && (
          <button className="prompt-btn2" onClick={handlePostPrompt}>
            Search Applicable Laws
          </button>
          )}
          {showPromptOutput && (
          <button className="prompt-btn2" onClick={handleCloseLaws}>
            Close
          </button>
          )}
        </div>


        {buttonClicked && !isAuthenticated && (
          <Link to="/login"  style={{ textDecorationColor: "White" }}><button className="login-msg">
            You need to log in first.
          </button>
          </Link>
        )}
      </div>
      
      {showPostOptions && isAuthenticated && (
        <PostOptions handleCancelPost={handleCancelPost} 
        prompt={inputValue}
        applicabletopic={StringApplicableTopic}
        applicableLaws={applicableLaws}

        />
      )}
      {showPromptOutput && (
        <PromptOutput
        applicableLaws={applicableLaws} applicableTopic={applicabletopic}

      />
)}
    </>
  );
};


export default PromptInput;
