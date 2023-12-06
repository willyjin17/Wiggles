import React, { useEffect, useState } from "react";
import "../CSS/Message.css";
import { useParams, Link} from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

export default function Message({refresh}) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [message, setMessage] = useState("");
  const [switchState, setSwitchState] = useState(false);
  const [friend, setFriend] = useState(false);
  let url=document.location.href;
  url=url.replace("generateqr","profile");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/userdata`, {
        method: "POST",
        body: JSON.stringify({
          userID:id,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      let data = await response.json();
      if (data.status === "ok") {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        setFriend((data.foundUser.friends).includes(data.userID));
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
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/qrData`, {
          method: "POST",
          body: JSON.stringify({
            id,
          }),
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });
        let data = await response.json();
        if (data.status === "ok") {
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
          <Link to={url} className={(friend? "btn connect friendStatus":"btn connect")} style={{ display: `${switchState ? "none" : "initial"}`}} >{friend ? "Friends ":"Connect + "}</Link>
          <div style={{ display: `${switchState ? "initial" : "none"}` }} className="status">Lost</div>
        </div>
        <div className="profileImg">
          <img
            src={image}
            alt="Profile"
            className="userImage profilePicture"
            loading="lazy"
          />
        </div>
        <div className="petName">{name}</div>
        <div className="petInfoPrimary">
          {gender}&nbsp;|&nbsp;{age}
        </div>

        <div
          style={{ display: `${switchState? "block" : "none"}` }}
          className="msgByOwner"
        >
          {message.length ? message : "Please contact if you found my pet!"}
        </div>
        <div className="petInfoSecondary">
          <div
            style={{ display: `${switchState ? "none" : "initial"}` }}
            className="bio"
          >
            {bio}
          </div>
          <div className="otherInfo">
            <div className="dogBreed">Breed:&nbsp;{breed}</div>
            <div className="vaccinated" id="vaccinated">
              Vaccinated:&nbsp;
              { vaccinated  ? "Yes" : "No"}
            </div> 
          </div>
        </div>

        <div
          style={{ display: `${switchState ? "flex" : "none"}` }}
          className="contactInfo"
        >
          <span>If found, please contact on:</span>
          <span className="contactPrimary" style={{ display: `${contactNumber == null ? "none" : "initial"}` }}>
            <FiPhoneCall className="callIcon" />
            &nbsp; {contactNumber}
          </span>
          <span className="contactSecondary" style={{ display: `${alternateNumber == null ? "none" : "initial"}` }}>
            <FiPhoneCall className="callIcon" /> &nbsp; {alternateNumber}
          </span>
        </div>
      </div>
  );
}
