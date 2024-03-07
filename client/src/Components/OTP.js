import React, { useEffect, useState } from "react";
import Base from "./Base";
import "../CSS/ResetPassword.css";
import "../CSS/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTP = () => {
  const location = useLocation();
  const email = location.state;
  const [otp, setOTP] = useState();
  const [userotp, setUserOTP] = useState([, , , , ,]);
  const navigate = useNavigate();

  // Setting OTP at load time
  useEffect(() => {
    setOTP(Math.floor(100000 + Math.random() * 900000));
  }, []);

  // Sending otp when otp is changed
  useEffect(() => {
    if (!otp) return;
    const templateParams = {
      email: email,
      otp: otp,
    };
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID_OTP,
        templateParams,
        process.env.REACT_APP_PUBLIC_API_KEY
      )
      .then(
        (result) => {
          // showSuccessToast();
        },
        (error) => {
          // showErrorToast();
        }
      );
  }, [otp]);

  // A 60s timer for expiry
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    counter >= 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === -1) {
      const exp = document.getElementsByClassName("OTPlinkExpiry");
      exp[0].style.visibility = "hidden";
      setOTP(0);
    }
    if (counter === 0) {
      const resendLink = document.getElementsByClassName("OTPResend");
      resendLink[0].addEventListener("click", handleResend);
      resendLink[0].style.cursor = "pointer";
      resendLink[0].style.opacity = "1";
      toast.warn("Click Resend code to get new OTP.");
    }
  });

  const handleResend = () => {
    const exp = document.getElementsByClassName("OTPlinkExpiry");
    exp[0].style.visibility = "visible";
    setCounter(60);
    setOTP(Math.floor(100000 + Math.random() * 900000));
    const resendLink = document.getElementsByClassName("OTPResend");
    resendLink[0].style.cursor = "default";
    resendLink[0].removeEventListener("click", handleResend);
    resendLink[0].style.opacity = "0.5";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.warn("OTP has expired. Click Resend code to get new OTP.");
      return;
    }
    let input = "";
    userotp.map((num) => {
      input = input + num;
      return input;
    });
    if (otp == input) {
      navigate("/verify/ChangePassword", { state: email });
    } else {
      toast.error("Wrong OTP entered.");
    }
  };

  return (
    <>
      <Base />
      <div className="OTP">
        <h1 className="OTPheading">Verify OTP</h1>
        <p className="OTPtext">Please enter the OTP sent on your email</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="OTPbox">
            <OTPcontainer index={0} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPcontainer index={1} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPcontainer index={2} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPcontainer index={3} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPcontainer index={4} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPcontainer index={5} userotp={userotp} setUserOTP={setUserOTP} />
          </div>
          <div className="OTPlink">
            <p className="OTPlinkExpiry">
              Expires in <span>{counter}</span>
            </p>
            <span className="OTPResend" disabled>
              Resend code
            </span>
          </div>
          <button type="submit" className="OTPbtn">
            Verify
          </button>
        </form>
      </div>
    </>
  );
};

export default OTP;

const OTPcontainer = ({ index, userotp, setUserOTP }) => {
  const arr = userotp;

  const handleChange = (e) => {
    arr[index] = e.target.value;
    setUserOTP(arr);
    document.activeElement.nextElementSibling &&
      document.activeElement.nextElementSibling.focus();
  };
  return (
    <>
      <input
        onChange={handleChange}
        placeholder="_"
        type="number"
        className="OTPcontainer"
        maxLength={1}
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(e.target.maxLength, 2);
        }}
      />
    </>
  );
};
