import React, { useState } from 'react'
import Base from './Base'
import {  useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../CSS/ResetPassword.css"
import "../CSS/Login.css"

const ChangePassword = () => {
  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealResetPwd, setIsRevealResetPwd] = useState(false);
  const handleCLick = () => setIsRevealPwd(!isRevealPwd);
  const handleCLick2 = () => setIsRevealResetPwd(!isRevealResetPwd);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validatePassword = (password) => {
      // Password regex pattern: Atleast 8-20 letter and Atleast one letter and one number
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/;
      return passwordPattern.test(password);
    };
    
      if (!validatePassword(password)) {
        toast.error("Password must have length between 8-20 characters and must contain atleast 1 alphabet and 1 number.")

        return;
      }
    if (password !== confirmPassword) {
      toast.error("Password doesn't match. Please check");
      return;
    }
    
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/resetPassword`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    }).catch((err) => {
      console.log(err.message);
    });
    const data = await response.json();
    if (data.status === "ok") {
      navigate("/Profile");
      toast.success(data.message);
    }
    else
      toast.error(data.message);
  };
  
  return (
    <>
      <Base />
      <div className="OTP">
        <h2 className="OTPheading">Create new password</h2>
        <form onSubmit={handleSubmit} className="NewPasswordForm">
          <div className='pwdBox'>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="NewPasswordInput"
            placeholder="Enter new password"
            type={isRevealPwd ? "text" : "password"} 
          />
          <IconContext.Provider value={{ className: " newPwd" }}>
            <span onClick={handleCLick}>
              {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </IconContext.Provider>
          </div>
          <div className='pwdBox'>
          <input
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="NewPasswordInput"
            placeholder="Re-enter password"
            type={isRevealResetPwd ? "text" : "password"} 
          />
          <IconContext.Provider value={{ className: " newPwd" }}>
            <span onClick={handleCLick2}>
              {isRevealResetPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </IconContext.Provider>
          </div>
          <button type="submit" className="OTPbtn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
