import { useEffect, useState } from "react";
import "../styles/loginComponent.css";
import { postData } from "../utils/api";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/isLoggedInSlice.js";

const Login = ({ open, setOpen, message }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
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
        navigate("/verify/OTPverification", { state: email });
      } else {
        toast.warn("Email not found.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="loginComponentWrapper">
      <div className="loginComponentContainer">
        <div className="closeContainer" onClick={() => setOpen(false)}>
          <RxCross2 />
        </div>
        <h2>{message}</h2>
        <form className="loginComponentForm" onSubmit={(e) => handleSubmit(e)}>
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
        <div className="divider">
          <hr /> <span>or</span> <hr />
        </div>
        <div className="newAccountButton">
          <Button
            type="button"
            text="Create New Account"
            path="/verify/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
