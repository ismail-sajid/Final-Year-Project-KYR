import React from "react";
import "./styles/PrivacyPolicy.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";

const PrivacyPolicy = () => {
  
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar />
      <div className="privacy-policy-container">
        <div className="privacy-text-container">
          <h2 className="main-heading">Privacy Policy</h2>
          <p className="privacy-content-text">
            At Know Your Rights Platform, we are committed to protecting the
            privacy and security of our users. This Privacy Policy outlines how
            we collect, use, and safeguard the information you provide to us. By
            accessing and using our website, you consent to the terms described
            in this Privacy Policy.
            <br />
            <br />
            <h3 className="main-heading">Information We Collect</h3>
            <br />
            <h4>Personal Information</h4>
            When you sign up or interact with our platform, we may collect the
            following personal information:
            <ul>
              <li>
                <strong>Full Name:</strong> We collect your full name to
                personalize your experience on our platform.
              </li>
              <li>
                <strong>Email Address:</strong> We collect your email address to
                communicate with you and send important updates.
              </li>
              <li>
                <strong>Contact Information:</strong> We may collect additional
                contact information, such as your phone number or mailing
                address, to facilitate communication or provide relevant
                services.
              </li>
              <br />
            </ul>
            <h4>Usage Information</h4>
            We may collect information about how you use our platform,
            including:
            <ul>
              <li>
                <strong>Log Data:</strong> We automatically collect log data,
                which may include your IP address, browser type, operating
                system, referring/exit pages, and timestamps. This information
                helps us analyze trends, administer the site, and track user
                movement.
              </li>
              <li>
                <strong>Device Information:</strong> We may collect information
                about the device you use to access our platform, such as device
                type, operating system, and browser type.
              </li>
            </ul>
            <br />
            <h4>How We Use Your Information</h4>
            We use the information we collect for the following purposes:
            <ul>
              <li>
                To provide and improve our services: We use your information to
                deliver the services and features you request and enhance your
                user experience on our platform.
              </li>
              <li>
                To communicate with you: We may use your email address or other
                contact information to send you important updates, newsletters,
                or promotional materials.
              </li>
              <li>
                To personalize your experience: We may use your information to
                personalize the content and features you see on our platform
                based on your preferences.
              </li>
              <li>
                To analyze and improve our platform: We use the information
                collected to analyze user behavior, measure the effectiveness of
                our services, and make improvements to our platform.
              </li>
            </ul>
            <br />
            <h4>Information Sharing and Disclosure</h4>
            We understand the importance of keeping your personal information
            secure and confidential. We do not sell, trade, or rent your
            personal information to third parties without your consent. However,
            we may share your information in the following circumstances:
            <ul>
              <li>
                <strong>With Service Providers:</strong> We may share your
                information with trusted service providers who assist us in
                operating our platform, such as hosting providers, payment
                processors, or customer support services. These providers have
                access to your information only to perform tasks on our behalf
                and are obligated to maintain its confidentiality.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share your
                information with third parties if you give us your explicit
                consent to do so.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required by law, court order, or government
                regulation, or if we believe that such disclosure is necessary
                to protect our rights, property, or safety, or the rights,
                property, or safety of others.
              </li>
            </ul>
            <br />
            <h4>Data Security</h4>
            We take appropriate measures to ensure the security of your personal
            information and protect it from unauthorized access, disclosure,
            alteration, or destruction. However, no data transmission over the
            internet or electronic storage method is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </div>
      </div>

      <HighlightedCases />
      <BlackBg />
    </>
  );
};

export default PrivacyPolicy;
