import React from "react";
import Base from "./Base";
import Reglogo from "../images/Reglogo.png"
import "../index.css";
function Register(){
    return (
        <div>
            <Base />
            <div className="container">
            <div className="text">
                <h1>Create your account</h1>
                <p>Already a member? <a className="aa">Login</a></p>
            </div>
            <form className="registersection">
            <input className="pno" type="text" name="phone" placeholder="Phone number" />
            <input className="email" type="email" name="email" placeholder="Email" />
            <input className="pwd" type="password" name="pwd" placeholder="Password" />
            <button className="btn btn-back">Back </button>
            <button className="btn btn-next">Next</button>
            </form>
            </div>
        </div>
    )
}

export default Register;