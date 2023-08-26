import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import {BsThreeDotsVertical} from "react-icons/bs";
import "../CSS/Notification.css"

export default function DropDownNotification({activestate}){

    const outclick=document.getElementsByClassName("notificationContainer");
    outclick[0] && outclick[0].addEventListener("mousedown",(event)=>{
        event.stopPropagation();
    })
    
    const[notifications, setNotifications]=useState("");
    useEffect(()=>{
        const getnotifications=async()=>{
          const response=await fetch('http://localhost:3001/notifications',{
            method: "GET",
            credentials:"include",
          })
          let data=await response.json();
          data=await data.notifications;
          setNotifications(data);
        }
        getnotifications();
      },[]);
    
    return(
        <div className={`notificationContainer ${(activestate ? "inactive" : "active")}`}>
            <div className="dropDownContainer">
                <h2>Notifications</h2>
                {notifications && notifications.map((notification,idx)=>(
                    <NotificationCard
                        key={notification._id}
                        id={notification._id}
                        friendID={notification.friendID}
                        title={notification.title}
                        message={notification.message}
                        image={notification.image}
                        allnotificationactive={1}
                    />
                ))}
                {notifications.length? <></> : <NotificationCard/>}

            </div> 
            <div className="allNotifications"> 
                <Link to="/AllNotifications" className="links-color">Show all notifications
                <BsThreeDotsVertical className="allNotificationsIcon"/>
                </Link>
            </div>
        </div>
    );
}