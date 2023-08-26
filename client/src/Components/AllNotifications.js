import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import NotificationCard from './NotificationCard'
import "../CSS/Notification.css"
import Footer from './Footer'

const AllNotifications = () => {
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

  return (
    <>
    <Navbar />
      <div className='allNotificationWrapper'>
        <h1>Notifications</h1>
        <div className='allNotificationContainer'>
          {notifications && notifications.map((notification,idx)=>(
            <NotificationCard
              key={notification._id}
              id={notification._id}
              friendID={notification.friendID}
              title={notification.title}
              message={notification.message}
              allnotificationactive={1}
            />
          ))}  
        </div>
        {notifications.length ? <></>: <NotificationCard/>}
      </div>
      <Footer/>
    </>
  )
}

export default AllNotifications