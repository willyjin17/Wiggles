import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import "../CSS/Login.css";
import "../CSS/Profile.css";
import EditProfile from "./EditProfile";
import { PiDogFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/userdata`,
        {
          method: "POST",
          credentials: "include",
        }
      ).catch((err) => {
        console.log(err);
        alert("There was an error. Kindly referesh the page.");
      });
      let data = await response.json();
      if(response.status===401){
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      }
      if (data.status === "ok") {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        if(data.foundUser.image=="null"){
          setImage(null)
        }
        else{
          setImage(data.foundUser.image);
        }
        setBio(data.foundUser.bio);
        setAddress(data.foundUser.address);
        var today = new Date();
        var dob = new Date(data.foundUser.dob);
        setDob(data.foundUser.dob.slice(0, 10));
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
      }
    };
    fetchData();
  }, [openEditProfile]);

  return (
    <>
      <div className="profile">
        <div className="userProfilePicture">
          {image ? (
            <img
              className="profilePicture"
              src={image}
              alt="Profile"
              loading="lazy"
            />
          ) : (
            <PiDogFill className="profileIcon" />
          )}
        </div>
        <div className="profileInfoPrimary">
          <h1>Name : {name}</h1>
          <h1>Bio : {bio}</h1>
          <h1>Breed : {breed}</h1>
          <h1>Gender : {gender}</h1>
          <h1>Age : {age}</h1>
          <h1>Address : {address} </h1>
          {/* <h1>Vaccination due on : </h1> */}
          <h1
            className="profileInfoEdit"
            onClick={() => {
              setOpenEditProfile(true);
              document.querySelector(".profile").style.blur = "30px";
            }}
          >
            <AiOutlineSetting /> &nbsp;Edit Profile
          </h1>
        </div>
      </div>
      {openEditProfile && (
        <EditProfile
          closeEditProfile={setOpenEditProfile}
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          breed={breed}
          setBreed={setBreed}
          dob={dob}
          setDob={setDob}
          gender={gender}
          setGender={setGender}
          address={address}
          setAddress={setAddress}
          editImage={image}
        />
      )}
    </>
  );
};

export default Profile;
