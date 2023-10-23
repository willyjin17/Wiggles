import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../Components/Navbar";
import ReactSwitch from "react-switch";
import "../CSS/QRGenerator.css";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BsShareFill } from "react-icons/bs";
import ShareVaccination from "./ShareVaccinations";
import Message from "./Message";

export default function QRGenerator() {
  const navigate = useNavigate();
  const [userID, setUserId] = useState("");
  // const [checked, setChecked] = useState(false);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  // const toggleFullScreen = () => {
  //   setIsFullScreen(!isFullScreen);
  // };
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [switchState, setSwitchState] = useState(false);
  const [show, setShow] = useState(0);
  const [print, setPrint] = useState(false);

  const handleSwitch = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/qrSwitch`, {
        method: "POST",
        body: JSON.stringify({
          switchState: !switchState,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/profiledata`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        let data = await response.json();
        if (data.status === "ok") {
          setName(data.foundUser.name);
          setImage(data.foundUser.image);
          setUserId(data.foundUser._id);
        } else {
          toast.error("Please reload!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchState = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/qrData`,
          {
            method: "POST",
            body: JSON.stringify({
              userID,
            }),
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        let data = await response.json();
        // console.log(data);
        if (data.status === "ok") {
          setContactNumber(data.foundUser.contactNumber);
          setAlternateNumber(data.foundUser.alternateNumber);
          setMessage(data.foundUser.message);
          setSwitchState(data.foundUser.switchState);
          // console.log(data.foundUser.switchState);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    fetchState();
  }, [userID]);

  // if (!contactNumber.match(/^\d{10}$/)) {
  //   toast.error("Please enter a valid 10-digit phone number.")
  //   return;
  // }
  // if (!alternateNumber.match(/^\d{10}$/)) {
  //   toast.error("Please enter a valid 10-digit phone number.")
  //   return;
  // }
  // if(message === ""){
  //   toast.error("Please enter a valid message.")
  //   return;
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/qr-code`,
        {
          method: "POST",
          body: JSON.stringify({
            contactNumber,
            alternateNumber,
            message,
          }),
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      toast.success("Successfully Updated.");
    } catch (err) {
      toast.error(
        "There was an error. Kindly referesh the page and try again."
      );
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `${name}` + "_Wiggles.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    toast.success("Successfully Downloaded");
  };

  const handleClick = (e) => {
    navigate("/generateqr/" + userID);
  };

  return (
    <>
      <Navbar />
      <div className="bgLostPet">
        <div className="bgHeader"></div>
        <div className="lostPetContainer">
          <form className="msgContainerLeft">
            <div className="messageTitle">
              <h2>Lost Pet?</h2>
              <div className="lostPet">
                <ReactSwitch
                  checked={switchState}
                  onChange={() => {
                    setSwitchState(!switchState);
                    handleSwitch();
                  }}
                  onColor="#fed3a3"
                  onHandleColor="#ff8400"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                />
              </div>
            </div>
            <div className="msgForm">
              <label id="contactno">
                <input
                  className="inputField"
                  type="number"
                  name="contact no"
                  value={contactNumber}
                  placeholder="Contact Number"
                  onChange={(event) => {
                    setContactNumber(event.target.value);
                  }}
                  required
                />
              </label>
              <label id="alternateContactno">
                <input
                  className="inputField"
                  type="number"
                  name="contact no"
                  value={alternateNumber}
                  placeholder="Alternate Contact Number"
                  onChange={(event) => {
                    setAlternateNumber(event.target.value);
                  }}
                  required
                />
              </label>
              <label id="message">
                <textarea
                  className="inputField"
                  id="textarea"
                  type="text"
                  name="message"
                  value={message}
                  rows={7}
                  placeholder="Drop your message here."
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  required
                />
              </label>
              <button
                className="btn uploadMsg"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
          <Message />
        </div>
      </div>

      <div className="qrCodeContainer">
        <h1 className="qrTitle qrGuide">
          How QR will help in finding your Pet?
        </h1>
        <p className="stepTitle qrGuide">Step1:</p>
        <p className="stepDesc qrGuide">
          Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, ex ea commodo
          consequat.{" "}
        </p>
        <p className="stepTitle qrGuide">Step2:</p>
        <p className="stepDesc qrGuide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="qrCard">
          <QRCodeCanvas
            id="qrCodeEl"
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`${document.location.href + "/" + userID}`}
            viewBox={`0 0 256 256`}
            className="qrImg"
          />
          <div className="qrTxt">Wiggles</div>
        </div>
        <p className="stepTitle qrGuide">Step3:</p>
        <p className="stepDesc qrGuide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna
          aliqua. Ut enim ad minim veniam, ex ea commodo consequat.{" "}
        </p>
        <p className="stepTitle qrGuide">Step4:</p>
        <p className="stepDesc qrGuide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.{" "}
        </p>
      </div>
    </>
  );
}
