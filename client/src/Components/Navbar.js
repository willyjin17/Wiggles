import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/wigglesLogo.png";
import { IoIosNotifications } from "react-icons/io";
import DropDownNotification from "./RecentNotifications";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [name, setName] = useState("");
  const [cookies] = useCookies();
  const [image, setImage] = useState("");
  const userID = cookies.userID;

  var showMenu = () => {
    var bar = document.getElementsByClassName("bar");
    var ham = document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.toggle("barOne");
    bar[1].classList.toggle("barTwo");
    bar[2].classList.toggle("barThree");
    ham[0].classList.toggle("navbarLinksMenuShow");
  };

  const [openNotification, setOpenNotification] = useState("false");
  const HandleClick = () => {
    setOpenNotification(!openNotification);
  };

  document.addEventListener("mousedown", handler);
  function handler() {
    setOpenNotification("false");
  }

  const notificationclick = document.getElementsByClassName("notificationIcon");
  notificationclick[0] &&
    notificationclick[0].addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/profiledata", {
        method: "POST",
        body: JSON.stringify({
          userID,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }).catch((err) => {
        console.log(err);
        toast.error("There was an error. Kindly refresh the page.");
      });
      let data = await response.json();
      if (data.status === "ok") {
        setName(data.foundUser.name);
        setImage(data.foundUser.image);
      } else {
        toast.error("There was an error. Kindly refresh the page.");
      }
    };
    fetchData();
  }, [userID]);

  return (
    <>
      <div className="navbar">
        <div className="Hamburger" onClick={showMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="navbarLinks">
          <Link to={"/Profile"}>
            <img className="logo" src={Logo} alt="" />
          </Link>
          <div className="navbarLinksMenu">
            <Link to="/Profile" className="navbarLinksProfile">
              Profile
            </Link>
            {/* <Link>Vaccinations</Link> */}
            <Link>Friends</Link>
            <Link to="/Explore">Explore</Link>
            <Link to="/Contact" className="navbarLinksContact">
              Contact
            </Link>
          </div>
        </div>
        <IoIosNotifications
          className={`notificationIcon ${
            openNotification ? "active" : "inactive"
          }`}
          onClick={HandleClick}
        />
        <Link className="navbarDogInfo" to={"/Profile"}>
          <img className="dogPhoto" src={image} alt="" />
          <h2>{name}</h2>
        </Link>
      </div>
      <DropDownNotification activestate={openNotification} />
      <ToastContainer/>
    </>
  );
};

export default Navbar;
