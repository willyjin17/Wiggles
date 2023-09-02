import React, { useState } from 'react'
import ProfilePhoto from "../images/profilephoto.png"
import {AiOutlineClose,AiOutlineCheck} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import "../CSS/Notification.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationCard = ({id, friendID, title, message, image, allnotificationactive}) => {
  const navigate=useNavigate();
  
  const handleClick=(e)=>{
    navigate("/Profile/" + friendID);
  }
  
  const [iconClicked,setIconClicked]=useState(false);
  const HandleAccept=async(e)=>{
    e.stopPropagation();
    setIconClicked(true);
    const response = await fetch('http://localhost:3001/requestaccepted',{
      method:"POST",
      body: JSON.stringify({
        notificationID: id,
        friendID: friendID,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((error)=>{
      toast.error("There was an error while performing this action.");
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      toast.success("Successfully added.");
    }
  }

  const HandleCancel=async(e)=>{
    e.stopPropagation();
    const response = await fetch('http://localhost:3001/requestdeclined',{
      method:"POST",
      body: JSON.stringify({
        notificationID: id,
        friendID: friendID,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((error)=>{
      toast.error("There was an error while performing this action.");
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      toast.success("Successfully removed.");
    }
  }

  return (
    <>
    {/* If there is no title then "No new notifications" will be displayed */}
    {title ?
    <div className={`cardContainer ${(allnotificationactive ? "allNotificationCardContainer":"dropDownCardContainer")}`} onClick={handleClick}>
      <img className={ allnotificationactive ? "profilePicture allNotificationImg" : "profilePicture cardImage" } src={image || ProfilePhoto} alt="profile-img"></img>
      <div className='dogInfoContainer'>
        <div className='dogInformation'>
          <h2 className={ allnotificationactive ? "allNotificationName" : "cardDogName" }>{title}</h2>
          <p className={ allnotificationactive ? "allNotificationText" : "cardText" }>{message}</p>
        </div>

        {/* Buttons will be displayed only when there is a friend request. */}
        {title==="Friend request"?
        <div className='addPlaydate'>
          <AiOutlineCheck className={`addPlaydateIcon ${(iconClicked ? "inactive" : null)}`} onClick={HandleAccept}/>
          <AiOutlineClose className={`addPlaydateIcon ${(iconClicked ? "inactive" : null)}`} onClick={HandleCancel}/>
          {iconClicked ? <AiOutlineCheck className='addPlaydateIcon disabled' /> : null}
        </div>
        :
        <></>
        }
      </div>
    </div>
    :
    <p>No new notifications.</p>}
      {/* <ToastContainer /> */}
    </>
  )
}

export default NotificationCard
