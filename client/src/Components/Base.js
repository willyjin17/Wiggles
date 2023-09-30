import React from "react"
import "../index.css";
import Logo from "../images/Logo.jpg"
function Base(){
    return (
        <div> 
            <img className="logoimg" src={Logo} alt="Website Logo"></img>
            <h1 className="logoheading">Wiggles</h1> 
        </div>
    )
}
export default Base
