import React, { useState } from 'react'
import Base from './Base'
import {  useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const ChangePassword = () => {
  const location = useLocation();
  const email = location.state;
  const navigate=useNavigate();
  const[password, setPassword]=useState("");
  const[confirmPassword, setConfirmPassword]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(password!=confirmPassword){
      toast.error("Password doesn't match. Please check");
      return;
    }
    const response= await fetch('http://localhost:3001/resetPassword',{
      method:"POST",
      body : JSON.stringify({
        email,
        password,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((err) => {
      console.log(err.message);
    });
    const data = await response.json();
    if(data.status==="ok"){
      navigate("/Profile");
    }
    toast.error(data.message);

    // if (!validatePassword(password)) {
    //   toast.error("Password must have length between 8-20 characters and must contain atleast 1 alphabet and 1 number.")

    //   return;
    // }

    // const validatePassword = (password) => {
    //   // Password regex pattern: Atleast 8-20 letter and Atleast one letter and one number
    //   const passwordPattern =
    //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/;
  
    //   return passwordPattern.test(password);
    // };

  }

 

  return (
    <>
    <Base/>
    <div className='OTP'>
      <h2 className='OTPheading'>Create new password</h2>
      <form onSubmit={handleSubmit} className='NewPasswordForm'>
        <input 
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className='NewPasswordInput'
          placeholder='Enter new password'
          type="password" 
        />
        <input 
          required
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className='NewPasswordInput'
          placeholder='Re-enter password'
          type="password" 
        />
        <button type="submit" className='OTPbtn'>Save</button>
        <ToastContainer/>
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default ChangePassword