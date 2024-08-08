import React, { useEffect, useState } from "react";
import "../styles/message.css";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { PiDogFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { postData } from "../utils/api";
import { calculateAge } from "../utils/common";
import { useSelector } from "react-redux";
import dogMessageAnimation from "../assets/animations/dog message animation.json";
import Lottie from "lottie-react";

export default function Message({ refresh }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [vaccinated, setVaccinated] = useState();
  const [contactNumber, setContactNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [message, setMessage] = useState("");
  const [switchState, setSwitchState] = useState(false);
  const [friend, setFriend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lostLoading, setLostLoading] = useState(true);
  let url = document.location.href;
  url = url.replace("verify/generate-qr", "profile");
  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      const response = await postData("userdata");
      let data = response.data;
      if (data.status === "ok") {
        setLoading(false);
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        setFriend(data.foundUser.friends.includes(data.userID));
        setVaccinated(data.foundUser.vaccinated);
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
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postData("qrData");
        let data = response.data;
        if (data.status === "ok") {
          setLostLoading(false);
          setContactNumber(data.foundUser.contactNumber);
          setAlternateNumber(data.foundUser.alternateNumber);
          setMessage(data.foundUser.message);
          setSwitchState(data.foundUser.switchState);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div style={{ position: "relative" }} className="msgCard">
      {!loggedIn && (
        <div className="loginMessageCard">
          <Lottie
            className="messageIllustration"
            animationData={dogMessageAnimation}
            loop={true}
          />
          <h2>
            <a href="/verify/login">Login to</a> Get your Custom{" "}
            <span>Pet QR Card</span>
          </h2>
        </div>
      )}
      <div>
        <div className="header">
          <div className="logoInfoContainer">
            <h3>Wiggles</h3>
          </div>
          <Link
            to={url}
            className={`btn connect ${switchState ? "btnHidden" : "btnShow"}`}
          >
            {friend ? "Friends " : "Connect + "}
          </Link>
          <div className={`status ${switchState ? "btnShow" : "btnHidden"}`}>
            Lost
          </div>
        </div>
        <div className="scanCardProfileImgContainer">
          {image ? (
            <img
              className="scanCardProfilePicture"
              src={image}
              alt="Profile"
              loading="lazy"
            />
          ) : (
            <PiDogFill className="scanCardProfileDogIcon " />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={loading ? "skeletonText30 skeleton" : "petName"}>
            {name}
          </div>
        </div>
        <div className="petInfoPrimary">
          <span className={loading && "skeletonText10 skeleton"}>
            {gender}&nbsp;
          </span>
          |
          <span className={loading && "skeletonText10 skeleton"}>
            &nbsp;{age}
          </span>
        </div>
        <div className="petInfoSecondary">
          {switchState ? (
            <div className={loading ? "skeletonText30 skeleton" : "msgByOwner"}>
              {loading
                ? null
                : message.length
                ? message
                : "Please contact if you found my pet!"}
            </div>
          ) : (
            <div className={loading ? "skeletonText30 skeleton" : "bio"}>
              {bio}
            </div>
          )}
          <div className="otherInfo">
            <div className="dogBreed">
              Breed:
              <span className={loading && "skeletonText10 skeleton"}>
                &nbsp;{breed}
              </span>
            </div>
            <div className="vaccinated" id="vaccinated">
              Vaccinated:
              <span className={loading && "skeletonText10 skeleton"}>
                &nbsp;
                {vaccinated === undefined ? null : vaccinated ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`contactInfo ${switchState ? "divFlex" : "btnHidden"}`}>
        <span className={`${contactNumber == null ? "btnHidden" : "btnShow"}`}>
          If found, please contact on:
        </span>
        <span
          className={`contactPrimary ${
            contactNumber == null ? "btnHidden" : "btnShow"
          }`}
          onClick={() => {
            navigator.clipboard.writeText(contactNumber);
            toast.success("Number copied to clipboard");
          }}
        >
          <FiPhoneCall className="callIcon" />
          <span className={lostLoading && "skeletonText30 skeleton"}>
            &nbsp; {contactNumber}
          </span>
        </span>
        <span
          className={`contactSecondary ${
            alternateNumber == null ? "btnHidden" : "divFlex"
          }`}
          onClick={() => {
            navigator.clipboard.writeText(alternateNumber);
            toast.success("Number copied to clipboard");
          }}
        >
          <FiPhoneCall className="callIcon" />
          <span className={lostLoading && "skeletonText30 skeleton"}>
            &nbsp; {alternateNumber}
          </span>
        </span>
      </div>
    </div>
  );
}
