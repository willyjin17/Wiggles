import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import {BsThreeDotsVertical} from "react-icons/bs";
import "../CSS/Notification.css"
import { NotificationSkeleton } from './Skeleton/FriendsSkeleton'


export default function DropDownNotification({activestate,setActiveState}){
    let totalNotifications = [];
    const [loading,setLoading]=useState(true);
    const outclick=document.getElementsByClassName("notificationContainer");
    outclick[0] && outclick[0].addEventListener("mousedown",(event)=>{
        event.stopPropagation();
    })
    
    const[notifications, setNotifications]=useState("");
    const[refresh, setRefresh]=useState(false);
    useEffect(()=>{
        const getnotifications=async()=>{
          const response=await fetch(`${process.env.REACT_APP_BASE_URL}/notifications`,{
            method: "GET",
            credentials:"include",
          })
          let data=await response.json();
          if(response.status===401){
            return;
          }
          data=await data.notifications;
          setNotifications(data);
          setLoading(false);
        }
        if(!activestate)
        getnotifications();
      },[activestate, refresh]);

    const handleClick =()=>{
        setActiveState(!activestate);
    }

    return(
        <div className={`notificationContainer ${(activestate ? "inactive" : "active")}`}>
            <div className="dropDownContainer">
                <h2>Notifications</h2>
                {notifications && (totalNotifications=notifications
                .filter((notification)=>((((new Date()).getTime()-(new Date(notification.date)).getTime())/(1000 * 60 *60 * 24))<3))
                .map((notification, idx)=>( 
                    <React.Fragment key={notification._id}>
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
                    </React.Fragment>
                )))}
                {loading && 
                <>
                <NotificationSkeleton/>
                <NotificationSkeleton/>
                <NotificationSkeleton/>
                </>
                }

            {!loading ? (totalNotifications.length ? <></> : <NotificationCard/>): null }

            </div> 
            <div className="allNotifications"> 
                <Link to="/AllNotifications" className="links-color" onClick={handleClick}>Show all notifications
                <BsThreeDotsVertical className="allNotificationsIcon"/>
                </Link>
            </div>
        </div>
    );
}