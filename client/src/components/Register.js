import React, { useState } from "react";
import Base from "./Base";
import Reglogo from "../images/Reglogo.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
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


      console.log(response)

      if (response.ok) {
        navigate("/secreg");
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
      <div className="container">
        <div className="text">
          <h1>Create your account</h1>
          <p>
            Already a member? <a className="aa">Login</a>
          </p>
        </div>
        <form className="registersection" onSubmit={handleSubmit}>
          <input
            className="pno"
            type="text"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="pwd"
            type="password"
            name="pwd"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="btn btn-back">Back </button>
          <button type="submit" className="btn btn-next">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
