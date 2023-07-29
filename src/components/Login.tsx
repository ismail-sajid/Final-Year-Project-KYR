import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Signup.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import Profile from "./Profile";

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Email, setMail] = useState<string[]>([]);
  const isAuthenticated = localStorage.getItem("token");

  // Function to handle form submission
  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("http://127.0.0.1:5000/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        // Example: check if login was successful
        setMail(data.Email);
        if (data.Email !== "") {
          localStorage.setItem("token", data.Email);
          window.location.href = "/home";
        } else {
          localStorage.setItem("token", "");
          window.alert("Invalid credentials!");

          // Invalid email or password, display error message
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <Navbar />
      {!isAuthenticated && (
        <div className="form-container">
          <h2 className="main-heading">Login</h2>

          <form className="form-style">
            <label className="name-heading">Enter Your Email Addess</label>
            <input
              className="input-style"
              type="Email"
              placeholder="example@xyz.com"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <label className="name-heading">Enter Your Password</label>
            <input
              className="input-style"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <div className="btnclass">
              <Link
                className="button-style1"
                to="/"
                style={{ textDecoration: "none" }}
              >
                <a className="btn-text">cancel</a>
              </Link>

              <button
                className="button-style2"
                style={{ textDecoration: "none" }}
                onClick={handleSubmit}
              >
                <a className="btn-text">Login</a>
              </button>
            </div>
          </form>
          <Link
            className="account-question"
            to="/signup"
            style={{ textDecoration: "none" }}
          >
            <a className="account-question">Don't have an Account?</a>
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <div className="form-container">
          <Link
            className="account-question"
            to="/profile"
            style={{ textDecoration: "none" }}
          >
            <a className="account-question">
              You are already logged in, click here to go to Profile
            </a>
          </Link>
        </div>
      )}
      <HighlightedCases />
      <BlackBg />
    </>
  );
};

export default Login;
