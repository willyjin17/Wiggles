import React, { useState } from "react";
import Base from "./Base";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";

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
    if (password != confirmPassword) {
      toast.error("Password doesn't match. Please check");
      return;
    }
    const response = await fetch("http://localhost:3001/resetPassword", {
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
    }
    toast.error(data.message);
  };

  return (
    <>
      <Base />
      <div className="OTP">
        <h2 className="OTPheading">Create new password</h2>
        <form onSubmit={handleSubmit} className="NewPasswordForm">
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="NewPasswordInput"
            placeholder="Enter new password"
            type={isRevealPwd ? "text" : "password"} 
          />
          <IconContext.Provider value={{ className: "revealpwd" }}>
            <span onClick={handleCLick}>
              {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </IconContext.Provider>
          <input
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="NewPasswordInput"
            placeholder="Re-enter password"
            type={isRevealResetPwd ? "text" : "password"} 
          />
          <IconContext.Provider value={{ className: "revealpwd" }}>
            <span onClick={handleCLick2}>
              {isRevealResetPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </IconContext.Provider>
          <button type="submit" className="OTPbtn">
            Save
          </button>
          <ToastContainer />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
