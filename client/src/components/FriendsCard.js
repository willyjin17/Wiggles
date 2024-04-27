import React, { useEffect, useState } from "react";
import "../styles/friendsCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";
import { postData } from "../lib/api";

const FriendsCard = ({ userID, setRefresh }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await postData("userdata", {
          userID,
        });
        let data = response.data;
        if (data.status === "ok") {
          setName(data.foundUser.name);
          setImage(data.foundUser.image);
          setBio(data.foundUser.bio);
        }
      } catch (err) {
        console.log(err);
        toast.error("There was an error. Kindly referesh the page.");
        return;
      }
    };
    fetchFriendData();
  }, [userID]);

  const handleClick = (e) => {
    navigate("/Profile/" + userID);
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    setIsRemoving(true);

    try {
      const response = await postData("removeFriend", {
        friendID: userID,
      });
      let data = response.data;
      if (data.status === "ok") {
        toast.success("Successfully removed.");
        setRefresh(true);
      }
    } catch (err) {
      toast.error("There was an error while performing this action.");
      setIsRemoving(false);
      return;
    }
  };

  return (
    <>
      <div className="friendCardWrapper" onClick={handleClick}>
        <div className="friendsInfoContainer">
          <div className="friendsProfilePictureContainer">
            {image ? (
              <img
                className="friendsProfilePicture"
                src={image}
                alt="Friend"
                loading="lazy"
              />
            ) : (
              <PiDogFill className="friendsProfileIcon" />
            )}
          </div>
          <div className="friendsInfo">
            <h3>{name}</h3>
            <p>{bio}</p>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="removeFriendBtn"
          disabled={isRemoving}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </>
  );
};

export default FriendsCard;
