import React from "react";
import "./styles/ContactUs.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMessage,
  

} from "@fortawesome/free-solid-svg-icons";

import facebook from  "./styles/facebook.png";
import instagram from "./styles/instagram.png";
import whatsapp from "./styles/whatsapp.png";
import email from "./styles/gmail.png";

const ContactUs = () => {
  
  window.scrollTo(0, 0);
  const [inputValue, setInputValue] = useState("");
  const [SubmittedMessage, setSubmittedMessage] = useState(false)
  const handleContact = (e: React.FormEvent) => {


  const fullNameElement = document.getElementById("fullName") as HTMLInputElement;
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const numberElement = document.getElementById("number") as HTMLInputElement;
  const messageElement = document.getElementById("message") as HTMLInputElement;

  if (
    fullNameElement &&
    emailElement &&
    numberElement &&
    messageElement 
    )
   {
    const fullName = fullNameElement.value;
    const email = emailElement.value;
    const number= numberElement.value;
    const message= messageElement.value
    if (
      fullNameElement.value === "" ||
      emailElement.value === "" ||
      numberElement.value === "" ||
      messageElement.value === "" 
      
    ) {
      // Display an error message or handle the validation error
      window.alert("Please fill in all required fields");
      return; // Prevent form submission
    }
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: fullName,
      email: email,
      number:number,
      message:message,
    
    }),
  }
  


    fetch("http://127.0.0.1:5000/contact-form", requestOptions)
    .then((response) => response.json())
      .then((data) => {
        setSubmittedMessage(true)
      })
    .catch((error) => {
      console.error("Error:", error);
    });
}
};


  
  
   
  return (
    <>
      <Navbar />
      <div className="contact-us-container" >
        <h2 className="main-heading-cu">
            GET IN TOUCH
        </h2>
        <p>Tell us about what do you have in mind!</p>
        <div className="logos-cu">
        <a href="https://www.google.com">
            <img className="contact-us-icon" src={facebook}></img>
        </a>
        <a href="https://www.google.com">
            <img className="contact-us-icon" src={instagram}></img>
        </a>
        <a href="https://www.google.com">
            <img className="contact-us-icon" src={whatsapp}></img>
        </a>
        <a href="mailto:KYRPakistan@gmail.com">
            <img className="contact-us-icon" src={email}></img>
        </a>
        </div>
        <main className="grid-container-contact-us">
            <div className="main-heading-grid">
                <h3>
                    Contact Us!
                </h3>
                <p>
                    Tell us how an we make things better for us and you!
                </p>
            </div>
            <div className="input-style1">
          <span>
          <FontAwesomeIcon icon={faUser} className="icon-cu" />
          </span>
          <input
            className="input-style-placeholder"
            type="text"
            placeholder="Full Name" 
            id="fullName"  
          />
          </div>
          <div className="input-style2">
          <span>
          <FontAwesomeIcon icon={faPhone} className="icon-cu" />
          </span>
          <input
            className="input-style-placeholder"
            type="text"
            id="number"
            placeholder="Contact Number"   

          />
          </div>
          <div className="input-style3">
          <span>
          <FontAwesomeIcon icon={faEnvelope} className="icon-cu" />
          </span>
          <input
            className="input-style-placeholder"
            type="email"
            id="email"
            placeholder="Email Address"
            
          />
          </div>
         
          
          <textarea
            className="text-style4"
            placeholder="Enter Your Message.." 
            id="message"

          />
          
          <button className="button-cu" onClick={handleContact}>
            Submit
          </button>
          {SubmittedMessage && (
            <p className="thank-you-msg">Thank you for the message!</p>
          )}
          </main>
          </div>
      <HighlightedCases />
      <BlackBg />
    </>
  );
}

export default ContactUs;
