import React from "react";
import "../index.css";
import Logo from "../assets/images/wigglesLogo.png";
function Base() {
  return (
    <a href="/verify/login">
      <div className="baseContainer">
        <img
          className="logoimg"
          src={Logo}
          alt="website-logo"
          loading="lazy"
        ></img>
        <h2 className="logoheading">Wiggles</h2>
      </div>
    </a>
  );
}
export default Base;
