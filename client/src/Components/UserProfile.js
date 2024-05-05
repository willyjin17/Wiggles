import React, { useState, useEffect } from "react";
import "../CSS//UserProfile.css";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";

const UserProfile = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [button, setButton] = useState("Connect +");
  const [userID, setUserId] = useState("");
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const fetchID = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/profiledata`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if(response.status===401){
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      }
      let data = await response.json();
      if (data.status === "ok") {
        setUserId(data.foundUser._id);
      }
    };
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/userdata`,
        {
          method: "POST",
          body: JSON.stringify({
            userID: id,
          }),
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).catch((err) => {
        console.log(err);
        toast.error("There was an error. Kindly referesh the page.");
      });
      let data = await response.json();
      if (data.status === "ok") {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        data.foundUser.requestRecieved.includes(userID)
          ? setButton("Pending...")
          : setButton("Connect +");
        data.foundUser.friends.includes(userID) ? setButton(isRemoving ? 'Removing...' : 'Remove') : <></>;
        var today = new Date();
        var dob = new Date(data.foundUser.dob);
        //subtracting in milliseconds and then converting result to years.
        const ageInMilliseconds = today.getTime() - dob.getTime();

        const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
        const millisecondsPerMonth = (365.25 / 12) * 24 * 60 * 60 * 1000;
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        var ageInYears = Math.floor(ageInMilliseconds / millisecondsPerYear);
        var ageInMonths = Math.floor(
          (ageInMilliseconds % millisecondsPerYear) / millisecondsPerMonth
        );
        var ageInDays = Math.floor(
          (ageInMilliseconds % millisecondsPerMonth) / millisecondsPerDay
        );
        if (ageInYears >= 1) {
          setAge(ageInYears + " years");
        } else if (ageInMonths >= 1) {
          setAge(ageInMonths + " months");
        } else {
          setAge(ageInDays + " days");
        }
      } else {
        toast.warn("Kindly login first.");
      }
    };
    fetchID();
    fetchData();
  }, [id, userID, button]);

  const handleRemove = async (e) => {
    setIsRemoving(true);
    setButton("Removing...");
    
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/removeFriend`,
      {
        method: "POST",
        body: JSON.stringify({
          friendID: id,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).catch((error) => {
      toast.error("There was an error while performing this action.");
      setButton("Remove");
      setIsRemoving(false);
      // alert("There was an error while performing this action.");
      return;
    });
    const data = await response.json();
    if (data.status === "ok") {
      setButton("Connect +");
      toast.success("Successfully removed.");
      // alert("Successfully removed.")
    }
  };

  const handleConnect = async (event) => {
    if (button === "Pending...") {
      toast.warn("Request already sent.");
      return;
    }
    if (button === "Remove") {
      handleRemove();
      return;
    }
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
      toast.error("There was an error. Please try again or refresh the page.");
      return;
    });
    const data = await response.json();
    if (data.status === "ok") {
      toast.success("Request Successfully sent.");
      setButton("Pending...");
    } else {
      toast.warn(data.status);
    }
  };
  return (
    <>
      <Navbar />
      <div className="userProfileWrapper">
        <div className="userProfileContainer">
          <div className="userProfilePrimary">
            <h1>{name}</h1>
            <div className="exploreUserProfilePictureContainer">
              {image ? (
                <img
                  className="exploreUserprofilePicture"
                  src={image}
                  alt="Profile"
                  loading="lazy"
                />
              ) : (
                <PiDogFill className="exploreUserProfileDogIcon" />
              )}
            </div>
            {/* {image && <img  className="profilePicture" src={image} alt="Profile" loading='lazy'/>} */}
            <h4>{bio}</h4>
          </div>
          {id === userID ? (
            ""
          ) : (
            <button id="userProfileButton" onClick={handleConnect} disabled={isRemoving}>
              {button}
            </button>
          )}
          <div className="userProfileSecondary">
            <h2>
              Breed<p>{breed}</p>
            </h2>
            <h2>
              Age<p>{age}</p>
            </h2>
            {id === userID ? (
              ""
            ) : (
              <h2 className="profileButton">
                <button id="profileButton" onClick={handleConnect}>
                  {button}
                </button>
              </h2>
            )}
            <h2>
              Gender<p>{gender}</p>
            </h2>
            <h2>
              Playdate<p>Yes</p>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
