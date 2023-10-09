import React from "react";
import "./LoadingSpinner.css";

/**
 * LoadingSpinner is a component that renders a loading spinner and text.
 * @param {Object} props - The component's props object.
 * @param {string} props.text - The main text displayed above the spinner. Defaults to "Hang tight! We're fetching your data." if not provided.
 * @param {string} props.subtitle - An optional subtitle to be displayed below the main text.
 * @returns {JSX.Element} A JSX element representing a loading page with a spinner and text.
 */

const LoadingSpinner = ({text, subtitle}: any) => {
  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <h2>{ text ?? "Hang tight! We're fetching your data."}</h2>
      <span>{ subtitle ?? ""}</span>
    </div>
  );
};

export default LoadingSpinner;