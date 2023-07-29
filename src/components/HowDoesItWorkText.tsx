import React from "react";
import "./styles/PrivacyPolicy.css";
import Navbar from "./Navbar";
import HighlightedCases from "./HighlightedCases";
import BlackBg from "./BlackBg";

const HowDoesItWorkText = () => {
  return (
    <>
      <h3 className="black-text">The process is simple:</h3>
      <br />
      <ol>
        <li>
          <h4>Enter Your Prompt</h4>
          Begin by entering your query or prompt into the search bar on our
          platform. You can describe your legal problem or question using
          natural language.
        </li>
        <br />

        <li>
          <h4>Natural Language Processing</h4>
          Our platform utilizes advanced Natural Language Processing techniques
          to analyze and understand your query. It breaks down the prompt by
          removing unnecessary words, focusing on the main problem described,
          and identifying key concepts.
        </li>
        <br />
        <li>
          <h4>Synonym and Word Form Matching</h4>
          To ensure comprehensive results, our system takes into account
          synonyms and different word forms. It expands the query to cover
          various possible expressions of the same legal concept, increasing the
          accuracy of the search.
        </li>
        <br />
        <li>
          <h4>Matching with Applicable Laws</h4>
          Using our proprietary algorithms and an extensive database of laws
          applicable in Pakistan, our platform matches your query with the set
          of relevant laws. It considers the unique combination of keywords and
          concepts extracted from your prompt to identify the most appropriate
          legal provisions.
        </li>
        <br />
        <li>
          <h4>Results and Applicable Laws</h4>
          Once the matching process is complete, our platform presents you with
          a list of laws that are specifically applicable to your situation. You
          will receive a concise and tailored set of laws that address your
          legal concerns.
        </li>
        <br />
      </ol>
    </>
  );
};

export default HowDoesItWorkText;
