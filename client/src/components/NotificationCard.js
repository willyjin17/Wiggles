import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import "../styles/notification.css";
import { toast } from "react-toastify";
import { PiDogFill } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../lib/api";

const NotificationCard = ({
  id,
  friendID,
  title,
  message,
  image,
  allnotificationactive,
  setRefresh,
  refresh,
}) => {
  const [iconClicked, setIconClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Profile/" + friendID);
  };

  const handleAccept = async (e) => {
    e.stopPropagation();
    setIconClicked(true);
    try {
      const response = await postData("requestaccepted", {
        notificationID: id,
        friendID: friendID,
      });
      let data = response.data;
      if (data.status === "ok") {
        setRefresh(!refresh);
        toast.success("Successfully added.");
      }
    } catch (err) {
      toast.error("There was an error while performing this action.");
      return;
    }
  };

  const handleCancel = async (e) => {
    e.stopPropagation();
    setIconClicked(true);
    try {
      const response = await postData("requestdeclined", {
        notificationID: id,
        friendID: friendID,
      });
      let data = response.data;
      if (data.status === "ok") {
        setRefresh(!refresh);
        toast.success("Successfully removed.");
      }
    } catch (error) {
      toast.error("There was an error while performing this action.");
      return;
    }
  };

  return (
    <div
      className={`cardContainer ${
        allnotificationactive
          ? "allNotificationCardContainer"
          : "dropDownCardContainer"
      }`}
      onClick={handleClick}
    >
      {image ? (
        <img
          className={
            allnotificationactive
              ? "profilePicture allNotificationImg"
              : "profilePicture cardImage"
          }
          src={image}
          alt="Profile"
          loading="lazy"
        ></img>
      ) : (
        <div className="notiDogIconContainer">
          <PiDogFill className="notiDogIcon" />
        </div>
      )}
      <div className="dogInfoContainer">
        <div className="dogInformation">
          <h2
            className={
              allnotificationactive ? "allNotificationName" : "cardDogName"
            }
          >
            {title}
          </h2>
          <p
            className={
              allnotificationactive ? "allNotificationText" : "cardText"
            }
          >
            {message}
          </p>
        </div>
        {/* Buttons will be displayed only when there is a friend request. */}
        {title === "Friend request" &&
          <div className="addPlaydate">
            <AiOutlineCheck
              className={`addPlaydateIcon ${iconClicked && "inactive"}`}
              onClick={handleAccept}
            />
            <AiOutlineClose
              className={`addPlaydateIcon ${iconClicked && "inactive"}`}
              onClick={handleCancel}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default NotificationCard;
