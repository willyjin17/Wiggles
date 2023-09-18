import React, { useState, useEffect } from 'react'
import "../CSS//UserProfile.css"
import Navbar from "../Components/Navbar"
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'
import { useCookies } from 'react-cookie'

const UserProfile = () => {
  const {id}=useParams();
  const[cookies]=useCookies();
  const userID=cookies.userID;
  const[name, setName]=useState("");
  const[age, setAge]=useState("");
  const[breed, setBreed]=useState("");
  const[gender, setGender]=useState("");
  const[image, setImage]=useState("");
  const[bio, setBio]=useState("");
  const[button, setButton]=useState("Connect +");

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profiledata`,{
        method:"POST",
        body:JSON.stringify({
          userID:id,
        }),
        credentials:"include",
        headers: {
          'Content-type': 'application/json',
        },
      })
      .catch((err)=>{
        console.log(err);
        toast.error("There was an error. Kindly referesh the page.")
      })
      let data= await response.json();
      if(data.status==="ok")
      {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        (data.foundUser.requestRecieved).includes(userID) ?  setButton("Pending...") : setButton("Connect +");
        (data.foundUser.friends).includes(userID) ?  setButton("Remove") : <></>;
        var today = new Date();
        var dob=new Date(data.foundUser.dob);
        //subtracting in milliseconds and then converting result to years.
        var currAge =Math.floor( (today.getTime()-dob.getTime())/ (1000 * 60 *60 * 24*365)) 
        setAge(currAge);
      }
      else{
        toast.warn("Kindly login first.");
      }      
    }
    fetchData()
  }, [id, userID, button])

  const handleRemove=async(e)=>{
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/removeFriend`,{
      method:"POST",
      body: JSON.stringify({
        friendID: id,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((error)=>{
      toast.error("There was an error while performing this action.")
      // alert("There was an error while performing this action.");
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      setButton("Connect +");
      toast.success("Successfully removed.")
      // alert("Successfully removed.")
    }
  }

  const handleConnect=async(event)=>{
    if(button==="Pending..."){
      toast.warn("Request already sent.");
      return;
    }
    if(button==="Remove"){
      handleRemove();
      return;
    }
    const response= await fetch("http://localhost:3001/addFriend",{
      method:"POST",
      body : JSON.stringify({
        id,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((err)=>{
      toast.error("There was an error. Please try again or refresh the page.");
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      toast.success("Request Successfully sent.")
    }
    setButton("Pending...");
  }
  return (
  <>
  <Navbar />
  <div className='userProfileWrapper'>
    <div className='userProfileContainer'>
      <div className='userProfilePrimary'>
        <h1>{name}</h1>
        {image && <img  className="profilePicture" src={image} alt="user-profile" />}
        <h4>{bio}</h4>
      </div>
      <button id='userProfileButton' onClick={handleConnect}>{button}</button>
      <div className='userProfileSecondary'>
        <h2>Breed<p>{breed}</p></h2>
        <h2>Age<p>{age+" Years"}</p></h2>
        <h2 className='profileButton'><button id='profileButton' onClick={handleConnect}>{button}</button></h2>
        <h2>Gender<p>{gender}</p></h2>
        <h2>Playdate<p>Yes</p></h2>
      </div>
    </div>
  </div>
  </>
  )
}

export default UserProfile