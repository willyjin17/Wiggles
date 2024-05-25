import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/isLoggedInSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../index.css";
import "../styles/login.css";
import { postData } from "../utils/api";
import Base from "../components/Base";
import Button from "../components/Button";
import Lottie from "lottie-react";
import catAnimation from "../assets/animations/cat animation.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return toast.warn("All fields are required!");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await postData("login", { email, password });
      if (response.data.status === "ok") {
        dispatch(loginUser(true));
        navigate("/profile");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = () => setIsRevealPwd(!isRevealPwd);

  const handleForgot = async (e) => {
    if (!email) {
      toast.warn("Please enter the email first.");
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const response = await postData("login", {
        email,
        password: " ",
      });
      let data = response.data;
      if (data.status === "forgot") {
        navigate("/verify/otp-verification", { state: email });
      } else {
        toast.warn("Email not found.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="login">
      <Base />
      <div className="loginContainer">
        <div className="loginInfo">
          <h1>Login</h1>
          <p>
            Don't have an account?{" "}
            <Link to={"/verify/signup"} className="linksColor">
              {" "}
              Register
            </Link>{" "}
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="emailContainer">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="pwdContainer">
              <input
                type={isRevealPwd ? "text" : "password"}
                name="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <IconContext.Provider value={{ className: "revealPwd" }}>
                <span onClick={handleClick}>
                  {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </IconContext.Provider>
            </div>
            <div className="secondaryLogin">
              <span onClick={handleForgot}>Forgot password?</span>
              <Button type="submit" text="login" />
            </div>
          </form>
        </div>
        <Lottie
          className="catIllustration"
          animationData={catAnimation}
          loop={true}
        />
      </div>
    </div>
  );
};
export default LandingPage;
