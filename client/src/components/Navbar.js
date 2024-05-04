import React, { useEffect, useState } from "react";
import Logo from "../assets/images/wigglesLogo.png";
import { IoIosNotifications } from "react-icons/io";
import DropDownNotification from "./RecentNotifications";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { SlGlobe } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { TbLogout, TbVaccine } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiDogFill } from "react-icons/pi";
import { NavbarSkeleton } from "../utils/skeleton";
import "../styles/navbar.css";
import { postData } from "../lib/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [openNotification, setOpenNotification] = useState(true);

  document.addEventListener("mousedown", () => {
    setOpenNotification(true);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postData("userdata");
        if (response.status === 401) {
          return;
        }
        let data = response.data;
        if (data.status === "ok") {
          setLoading(false);
          setName(data.foundUser.name);
          setImage(data.foundUser.image);
        } else {
          toast.error("There was an error. Kindly refresh the page.");
        }
      } catch (err) {
        // toast.error(err.message);
      }
    };
    fetchData();
  }, []);

  const showMenu = () => {
    var bar = document.getElementsByClassName("bar");
    var ham = document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.toggle("barOne");
    bar[1].classList.toggle("barTwo");
    bar[2].classList.toggle("barThree");
    ham[0].classList.toggle("navbarLinksMenuShow");
  };

  const logout = async () => {
    try {
      const response = await postData("logout");
      if (response.status === 200) {
        navigate("/verify/login");
      } else {
        console.log("bad response");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
          <Link to="/Profile" className="navbarLinksProfile" onClick={showMenu}>
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
      {loading ? (
        <NavbarSkeleton />
      ) : (
        <div className="navbarSecondaryInfo">
          <div className="navbarNotificationSection">
            <IoIosNotifications
              className={`notificationIcon ${
                openNotification ? "active" : "inactive"
              }`}
              onClick={() => setOpenNotification(!openNotification)}
              onMouseDown={(e) => e.stopPropagation()}
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
        </div>
      )}
    </div>
  );
};

export default Navbar;
