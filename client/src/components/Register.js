import React from "react";
import Base from "./Base";
import Reglogo from "../images/Reglogo.png"
import { Link } from "react-router-dom";
import "../index.css";
function Register(){
    return (
        <div>
            <Base />
            <div className="container">
            <div className="text">
                <h1>Create your account</h1>
                <p>Already a member? <Link to="/Login" className="aa">Login</Link></p>
            </div>
            <form className="registersection">
            <input className="pno" type="text" name="phone" placeholder="Phone number" />
            <input className="email" type="email" name="email" placeholder="Email" />
            <input className="pwd" type="password" name="pwd" placeholder="Password" />
            <Link to={"/Login"}><button className="btn btn-back">Back </button></Link>
            <Link to="/SecondaryRegister"><button className="btn btn-next">Next</button></Link>
            </form>
            </div>
        </div>
    )
}

export default Register;