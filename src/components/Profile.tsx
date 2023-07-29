import React, { useState,useEffect } from "react";
import "./styles/Profile.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import UserPosts from "./UserPosts"



const Profile = () => {
  
  window.scrollTo(0, 0);

    const posts=["hello","hi"]
    const isAuthenticated = localStorage.getItem("token");
    const [ProfileSettings,showProfileSettings]=useState(false)
    const email= localStorage.getItem("token");
    const [name,setName]=useState("")
    useEffect(() => {
      const fetchData = async () => {
        try {
          const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: email }),
            };
          
          const response = await fetch("http://127.0.0.1:5000/first-name", requestOptions);
          const data = await response.json();
    
          
          setName(data.First_Name);}
      catch (error) {
              console.error("Error:", error);
            }
          };
          
  
 fetchData();
    }, []);
   
    const handleProfileSettings = () => {
      showProfileSettings(true);
    };

    const handleCancelEdit =() => {
      showProfileSettings(false);
    }
  return (
    <>
      <Navbar />

      { isAuthenticated &&(
      <div className="profile-container">
        <div className="profile-item-container">
            <div className="heading-and-button">
            <h3 className="profile-heading">Hello {name}!</h3>
            <button onClick={handleProfileSettings}>Change Password</button>
            </div>
            {ProfileSettings &&(
              <EditProfile handleCancelEdit={handleCancelEdit} />
              )
            }
            
            <UserPosts/>


        </div>
      </div>
      
      )}
      { !isAuthenticated &&(
      <div className="profile-container">
        <div className="profile-item-container">
            
                <h3 className="profile-heading">Hello Anonymous</h3>
                
          <p>
          You need to <Link to="/login">log in</Link> first.
        </p>
        </div>
      </div>
      )}

      <HighlightedCases />
      <BlackBg />
    </>
  );
};

export default Profile;