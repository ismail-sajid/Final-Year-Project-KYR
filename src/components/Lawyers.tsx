import React, {useState} from "react";
import "./styles/Lawyers.css";

interface Props {
    applicabletopic: string[];
  }
  
const Lawyers: React.FC<Props> = ({ applicabletopic }) => {
  const [ApplicableLawyers, setApplicableLawyers] = useState<string[]>([]);
  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicabletopic: applicabletopic}),
  };

 if(applicabletopic.length>4){
  fetch("http://127.0.0.1:5000/lawyers", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      
      // Set the applicableLaws state with the received data
      setApplicableLawyers(data.applicablelawyers);
    
      


      // Call the desired function to show the prompt output
     
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  else{
    setApplicableLawyers(["No Lawyer Found"]);
  }
  return (
    <>
      <p>{ApplicableLawyers}</p>
    </>
  );
};

export default Lawyers;
