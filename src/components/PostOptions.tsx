import React, { useState } from "react";
import "./styles/PostOptions.css";
import { format } from "date-fns";



interface Props {
  handleCancelPost: () => void;
  applicabletopic: string;
  prompt: string;
  applicableLaws: string[];
}

const PostOptions: React.FC<Props> = ({
  handleCancelPost,
  prompt,
  applicabletopic,
  applicableLaws,
}) => {
  const [topicValue, setTopicValue] = useState(applicabletopic);
  const name = "anonymous";
  const laws = applicableLaws;
    
  const content = prompt;
  const token = localStorage.getItem("token");
  const [Anon, SetAnon] = useState(false);

  const handlePostNow = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: token,
        laws: laws.join("#"),
        prompt: content,
        topics: topicValue,
          time: formattedDate,
        anon: Anon,
      }),
    };

    fetch("http://127.0.0.1:5000/post-about-this", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAnonYes = () => {
    SetAnon(true);
  };

  const handleAnonNo = () => {
    SetAnon(false);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicValue(event.target.value);
  };

  return (
    <div className="post-options-container">
     
      <div className="post-options-form-area">
        <form className="form-style-postoption">
          <label className="post-label">Write Title</label>
          <input
            className="post-input"
            type="text"
            defaultValue={applicabletopic}
            onChange={handleTopicChange}
          />
          <br />
          <label className="post-label2">Anonymous</label>
          <br />
          <div className="post-input2">
            <div>
            <input
              type="radio"
              id="yes"
              name="anonymous"
              onClick={handleAnonYes}
            />
            <label htmlFor="yes">&nbsp; Yes</label>
            </div>
            <div>
            <input
              type="radio"
              id="no"
              name="anonymous"
              onClick={handleAnonNo}
            />
            <label htmlFor="no">&nbsp; No</label>
            </div>
          </div>
          <button className="post-btn" onClick={handleCancelPost}>
            Cancel
          </button>
          <button className="post-btn2" onClick={handlePostNow}>
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostOptions;
