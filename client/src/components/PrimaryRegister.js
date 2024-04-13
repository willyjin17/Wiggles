import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import dogAnimation from "../assets/animations/dog animation.json";
import { postData } from "../lib/api";

function Register({
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  setShowPrimary,
}) {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const handleCLick = () => setIsRevealPwd(!isRevealPwd);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phone.match(/^\d{10}$/)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const validatePassword = (password) => {
      // Password regex pattern: Atleast 8-20 letter and Atleast one letter and one number
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/;

      return passwordPattern.test(password);
    };

    if (!validatePassword(password)) {
      toast.error(
        "Password must have length between 8-20 characters and must contain atleast 1 alphabet and 1 number."
      );
      return;
    }

    try {
      const response = await postData("checkRegister", {
        email: email,
      });
      let data = response.data;
      if (data.status === "ok") {
        setShowPrimary(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register-wrapper">
      <form
        className="registersection"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1 className="register-heading">Create your account</h1>
        <p>
          Already a member?{" "}
          <Link to={"/verify/Login"} className="linksColor">
            Login
          </Link>
        </p>
        <div className="phoneContainer">
          <input
            autoComplete="true"
            className="pno"
            type="text"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="emailContainer">
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            autoComplete="none"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="pwdContainer">
          <input
            className="pwd"
            type={isRevealPwd ? "text" : "password"}
            name="pwd"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <IconContext.Provider value={{ className: "revealpwd" }}>
            <span onClick={handleCLick}>
              {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </IconContext.Provider>
        </div>
        <div className="btnContainer">
          <button
            type="button"
            onClick={() => {
              navigate("/verify/login");
            }}
            className="btn btnBack"
          >
            &lt; Back
          </button>
          <button type="submit" className="btn btnNext">
            Next &gt;
          </button>
        </div>
      </form>
      <Lottie
        className="illustration"
        animationData={dogAnimation}
        loop={true}
      />
    </div>
  );
}

export default Register;
