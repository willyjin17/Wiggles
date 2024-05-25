import React, { useState } from "react";
import Base from "../components/Base";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../styles/resetPassword.css";
import "../styles/login.css";
import Button from "../components/Button";
import { postData } from "../utils/api";

const ChangePassword = () => {
  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealResetPwd, setIsRevealResetPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/
      )
    ) {
      toast.error(
        "Password must have length between 8-20 characters and must contain atleast 1 alphabet and 1 number."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password doesn't match. Please check");
      return;
    }

    try {
      const response = await postData("resetPassword", {
        email,
        password,
      });
      const data = await response.data;
      if (data.status === "ok") {
        toast.success(data.message);
        navigate("/profile");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="resetPasswordWrapper">
      <Base />
      <div className="OTP">
        <h2 className="OTPHeading">Create new password</h2>
        <form onSubmit={handleSubmit} className="newPasswordForm">
          <div className="pwdBox">
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="newPasswordInput"
              placeholder="Enter new password"
              type={isRevealPwd ? "text" : "password"}
            />
            <IconContext.Provider value={{ className: " newPwd" }}>
              <span onClick={() => setIsRevealPwd((prevState) => !prevState)}>
                {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </IconContext.Provider>
          </div>
          <div className="pwdBox">
            <input
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="newPasswordInput"
              placeholder="Re-enter password"
              type={isRevealResetPwd ? "text" : "password"}
            />
            <IconContext.Provider value={{ className: " newPwd" }}>
              <span
                onClick={() => setIsRevealResetPwd((prevState) => !prevState)}
              >
                {isRevealResetPwd ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </IconContext.Provider>
          </div>
          <div className="OTPBtn">
            <Button type="submit" text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
