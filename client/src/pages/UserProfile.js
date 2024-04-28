import React, { useState, useEffect } from "react";
import "../styles/userProfile.css";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";
import { calculateAge } from "../utils/common";
import { getData, postData } from "../lib/api";

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
  const [vaccination, setVaccintion] = useState("");
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const fetchID = async () => {
      const response = await getData("profiledata");
      let data = response.data;
      if (response.status === 401) {
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      }
      if (data.status === "ok") {
        setUserId(data.foundUser._id);
      }
    };

    const fetchData = async () => {
      try {
        const response = await postData("userdata", { userID: id });
        let data = response.data;
        if (data.status === "ok") {
          setName(data.foundUser.name);
          setBreed(data.foundUser.breed);
          setGender(data.foundUser.gender);
          setImage(data.foundUser.image);
          setBio(data.foundUser.bio);
          data.foundUser.requestRecieved.includes(userID)
            ? setButton("Pending...")
            : setButton("Connect +");
          data.foundUser.friends.includes(userID) ? (
            setButton(isRemoving ? "Removing..." : "Remove")
          ) : (
            <></>
          );
          const { ageInYears, ageInMonths, ageInDays } = calculateAge(
            data.foundUser.dob
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
      } catch (err) {
        console.log(err);
        toast.error("There was an error. Kindly referesh the page.");
      }
    };
    fetchID();
    fetchData();
  }, [id, userID, button]);

  const handleRemove = async (e) => {
    setIsRemoving(true);
    setButton("Removing...");
    try {
      const response = await postData("removeFriend", { friendID: id });
      let data = response.data;
      if (data.status === "ok") {
        setButton("Connect +");
        toast.success("Successfully removed.");
      }
    } catch (error) {
      toast.error("There was an error while performing this action.");
      setButton("Remove");
      setIsRemoving(false);
      return;
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

    // const response = await fetch(
    //   `${process.env.REACT_APP_BASE_URL}/addFriend`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       id,
    //     }),
    //     credentials: "include",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }
    // ).catch((err) => {
    //   toast.error("There was an error. Please try again or refresh the page.");
    //   return;
    // });
    // const data = await response.json();
    try {
      const response = await postData("addFriend", {
        id,
      });
      let data = response.data;
      if (data.status === "ok") {
        toast.success("Request Successfully sent.");
        setButton("Pending...");
      } else {
        toast.warn(data.status);
      }
    } catch (err) {
      toast.error("There was an error. Please try again or refresh the page.");
      return;
    }
  };
  return (
    <>
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
            <h4>{bio}</h4>
          </div>
          {id === userID ? (
            ""
          ) : (
            <button
              id="userProfileButton"
              onClick={handleConnect}
              disabled={isRemoving}
            >
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
              Vaccinated<p>{vaccination ? "Yes" : "No"}</p>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
