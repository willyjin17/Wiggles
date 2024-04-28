import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";
import "../styles/notification.css";
import { toast } from "react-toastify";
import { NotificationSkeleton } from "../utils/skeleton";
import noNotification from "../assets/images/recentNotification.png";
import { getData } from "../lib/api";

const AllNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getnotifications = async () => {
      const response = await getData("notifications");
      let data = await response.data;
      if (response.status === 401) {
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      } else {
        data = await data.notifications;
        setNotifications(data);
        setLoading(false);
      }
    };
    getnotifications();
  }, [refresh]);

  return (
    <div className="allNotificationWrapper">
      <h1>Notifications</h1>
      <div className="allNotificationContainer">
        {loading ? (
          Array.from({ length: 7 }).map(() => <NotificationSkeleton />)
        ) : (notifications?.length ? (
          notifications.map((notification, idx) => (
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
          ))
        ) : (
          <div className="noNewNotification">
            <img src={noNotification} />
            <h3>You have no new notifications yet.</h3>
            <p>When you get notifications, they'll show up here</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotifications;
