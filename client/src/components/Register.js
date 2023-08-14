import React, { useState } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Register() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const handleCLick = () => setIsRevealPwd(!isRevealPwd);

  const showErrorToast = () => {
    toast.error("Registration Failed!", {
      data: {
        title: "Error toast",
      },
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phone.match(/^\d{10}$/)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (!validateEmail(email)) {
      setEmailError("Please Enter a valid email address");
      return;
    }

    const validatePassword = (password) => {
      // Password regex pattern: Atleast 8-20 letter and Atleast one letter, one special character, and one number
      const passwordPattern =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
      return passwordPattern.test(password);
    };

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be between 8-20 letters and must contain at least one letter, special character, and number."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: JSON.stringify({
          phone,
          email,
          password,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log(response);

      if (response.ok) {
        navigate("/SecondaryRegister");
      } else {
        showErrorToast();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Base />
      <div className="registration">
        <div className="register-container">
          <div className="register-wrapper">
            <h1 className="register-heading">Create your account</h1>
            <p>
              Already a member?{" "}
              <Link to={"/Login"} className="links-color">
                Login
              </Link>
            </p>
            <form
              className="registersection"
              onSubmit={handleSubmit}
              autocomplete="off"
            >

              <div className="phoneContainer">
                <input
                  className="pno"
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setPhoneError("");
                  }}
                />
                {phoneError && <p>{phoneError}</p>}
              </div>
              <div className="emailContainer">
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  autocomplete="none"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && <p>{emailError}</p>}
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
                    setPasswordError("");
                  }}
                />
                <IconContext.Provider value={{ className: "revealpwd" }}>
                  <span onClick={handleCLick}>
                    {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </IconContext.Provider>
                {passwordError && <p>{passwordError}</p>}
              </div>
              <div className="btnContainer">
                <button className="btn btn-back">&lt; Back</button>
                <button type="submit" className="btn btn-next">
                  Next &gt;
                </button>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
