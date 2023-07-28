import React, { useState } from "react";
import Base from "./Base";
import "../index.css";
import LandingPhoto from "../images/photo.png"
import { Link, useNavigate } from "react-router-dom";

function LandingPage(){
    const navigate  = useNavigate();
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch('http://localhost:3001/login',{
            method:"POST",
            body : JSON.stringify({
                email,
                password,
            }),
            credentials:"include",
            headers: {
                'Content-type': 'application/json',
            },
        })
        .catch((err) => {
            console.log(err.message);
        });
        const data = await response.json();
        if(data.status==="ok"){
            navigate("/Profile");
        }
    };

    return(
        <div>
            <Base />
            <div className="imgsection">
                <img className="landimg" src={LandingPhoto} alt="Landing-photo"></img>
            </div>
            <div className="loginsection">
                <div className="formsection">
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input 
                            className="email"  
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Email" 
                        />
                        <input 
                            className="pwd" 
                            type="password" 
                            name="pwd" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Password" 
                        />
                        <button type="submit" className="btn">Login</button>
                    </form>
                    <p className="forgot_pwd">Forgot password?</p>
                    <p className="member">Not a member? <Link to={"/Register"} className="aa"> Register now</Link> </p>
                    
                    
                </div>
            </div>
        </div>
    )
}
export default LandingPage;