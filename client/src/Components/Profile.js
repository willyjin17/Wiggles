import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from "../images/profilephoto.png"
import Navbar from './Navbar';

const Profile = () => {
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
    <Navbar/>
    <div className='profile'>
      {image && <img className='profilePhoto' src={require(`../Uploads/${image}`)} alt="profile image"/>}
      {/* <img className='profilePhoto' src={ProfilePhoto} alt="" /> */}
      <div className='profileInfoPrimary'>
        <h1>Name : {name}</h1>
        <h1>Bio : </h1>
        <h1>Breed : {breed}</h1>
        <h1>Gender : {gender}</h1>
        <h1>Age : {age}</h1>
        <h1>Address : </h1>
        <h1>Vaccination due on : </h1>
        <Link><h1 className='profileInfoEdit'>Edit Profile</h1></Link>
      </div>
    </div>
    </>
  )
}

export default Profile