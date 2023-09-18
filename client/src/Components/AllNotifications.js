import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import NotificationCard from './NotificationCard'
import "../CSS/Notification.css"
import { useNavigate } from 'react-router-dom';

const AllNotifications = () => {
  const navigate = useNavigate();

  const[notifications, setNotifications]=useState("");
  const [authorized,setAuthorized] = useState(false);

  useEffect(() => {
    const getnotifications = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications`, {
        method: "GET",
        credentials: "include",
      });
      let data = await response.json();
      if (response.status !== 200) {
        console.log("Navigating to login page...");
        navigate("/login");
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
      data = await data.notifications;
      setNotifications(data);
    };
    getnotifications();
  }, [notifications]); 
  

  return authorized ? (
    <>
      <Navbar />
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
            />
          ))}
        </div>
        {notifications.length ? <></> : <NotificationCard />}
      </div>
      {/* <Footer/> */}
    </>
  ) : <></>;
  
}

export default AllNotifications