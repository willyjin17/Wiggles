import React, { useState, useEffect } from 'react'
import "../CSS//UserProfile.css"
import Navbar from "../Components/Navbar"
import { useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

const UserProfile = () => {
  const {id}=useParams();
  console.log(id); 
  const[name, setName]=useState("");
  const[age, setAge]=useState("");
  const[breed, setBreed]=useState("");
  const[gender, setGender]=useState("");
  const[image, setImage]=useState("");


  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost:3001/profiledata',{
        method:"GET",
        credentials:"include",
      })
      .catch((err)=>{
        console.log(err);
        alert("There was an error. Kindly referesh the page.")
      })
      let data= await response.json();
      if(data.status=="ok")
      {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        var today = new Date();
        var dob=new Date(data.foundUser.dob);
        //subtracting in milliseconds and then converting result to years.
        var currAge =Math.floor( (today.getTime()-dob.getTime())/ (1000 * 60 *60 * 24*365)) 
        setAge(currAge);
      }
      else{
        alert("Kindly login first.");
      }      
    }
    fetchData()
  }, [])
  return (
  <>
  <Navbar />
  <div className='userProfileWrapper'>
    <div className='userProfileContainer'>
      <div className='userProfilePrimary'>
        <h1>{name}</h1>
        {image && <img src={require(`../Uploads/${image}`)} alt="user-profile" />}
        <h4>HI! I enjoy baths and walking in the park. I love children and I will love you.</h4>
      </div>
      <button id='userProfileButton'>Connect <AiOutlinePlus /></button>
      <div className='userProfileSecondary'>
        <h2>Breed<p>{breed}</p></h2>
        <h2>Age<p>{age+" Years"}</p></h2>
        <h2 className='profileButton'><button id='profileButton'>Connect <AiOutlinePlus /></button></h2>
        <h2>Gender<p>{gender}</p></h2>
        <h2>Playdate<p>Yes</p></h2>
      </div>
    </div>
  </div>
  </>
  )
}

export default UserProfile