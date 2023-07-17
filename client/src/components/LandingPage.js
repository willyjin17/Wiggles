import React from "react";
import Base from "./Base";
import "../index.css";
import LandingPhoto from "../images/photo.png"
function LandingPage(){
    return(
        <div>
            <Base />
            <div className="imgsection">
                <img className="landimg" src={LandingPhoto} alt="Landing-photo"></img>
            </div>
            <div className="loginsection">
                <div className="formsection">
                    <form>
                        <input className="email" type="email" name="email" placeholder="Email" />
                        <input className="pwd" type="password" name="pwd" placeholder="Password" />
                        <button type="submit" className="btn">Login</button>
                    </form>
                    <p className="forgot_pwd">Forgot password?</p>
                    <p className="member">Not a member? <a className="aa"> Register now</a> </p>
                    
                    
                </div>
            </div>
        </div>
    )
}
export default LandingPage;