import React, { useEffect, useState } from 'react'
import "../CSS/FriendsCard.css"
import { useNavigate } from 'react-router-dom'

const FriendsCard = ({userID}) => {

  const navigate=useNavigate();
  const[name, setName]=useState("");
  const[age, setAge]=useState("");
  const[breed, setBreed]=useState("");
  const[gender, setGender]=useState("");
  const[image, setImage]=useState("");
  const[bio, setBio]=useState("");
  useEffect(()=>{
    const fetchFriendData=async()=>{
      const response=await fetch('http://localhost:3001/profiledata',{
        method:"POST",
        body:JSON.stringify({
          userID,
        }),
        credentials:"include",
        headers:{
          'Content-type' : 'application/json',
        },
      })
      .catch((err)=>{
        console.log(err);
        alert("There was an error. Kindly referesh the page.")
        return;
      })
      let data= await response.json();
      if(data.status==="ok")
      {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        var today = new Date();
        var dob=new Date(data.foundUser.dob);
        //subtracting in milliseconds and then converting result to years.
        var currAge =Math.floor( (today.getTime()-dob.getTime())/ (1000 * 60 *60 * 24*365)) 
        setAge(currAge);
      }
    }
  fetchFriendData();
  }, [userID]);
  const handleClick=(e)=>{
    navigate("/Profile/" + userID);
  }
  return (
    <div className='friendCardWrapper' onClick={handleClick}>
      <>
      <img className='friendsImage' src={image}></img>
      <div className='friendsInfo'>
      <h3>{name}</h3>
      <p>{bio}</p>
      </div>
      </>
      <button>Remove</button>
    </div>
  )
}

export default FriendsCard