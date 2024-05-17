import React, { useEffect } from "react";
import "../styles/guidelines.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const TermsCard = ({ setShowPrimary, setIsTermsCardVisible }) => {
  const handleAgree = () => {
    setShowPrimary(false);
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div className="termsCardWrapper">
      <div className="termsCardContainer">
        <MdCancel
          className="cancelIcon"
          onClick={() => setIsTermsCardVisible(false)}
        />
        <h2 className="termsCardHeading">Agree to Terms and Policies</h2>
        <div className="content">
          <p>
            By using Wiggles, you agree to abide by the Wiggles{" "}
            <Link
              to="/verify/community-guidelines"
              className="boldLink"
              target="_blank"
            >
              Platform Terms
            </Link>
            . Please read them carefully before proceeding.
          </p>
        </div>
        <div className="btnAgree">
          <Button text="Agree &gt;" onClick={handleAgree} />
        </div>
      </div>
    </div>
  );
};

export default TermsCard;
