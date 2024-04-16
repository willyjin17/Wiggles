import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";
import { postData } from "../lib/api";

export default function ExploreProfileCard({
  id,
  name,
  breed,
  gender,
  bio,
  image,
  status,
}) {
  const navigate = useNavigate();
  const [button, setButton] = useState(status);

  const handleClick = (e) => {
    navigate("/Profile/" + id);
  };

  const handleConnect = async (event) => {
    event.stopPropagation();
    if (button === "Pending...") {
      toast.warn("Request already sent!");
      return;
    }
    setButton("Pending...");
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/addFriend`,
      {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).catch((err) => {
      console.log(err);
      toast.error("There was an error. Please try again or refresh the page.");
      return;
    });
    const data = await response.json();
    if (data.status === "ok") {
      toast.success("Request successfully sent.");
    } else {
      toast.warn(data.status);
    }
  };

  return (
    <>
      <div className="profileCard" onClick={handleClick}>
        <div className="exploreCardProfilePictureContainer">
          {image ? (
            <img
              className="exploreCardProfilePicture"
              src={image}
              alt="Profile"
              loading="lazy"
            />
          ) : (
            <PiDogFill className="exploreCardProfileDogIcon " />
          )}
        </div>
        <div id="profileInfo">
          <div className="primaryInfo">
            <span id="gender">{gender} | </span>
            <span id="name">{name}</span>
          </div>
          <div className="secondaryInfo">
            <div id="breed">{breed}</div>
            <div id="bio" className="bioText">
              {bio || <p> </p>}
            </div>
          </div>
          <button id="playdate" onClick={handleConnect}>
            {button}
          </button>
        </div>
      </div>
    </>
  );
}
