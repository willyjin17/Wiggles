import React from 'react'
import ProfilePhoto from "../images/profilephoto.png"
import {RiUserAddFill} from "react-icons/ri";
const NotificationCard = () => {
  return (
    <div className='cardContainer'>
      <img src={ProfilePhoto} alt="profile-img"></img>
      <div className='dogInfoContainer'>
        <div className='dogInformation'>
          <h2>Dog Name</h2>
          <p>User is requesting for a playdate</p>
        </div>
        <div className='addPlaydate'>
            <RiUserAddFill className='addPlaydateIcon'/>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
