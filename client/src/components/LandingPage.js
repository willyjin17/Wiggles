import React, { useState } from "react";
import Base from "./Base";
import "../index.css";
import ProfilePhoto from "../images/profilephoto.png"
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
        <>
            <Base />
            <div className="loginContainer">
            <img className='landImg' src={ProfilePhoto} alt="" />
                <div className="login-info">
                    <h1>LOGIN</h1>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Email" 
                        />
                        <input  
                            type="password" 
                            name="pwd" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Password" 
                        />
                        <div className="secondary-login">
                            <p>Forgot password?</p>
                            <div>
                                <button type="submit" className="btn">Login</button>
                            </div>
                        </div>
                        <p className="not-register">Don't have an account? <Link to={"/Register"} className="links-color"> Register</Link> </p> 
                    </form>
                </div>
            </div>
        </>
    )
}
export default LandingPage;