import React, { useState,useEffect } from "react";
import "./styles/EditProfile.css";
import validator from "validator";

interface Props {
  handleCancelEdit: () => void;
}

const EditProfile = ({ handleCancelEdit }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const email= localStorage.getItem("token");

  const passwordChange = () =>{
  
          const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: email,
              password:password}),
            };
          
         fetch("http://127.0.0.1:5000/change-password", requestOptions)
         .then((response) => response.json())
          .then((data) => {
         
          if (data.Message==="Success"){
          // Handle the response data
            window.alert("Password is changed!")
            
            handleCancelEdit()
          }
          else{
            window.alert("Password did not change!")
            
          }})
         .catch((error) => {
          console.error("Error:", error);
        })
        
        
  };
          
  


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordMatch = password === confirmPassword;

  

  const validatePassword = (value: string) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Password is not strong enough. \n There should be: \n Minimum 8 chaacters \n Minimum 1 lowercase character \n Minimum 1 Uppercase character \n Minimum 1 symbol character \n Minimum 1 number character ");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

     
  };

  return (
    <div className="edit-profile-div">
      <form className="form-style-editprofile" onSubmit={handleSubmit}>
        <h4>Change Password</h4>
        <input
          className="input-style-editprofile"
          type="password"
          placeholder="Enter new Password"
          value={password}
          onChange={handlePasswordChange}
          
        />

        <input
          className="input-style-editprofile"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        {!isPasswordMatch && <p style={{color: "red"}}>Passwords do not match</p>}
        
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

        <div>
          <button className="btn-edit-profile" onClick={handleCancelEdit}>
            Cancel
          </button>
          <button className="btn-edit-profile" type="submit" onClick={passwordChange}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
