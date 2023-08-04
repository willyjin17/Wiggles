import React, {useState} from 'react'
import Navbar from './Navbar'
import profilephoto from '../images/profilephoto.png'

export default function Contact() {
    const handleOnChange = (e) => {
      setText(e.target.value);
      const textarea = document.querySelector("textarea");
      textarea.addEventListener("keyup", e => {
        textarea.style.height = "auto";
        var scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`;
        console.log("hi");
      });

    }
    const [text, setText] = useState("");

  return (
    <>
    <Navbar/>
    <div className='contact-window'>
      <div className='contact-container'>
        <form action="" method='POST' encType='text/plain' className="contact-wrapper-right">
          <h1>Contact Us</h1>
          <input id='name' type='text' name='Name' placeholder='Full Name' onChange = {handleOnChange} required></input>
          <input id='email' type='email' name='Email' placeholder='Email ID' onChange = {handleOnChange} required></input>
          <textarea id='message' name='Message' value={text} placeholder='Your Message here.' onChange = {handleOnChange} required>{text}</textarea>
          <button id='submitBtn' type="submit">Send Message</button>
        </form>
        <img src={profilephoto} alt="My Pet" className="contact-wrapper-left" />
      </div>
    </div>
    </>
  )
}
