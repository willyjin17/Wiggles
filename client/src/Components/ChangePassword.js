import React, { useState } from 'react'
import Base from './Base'
import {  useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const location = useLocation();
  const email = location.state;
  const navigate=useNavigate();
  const[password, setPassword]=useState("");
  const[confirmPassword, setConfirmPassword]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(password!=confirmPassword){
      alert("Password doesn't match. Please check");
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
    alert(data.message);
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
      </form>
    </div>
    </>
  )
}

export default ChangePassword