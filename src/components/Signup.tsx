import React, { useState } from "react";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import "./styles/Signup.css";
import logo from "./logo.png";
import { Route, Link } from "react-router-dom";
import validator from "validator";


const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isAuthenticated = localStorage.getItem("token");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();


    const firstNameElement = document.getElementById("firstName") as HTMLInputElement;
    const lastNameElement = document.getElementById("lastName") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const dateOfBirthElement = document.getElementById("dateOfBirth") as HTMLInputElement;
    const passwordElement = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordElement = document.getElementById("confirmPassword") as HTMLInputElement;
   


    if (
      firstNameElement &&
      lastNameElement &&
      emailElement &&
      dateOfBirthElement &&
      passwordElement &&
      confirmPasswordElement
     
    ) {
      const firstName = firstNameElement.value;
      const lastName = lastNameElement.value;
      const email = emailElement.value;
      const dateOfBirth = dateOfBirthElement.value;
      const password = passwordElement.value;
      const confirmPassword = confirmPasswordElement.value;
      
      // Check if any required fields are empty
    if (
      firstNameElement.value === "" ||
      lastNameElement.value === "" ||
      emailElement.value === "" ||
      dateOfBirthElement.value === "" ||
      passwordElement.value === "" ||
      confirmPasswordElement.value ===""
    ) {
      // Display an error message or handle the validation error
      window.alert("Please fill in all required fields");
      return; // Prevent form submission
    }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          date_of_birth: dateOfBirth,
          password: password,
        }),
      };


      fetch("http://127.0.0.1:5000/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const checkValue = data.canSignup
          if (checkValue==="Yes"){
          // Handle the response data
            window.location.href = "./login";
          }
          else{
            window.alert("Email Already in Use!")
            window.location.href = "./signup";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Great Password 👌");
    } else {
      setErrorMessage("Password is not strong enough. \n There should be: \n Minimum 8 chaacters \n Minimum 1 lowercase character \n Minimum 1 Uppercase character \n Minimum 1 symbol character \n Minimum 1 number character ");
    }
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordMatch = password === confirmPassword;



  return (
    <>
      
      <Navbar />
      

      {!isAuthenticated &&(
      <div className="form-container">
        <h2 className="main-heading">Sign Up</h2>


        <form className="form-style">
          <label className="name-heading">Enter Your First Name</label>
          <input
            className="input-style"
            type="text"
            id="firstName"
            placeholder="First name.."
            required
          />
          <label className="name-heading">Enter Your Last Name</label>
          <input
            className="input-style"
            type="text"
            id="lastName"
            placeholder="Last name.."
          />
          <label className="name-heading">Enter Your Email address</label>
          <input
            className="input-style"
            type="email"
            id="email"
            placeholder="example@xyz.com"
            required
          />
          <label className="name-heading">Enter Your Date of birth</label>
          <input
            className="input-style"
            type="date"
            id="dateOfBirth"
            placeholder="Date of Birth"
            required
          />
          <label className="name-heading">Enter a password</label>
          <input
            className="input-style"
            type="password"
            id="password"
            onChange={(e) => validatePassword(e.target.value)}
            placeholder="password"
            required
          />
          {errorMessage && (
    <p style={{color: "red"}}>
      {errorMessage.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  )}
          <label className="name-heading">Re-enter the password</label>
            <input
              className="input-style"
              type="password"
              id="confirmPassword"
              placeholder="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!isPasswordMatch && (
              <p style={{ paddingTop: 10, fontWeight: "bold", color: "red" }}>
                Passwords do not match
              </p>
            )}
          <div className="btnclass">
            <Link className="button-style1" to="/" style={{ textDecoration: "none" }}>
              <a className="btn-text">cancel</a>
            </Link>
            <button className="button-style2" onClick={handleSignUp}>
              <span className="btn-text">submit</span>
            </button>
          </div>
        </form>
        <Link className="account-question" to="/login" style={{ textDecoration: "none" }}>
          <a className="account-question">Already have an Account?</a>
        </Link>
      </div>
      )}
      {isAuthenticated &&(
        
        <div className="form-container">
        <Link
        className="account-question"
        to="/profile"
        style={{ textDecoration: "none" }}
      >
        <a className="account-question">You are already logged in, click here to go to Profile</a>
      </Link>
      </div>
      )}
        <HighlightedCases />
      
        <BlackBg />
      
    </>
  );
};


export default SignUp;


