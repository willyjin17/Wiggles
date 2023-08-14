import React from 'react'
import Navbar from "./Navbar"
import NotificationCard from './NotificationCard'
const AllNotifications = () => {
  return (
    <>
    <Navbar />
      <div className='allNotificationWrapper'>
        <h1>Notifications</h1>
        <div className='allNotificationContainer'>
            <NotificationCard allnotificationactive={1}/>
            <NotificationCard allnotificationactive={1}/>
            <NotificationCard allnotificationactive={1}/>
            <NotificationCard allnotificationactive={1}/>

        </div>
      </div>
    </>
  )
}

export default AllNotifications