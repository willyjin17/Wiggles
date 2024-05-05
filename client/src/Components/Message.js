import React, { useEffect, useState } from "react";
import "../CSS/Message.css";
import { useParams, Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { PiDogFill } from "react-icons/pi";
import { toast } from "react-toastify";

export default function Message({ refresh }) {
  const { id } = useParams();
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
  url = url.replace("verify/generateqr", "profile");

  useEffect(() => {
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
      );
      let data = await response.json();
      if (data.status === "ok") {
        setLoading(false);
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        setFriend(data.foundUser.friends.includes(data.userID));
        setVaccinated(data.foundUser.vaccinated);
        var today = new Date();
        var dob = new Date(data.foundUser.dob);
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
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/qrData`,
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
        );
        let data = await response.json();
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
  }, [id, refresh]);

  return (
    <div className="msgCard">
      <div className="header">
        <div className="logoInfoContainer">
          <h3>Wiggles</h3>
        </div>
        <Link
          to={url}
          className="btn connect"
          style={{ display: `${switchState ? "none" : "initial"}` }}
        >
          {friend ? "Friends " : "Connect + "}
        </Link>
        <div
          style={{ display: `${switchState ? "initial" : "none"}` }}
          className="status"
        >
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

      <div className={loading ? "skeletonText30 skeleton" : "petName"}>
        {name}
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

      <div
        style={{ display: `${switchState ? "flex" : "none"}` }}
        className="contactInfo"
      >
        <span
          style={{ display: `${contactNumber == null ? "none" : "initial"}` }}
        >
          If found, please contact on:
        </span>
        <span
          className="contactPrimary"
          onClick={() => {
            navigator.clipboard.writeText(contactNumber);
            toast.success("Number copied to clipboard");
          }}
          style={{ display: `${contactNumber == null ? "none" : "initial"}` }}
        >
          <FiPhoneCall className="callIcon" />
          <span className={lostLoading && "skeletonText30 skeleton"}>
            &nbsp; {contactNumber}
          </span>
        </span>
        <span
          className="contactSecondary"
          onClick={() => {
            navigator.clipboard.writeText(alternateNumber);
            toast.success("Number copied to clipboard");
          }}
          style={{
            display: `${alternateNumber == null ? "none" : "initial"}`,
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
