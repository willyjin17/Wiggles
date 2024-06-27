import React from "react";
import { RxCross2 } from "react-icons/rx";
import "../styles/loginComponent.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ViolationPopUp = ({ setOpen, violationMessage }) => {
  // const violationMessage = useSelector(
  //   (state) => state.violations.violationMessage
  // );
  const warnings = useSelector((state) => state.violations.warnings);
  const warn = useSelector((state) => state.violations.warn);
  const ban = useSelector((state) => state.violations.ban);
  return (
    <div className="loginComponentWrapper">
      <div className="loginComponentContainer">
        <div className="closeContainer" onClick={() => setOpen(false)}>
          <RxCross2 />
        </div>
        <h2 className="headingPopup">Community Guidelines Violation</h2>
        <div className="messagePopup">
          <p>{violationMessage}</p>
        </div>
        <div className="linksPopup">
          <Link to="/verify/community-guidelines" target="_blank">
            Community Guidelines
          </Link>
          <Link to="/profile">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default ViolationPopUp;
