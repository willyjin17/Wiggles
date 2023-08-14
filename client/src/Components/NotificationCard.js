import React, { useState } from 'react'
import ProfilePhoto from "../images/profilephoto.png"
import {PiDogFill} from "react-icons/pi";
import {AiOutlineClose,AiOutlineCheck} from "react-icons/ai"

const NotificationCard = ({allnotificationactive}) => {
  const [iconClicked,setIconClicked]=useState(false);
  function HandleIconClick(){
    setIconClicked(true);
    seNotificationText("Playdate accepted")
  }
  const [notificationText,seNotificationText]=useState("User is requesting for a playdate");
  return (
    <div className={`cardContainer ${(allnotificationactive ? "allNotificationCardContainer":"dropDownCardContainer")}`}>
      <img className={ allnotificationactive ? "allNotificationImg" : "cardImage" } src={ProfilePhoto} alt="profile-img"></img>
      <div className='dogInfoContainer'>
        <div className='dogInformation'>
          <h2 className={ allnotificationactive ? "allNotificationName" : "cardDogName" }>Dog Name</h2>
          <p className={ allnotificationactive ? "allNotificationText" : "cardText" }>{notificationText}</p>
        </div>
        <div className='addPlaydate'>
            <AiOutlineCheck className={`addPlaydateIcon ${(iconClicked ? "inactive" : null)}`} onClick={HandleIconClick}/>
            <AiOutlineClose className={`addPlaydateIcon ${(iconClicked ? "inactive" : null)}`}/>
            {iconClicked ? <AiOutlineCheck onClick={HandleIconClick} className='addPlaydateIcon disabled' /> : null}
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
