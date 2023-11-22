import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../Components/Navbar";
import ReactSwitch from "react-switch";
import "../CSS/QRGenerator.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import Share from "./ShareProfileCard";
import { BsShareFill } from "react-icons/bs";

export default function QRGenerator() {
  const navigate = useNavigate();
  const [userID, setUserId] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [message, setMessage] = useState("");
  const [switchState, setSwitchState] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    setRefresh(!refresh)
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
      await fetch(
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
    setRefresh(!refresh)
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `${name}_Wiggles.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    toast.success("Successfully Downloaded");
  };

  const handleShare = () => {
    const pannel = document.body.getElementsByClassName("shareProfileCardPannel");
    const icon = document.body.getElementsByClassName("ProfileCardShareIcon");
    pannel[0].classList.toggle("sharePannelVisible");
    icon[0].classList.toggle("ProfileCardShareIconRotate");
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
                  rows={5}
                  placeholder="Drop your message here"
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
          <div className="QRGeneratorProfileCard">
            <Message refresh={refresh}/>
            <span className="ProfileCardShare">
              <BsShareFill
                className="ProfileCardShareIcon"
                onClick={handleShare}
              />
              <Share userID={userID} />
            </span>
          </div>
        </div>
      </div>

      <div className="qrCodeContainer">
        <h1 className="qrTitle qrGuide">
          How QR will help in finding your Pet?
        </h1>
        <p className="stepTitle qrGuide">Download QR Code:</p>
        <p className="stepDesc qrGuide">
          To get started, download the QR code from our website. It's like a
          special picture that contains important information about your pet.
        </p>
        <p className="stepTitle qrGuide">Attach to Your Pet:</p>
        <p className="stepDesc qrGuide">
          Paste this QR code on your pet's collar or belt. You can also attach
          it to your pet's tag or accessories. Make sure it's visible but not
          uncomfortable for your pet.
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
          <div className="qrTxt" onClick={downloadQRCode}>
            Save
          </div>
        </div>
        <p className="stepTitle qrGuide">Scan with a Phone:</p>
        <p className="stepDesc qrGuide">
          If your pet goes missing, someone can use their smartphone to scan the
          QR code. It's easy - just open the camera app and point it at the
          code.
        </p>
        <p className="stepTitle qrGuide">Pet's Profile:</p>
        <p className="stepDesc qrGuide">
          After scanning, your pet's profile card will magically appear on their
          phone. It's like an ID card for your pet, and it has all the important
          info like their name, your contact details, and more.
        </p>
        <p className="stepTitle qrGuide">Helpful in Emergencies:</p>
        <p className="stepDesc qrGuide">
          In case of an emergency, you can set up a special message on our
          website. If your pet is lost, just press the button, and that message
          will also show up on the profile card when someone scans the QR code.
          With this QR code, if someone finds your lost pet, they can easily
          reach out to you. It's like a digital tag for your furry friend.
        </p>
      </div>
    </>
  );
}
