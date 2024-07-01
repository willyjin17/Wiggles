import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";
import { postData } from "../utils/api";
import { useSelector } from "react-redux";

export default function ExploreProfileCard({
  id,
  name,
  breed,
  gender,
  bio,
  image,
  status,
  loading,
  setOpenPopup,
}) {
  const navigate = useNavigate();
  const [button, setButton] = useState(status);
  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  const handleClick = (e) => {
    navigate("/profile/" + id);
  };

  const handleConnect = async (event) => {
    event.stopPropagation();
    if (loggedIn) {
      if (button === "Pending...") {
        toast.warn("Request already sent!");
        return;
      }
      setButton("Pending...");
      try {
        const response = await postData("addFriend", {
          id,
        });
        let data = response.data;
        if (data.status === "ok") {
          toast.success("Request successfully sent.");
        } else {
          toast.warn(data.status);
        }
      } catch (err) {
        console.log(err);
        toast.error(
          "There was an error. Please try again or refresh the page."
        );
        return;
      }
    } else if (!loggedIn) {
      setOpenPopup(true);
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
              {bio || <p>Here we will show your bio.</p>}
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
