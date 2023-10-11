import React from "react"
import "../index.css";
import Logo from "../images/Logo.jpg"
function Base(){
    return (
        <div> 
            <img className="logoimg" src={Logo} alt="website-logo" loading="lazy"></img>
            <h2 className="logoheading">Wiggles</h2> 
        </div>
    )
}
export default Base
