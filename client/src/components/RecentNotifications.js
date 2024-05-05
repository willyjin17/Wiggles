import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../styles/notification.css";
import { NotificationSkeleton } from "../utils/skeleton";
import noNotification from "../assets/images/recentNotification.png";
import { getData } from "../utils/api";

export default function DropDownNotification({ activestate, setActiveState }) {
  const [loading, setLoading] = useState(true);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const outclick = document.getElementsByClassName("notificationContainer");
  outclick[0] &&
    outclick[0].addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

  useEffect(() => {
    const getnotifications = async () => {
      const response = await getData("notifications");
      let data = response.data;
      if (response.status === 401) {
        return;
      }
      data = await data.notifications;
      setRecentNotifications(
        data.filter(
          (notification) =>
            (new Date().getTime() - new Date(notification.date).getTime()) /
              (1000 * 60 * 60 * 24) <
            3
        )
      );
      setLoading(false);
    };
    if (!activestate) getnotifications();
  }, [activestate, refresh]);

  const handleClick = () => {
    setActiveState(!activestate);
  };

  return (
    <div
      className={`notificationContainer ${activestate ? "inactive" : "active"}`}
    >
      <div className="dropDownContainer">
        <h2>Notifications</h2>
        {loading ? (
          Array.from({ length: 3 }).map(() => <NotificationSkeleton />)
        ) : recentNotifications?.length ? (
          recentNotifications.map((notification, idx) => (
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
          ))
        ) : (
          <div className="noNewNotification">
            <img src={noNotification}  alt="No new notification icon"/>
            <h3>You have no new notifications yet.</h3>
            <p>When you get notifications, they'll show up here</p>
          </div>
        )}
      </div>
      <div className="allNotifications">
        <Link
          to="/AllNotifications"
          className="linksColor"
          onClick={handleClick}
        >
          Show all notifications
          <BsThreeDotsVertical className="allNotificationsIcon" />
        </Link>
      </div>
    </div>
  );
}
