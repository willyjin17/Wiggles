import React, { useState } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        alert("Registration failed");
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
            Already a member? <Link to={"/Login"} className="links-color">Login</Link>
          </p>
        <form className="registersection" onSubmit={handleSubmit}>
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
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p>{emailError}</p>}
          <input
            className="pwd"
            type="password"
            name="pwd"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError("");
            }}
          />
          {passwordError && <p>{passwordError}</p>}
          <button className="btn btn-back">&lt; Back</button>
          <button type="submit" className="btn btn-next">Next &gt;</button>
        </form>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
