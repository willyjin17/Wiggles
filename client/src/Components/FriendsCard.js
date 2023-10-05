import React, { useEffect, useState } from 'react'
import "../CSS/FriendsCard.css"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FriendsCard = ({userID, setRefresh}) => {
  const navigate=useNavigate();
  const[name, setName]=useState("");
  const[image, setImage]=useState("");
  const[bio, setBio]=useState("");
  
  useEffect(()=>{
    const fetchFriendData=async()=>{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/userdata`,{
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
        toast.error("There was an error. Kindly referesh the page.")
        return;
      })
      let data= await response.json();
      if(data.status==="ok")
      {
        setName(data.foundUser.name);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
      }
    }
  fetchFriendData();
  }, [userID]);

  const handleClick=(e)=>{
    navigate("/Profile/" + userID);
  }

  const handleRemove=async(e)=>{
    e.stopPropagation();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/removeFriend`,{
      method:"POST",
      body: JSON.stringify({
        friendID: userID,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((error)=>{
      toast.error("There was an error while performing this action.")
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      toast.success("Successfully removed.")
      setRefresh(true);
    }
  }

  return (
    <>
    <div className='friendCardWrapper' onClick={handleClick}>
      <>
      <img className='friendsImage' src={image} alt="Friend"></img>
      <div className='friendsInfo'>
      <h3>{name}</h3>
      <p>{bio}</p>
      </div>
      </>
      <button onClick={handleRemove}>Remove</button>
    </div>
    </>
  )
}

export default FriendsCard