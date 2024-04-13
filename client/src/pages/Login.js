import React, { useState } from "react";
import Base from "../components/Base";
import "../index.css";
import "../styles/login.css";
import Lottie from "lottie-react";
import catAnimation from "../assets/animations/cat animation.json";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../lib/api";

function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const handleCLick = () => setIsRevealPwd(!isRevealPwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("login", { email, password });
      if (response.data.status === "ok") {
        navigate("/Profile");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgot = async (e) => {
    if (!email) {
      toast.warn("Please enter the email first.");
      return;
    }

    try {
      const response = await postData("login", {
        email,
        password: "wiggles",
      });
      let data = response.data;
      if (data.status === "forgot") {
        navigate("/verify/OTPverification", { state: email });
      } else {
        toast.warn("Email not found.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <Base />
      <div className="loginContainer">
        <div className="loginInfo">
          <h1>Login</h1>
          <p className="not-register">
            Don't have an account?{" "}
            <Link to={"/verify/signup"} className="links-color">
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
              <IconContext.Provider value={{ className: "revealpwd" }}>
                <span onClick={handleCLick}>
                  {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </IconContext.Provider>
            </div>
            <div className="secondary-login">
              <span onClick={handleForgot}>Forgot password?</span>
              <div>
                <button type="submit" className="btn">
                  Login
                </button>
              </div>
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
}
export default LandingPage;
