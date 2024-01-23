import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import "../CSS/Notification.css"
import { toast } from 'react-toastify';
import { PiDogFill } from "react-icons/pi";
import 'react-toastify/dist/ReactToastify.css';
import noNotification from "../images/recent_Notification.png"

const NotificationCard = ({ id, friendID, title, message, image, allnotificationactive, setRefresh, refresh }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/Profile/" + friendID);
  }

  const [iconClicked, setIconClicked] = useState(false);
  const HandleAccept = async (e) => {
    e.stopPropagation();
    setIconClicked(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/requestaccepted`, {
      method: "POST",
      body: JSON.stringify({
        notificationID: id,
        friendID: friendID,
      }),
      credentials: "include",
      headers: {
        'Content-type': 'application/json',
      },
    })
      .catch((error) => {
        toast.error("There was an error while performing this action.");
        return;
      })
    const data = await response.json();
    if (data.status === "ok") {
      setRefresh(!refresh)
      toast.success("Successfully added.");
    }
  }

  const HandleCancel = async (e) => {
    e.stopPropagation();
    setIconClicked(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/requestdeclined`, {
      method: "POST",
      body: JSON.stringify({
        notificationID: id,
        friendID: friendID,
      }),
      credentials: "include",
      headers: {
        'Content-type': 'application/json',
      },
    })
      .catch((error) => {
        toast.error("There was an error while performing this action.");
        return;
      })
    const data = await response.json();
    if (data.status === "ok") {
      setRefresh(!refresh);
      toast.success("Successfully removed.");
    }
  }

  return (
    <>
    {/* If there is no title then "No new notifications" will be displayed */}
    {title ?
    <div className={`cardContainer ${(allnotificationactive ? "allNotificationCardContainer":"dropDownCardContainer")}`} onClick={handleClick}>
      {image ? (<img className={ allnotificationactive ? "profilePicture allNotificationImg" : "profilePicture cardImage" } src={image} alt="Profile" loading='lazy'></img>) : (<div className='notiDogIconContainer'><PiDogFill className='notiDogIcon'/></div>)}
      <div className='dogInfoContainer'>
        <div className='dogInformation'>
          <h2 className={ allnotificationactive ? "allNotificationName" : "cardDogName" }>{title}</h2>
          <p className={ allnotificationactive ? "allNotificationText" : "cardText" }>{message}</p>
        </div>
            {/* Buttons will be displayed only when there is a friend request. */}
            {title === "Friend request" ?
              <div className='addPlaydate'>
                <AiOutlineCheck className={`addPlaydateIcon ${(iconClicked ? "inactive" : null)}`} onClick={HandleAccept} />
                <AiOutlineClose className={`addPlaydateIcon ${(iconClicked ? "inactive" : null)}`} onClick={HandleCancel} />
              </div>
              :
              <></>
            }
          </div>
        </div>
        :
        <div className="noNewNotification">
          <img src={noNotification}/>
          <h3 >You have no new notifications yet.</h3>
          <p >When you get notifications, they'll show up here</p>
          {/* <button className='btn'>Refresh</button> */}
        </div>}
    </>
  )
}

export default NotificationCard
