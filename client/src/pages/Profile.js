import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import "../styles/login.css";
import "../styles/profile.css";
import EditProfile from "../components/EditProfile";
import { PiDogFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../lib/api";
import Cookies from "js-cookie";
import { calculateAge } from "../utils/common";

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
  const navigate = useNavigate();

  const encodedUserID = Cookies.get("userID");
  const decodedUserID = decodeURIComponent(encodedUserID);

  const matchResult = decodedUserID?.match(/"([^"]+)"/);
  const userID = matchResult ? matchResult[1] : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postData("userdata", { userID });
        let data = response.data;
        if (response.status === 401) {
          toast.error("Kindly login first!");
          navigate("/verify/login");
          return;
        }
        if (data.status === "ok") {
          setName(data.foundUser.name);
          setBreed(data.foundUser.breed);
          setGender(data.foundUser.gender);
          if (data.foundUser.image === "null") {
            setImage(null);
          } else {
            setImage(data.foundUser.image);
          }
          setBio(data.foundUser.bio);
          setAddress(data.foundUser.address);
          const { ageInYears, ageInMonths, ageInDays } = calculateAge(
            data.foundUser.dob
          );
          setDob(data.foundUser.dob.slice(0, 10));
          if (ageInYears >= 1) {
            setAge(ageInYears + " years");
          } else if (ageInMonths >= 1) {
            setAge(ageInMonths + " months");
          } else {
            setAge(ageInDays + " days");
          }
        }
      } catch (err) {
        toast.warn(err);
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
