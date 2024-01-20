import React, { useEffect, useState } from "react";
import Logo from "../images/wigglesLogo.png";
import { IoIosNotifications } from "react-icons/io";
import DropDownNotification from "./RecentNotifications";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { SlGlobe } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { TbLogout, TbVaccine } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiDogFill } from "react-icons/pi";
import {NavbarSkeleton} from "./Skeleton/FriendsSkeleton"

import "../CSS/Navbar.css";
const Navbar = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [loading,setLoading]=useState(true);

  var showMenu = () => {
    var bar = document.getElementsByClassName("bar");
    var ham = document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.toggle("barOne");
    bar[1].classList.toggle("barTwo");
    bar[2].classList.toggle("barThree");
    ham[0].classList.toggle("navbarLinksMenuShow");
  };

  const [openNotification, setOpenNotification] = useState(true);
  const HandleClick = () => {
    setOpenNotification(!openNotification);
  };

  document.addEventListener("mousedown", handler);
  function handler() {
    setOpenNotification(true);
  }

  const notificationclick = document.getElementsByClassName("notificationIcon");
  notificationclick[0] &&
    notificationclick[0].addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

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
        toast.error("There was an error. Kindly refresh the page.");
      });
      if (response.status === 401) {
        return;
      }
      let data = await response.json();
      if (data.status === "ok") {
        setLoading(false);
        setName(data.foundUser.name);
        setImage(data.foundUser.image);
      } else {
        toast.error("There was an error. Kindly refresh the page.");
      }
    };
    fetchData();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 200) {
        // Successfully logged out
        navigate("/verify/login");
      } else {
        console.log("bad response");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbarLinks">
          <div className="Hamburger" onClick={showMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <Link to={"/Profile"} className="logo">
            <img src={Logo} alt="Website logo" loading="lazy" />
          </Link>
          <div className="navbarLinksMenu">
            <Link
              to="/Profile"
              className="navbarLinksProfile"
              onClick={showMenu}
            >
              <CgProfile className="reactIcon" />
              &nbsp;Profile
            </Link>
            <Link
              to="/Friends"
              className="navbarLinksNavigate"
              onClick={showMenu}
            >
              <AiOutlineUsergroupAdd className="reactIcon" />
              &nbsp;Friends
            </Link>
            <Link to="/Explore" onClick={showMenu}>
              <SlGlobe className="reactIcon" id="explore" />
              &nbsp;Explore
            </Link>
            <Link to="/Vaccination" onClick={showMenu}>
              <TbVaccine className="reactIcon" />
              &nbsp;Vaccination
            </Link>
            <Link to="/generateqr" onClick={showMenu}>
              <BsQrCodeScan className="reactIcon" />
              &nbsp;Pet QR
            </Link>
            <Link
              to="/verify/Contact"
              className="navbarLinksContact"
              onClick={showMenu}
            >
              <HiOutlineMail className="reactIcon" />
              &nbsp;Contact
            </Link>
            <Link className="navbarLinksContact" onClick={logout}>
              <TbLogout />
              &nbsp;Logout
            </Link>
          </div>
        </div>
        <div className="navbarWiggles">
            <h1>Wiggles</h1>
        </div>
        {loading && <NavbarSkeleton/>}
        {!loading && 
        <div className="navbarSecondaryInfo">
          <div className="navbarNotificationSection">
            <IoIosNotifications
              className={`notificationIcon ${
                openNotification ? "active" : "inactive"
              }`}
              onClick={HandleClick}
            />
            <DropDownNotification
              activestate={openNotification}
              setActiveState={setOpenNotification}
            />
          </div>
          
          <Link className="navbarDogInfo" to={"/Profile"}>
            <div className="navProfilePictureContainer">
              {image ? (
                <img
                  className="navProfilePicture"
                  src={image}
                  alt="Profile"
                  loading="lazy"
                />
              ) : (
                <PiDogFill className="navProfileDogIcon " />
              )}
            </div>
            <h2>{name}</h2>
          </Link>
        </div>}
      </div>
    </>
  );
};

export default Navbar;
