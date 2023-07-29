import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HighlightedCases from "./components/HighlightedCases";
import Video from "./components/Video";
import PromptInput from "./components/PromptInput";
import PromptOutput from "./components/PromptOutput";
import CasePost from "./components/CasePost";
import Intro from "./components/intro";
import BlackBg from "./components/BlackBg";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./HomePage";
import SignUp from "./components/Signup";
import AboutUs from "./components/AboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import HowDoesItWork from "./components/HowDoesItWork";
import Login from "./components/Login";
import Profile from "./components/Profile"
import PageNotFound from "./components/PageNotFound";
import ContactUs from "./components/ContactUs";
import OnlyAllPosts from "./components/OnlyAllPosts";
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<OnlyAllPosts />} />
         
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-does-it-work" element={<HowDoesItWork />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
