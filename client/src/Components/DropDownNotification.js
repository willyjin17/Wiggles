import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import {BsThreeDotsVertical} from "react-icons/bs";

export default function DropDownNotification({activestate}){

    const outclick=document.getElementsByClassName("notificationContainer");
    outclick[0] && outclick[0].addEventListener("mousedown",(event)=>{
        event.stopPropagation();
    })
    
    return(
        <div className={`notificationContainer ${(activestate ? "inactive" : "active")}`}>
            <div className="dropDownContainer">
                <h2>Notifications</h2>
                <NotificationCard />
                <NotificationCard />
            </div> 
            <div className="allNotifications"> 
                <Link className="links-color">Show all notifications</Link>
                <BsThreeDotsVertical className="allNotificationsIcon"/>
            </div>
        </div>
    );
}