import React, { useState } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
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
