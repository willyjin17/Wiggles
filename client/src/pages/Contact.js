import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import loginPhoto from "../assets/images/loginPhoto.png";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/contact.css";
import { getData } from "../lib/api";

export default function Contact() {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [button, setButton] = useState("Send Message");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData("");
        let data = response.data;

        if (data.status === "ok") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        toast.error(err);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (e) => {
    setText(e.target.value);
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", (e) => {
      textarea.style.height = "auto";
      var scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton("Sending");
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_API_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setButton("Send Message");
          setName("");
          setEmail("");
          setText("");
          toast.success("Message successfully sent!");
        },
        (error) => {
          toast.error("Message not sent, try again later.");
          setButton("Send Message");
        }
      );
  };

  return (
    <>
      {authorized ? <Navbar /> : <></>}

      <div className="contactWindow">
        <div className="contactContainer">
          <form
            ref={form}
            onSubmit={(e) => handleSubmit(e)}
            className="contactWrapperRight"
          >
            <h1>Contact Us</h1>
            <input
              id="name"
              type="text"
              name="Name"
              value={name}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              id="email"
              type="email"
              name="Email"
              value={email}
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <textarea
              id="message"
              name="Message"
              value={text}
              placeholder="Message"
              rows="2"
              onChange={handleOnChange}
              required
            >
              {text}
            </textarea>
            <button id="submitBtn" type="submit">
              {button}
            </button>
          </form>
          <img
            src={loginPhoto}
            alt="My Pet"
            className="contactWrapperLeft"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
