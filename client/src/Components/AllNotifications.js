import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import NotificationCard from './NotificationCard'
import "../CSS/Notification.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AllNotifications = () => {
  const navigate=useNavigate();
  const[notifications, setNotifications]=useState("");
  const[refresh, setRefresh]=useState(false);

  useEffect(() => {
    const getnotifications = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications`, {
        method: "GET",
        credentials: "include",
      });
      let data = await response.json();
      if(response.status===401){
        toast.error("Kindly login first!")
        navigate("/verify/login");
        return;
      }
      else{
        data = await data.notifications;
        setNotifications(data);
      }
    };
    getnotifications();
  }, [refresh]); 
  

  return (
    <>
      <div className='allNotificationWrapper'>
        <h1>Notifications</h1>
        <div className='allNotificationContainer'>
          {notifications && notifications.map((notification, idx) => (
            <NotificationCard
              key={notification._id}
              id={notification._id}
              friendID={notification.friendID}
              title={notification.title}
              message={notification.message}
              image={notification.image}
              allnotificationactive={1}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        </div>
        {notifications.length ? <></> : <NotificationCard />}
      </div>
    </>
  )
  
}

export default AllNotifications