import React from "react";
import "../styles/guidelines.css";
import Button from "./Button";

const TermsCard = () => {
  return (
    <div className="termsCardContainer">
      <h2>Agree to Terms and Policies</h2>
      <div className="content">
        <p>
          By using Wiggles, you agree to abide by the Wiggles Platform Terms.
          Please read them carefully before proceeding.
        </p>
      </div>
      <div className="btnAgree">
        <Button type="submit" text="Agree &gt;" />
      </div>
    </div>
  );
};

export default TermsCard;
