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
import { postData } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { loginUser } from "../features/isLoggedInSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [openNotification, setOpenNotification] = useState(true);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

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
        toast.error(
          err.message === "Request failed with status code 401" &&
            "Please login first!"
        );
      }
    };
    if (!loggedIn) {
      setLoading(false);
      return;
    } else {
      fetchData();
    }
  }, [loggedIn]);

  const showMenu = () => {
    var bar = document.getElementsByClassName("bar");
    var ham = document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.toggle("barOne");
    bar[1].classList.toggle("barTwo");
    bar[2].classList.toggle("barThree");
    ham[0].classList.toggle("navbarLinksMenuShow");
  };

  const closeMenu = () => {
    var bar = document.getElementsByClassName("bar");
    var ham = document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.remove("barOne");
    bar[1].classList.remove("barTwo");
    bar[2].classList.remove("barThree");
    ham[0].classList.remove("navbarLinksMenuShow");
  };

  const logout = async () => {
    try {
      const response = await postData("logout");
      if (response.status === 200) {
        dispatch(loginUser(false));
        window.location.reload();
        navigate("/");
      } else {
        toast.error("Something went wrong. Please try again later.");
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
        <Link to={"/profile"} className="logo">
          <img src={Logo} alt="Website logo" loading="lazy" />
        </Link>
        <div className="navbarLinksMenu">
          <Link
            to="/profile"
            className="navbarLinksProfile"
            style={loggedIn ? { display: "initial" } : { display: "none" }}
            onClick={closeMenu}
          >
            <CgProfile className="reactIcon" />
            &nbsp;Profile
          </Link>
          <Link
            to="/friends"
            className="navbarLinksNavigate"
            onClick={closeMenu}
          >
            <AiOutlineUsergroupAdd className="reactIcon" />
            &nbsp;Friends
          </Link>
          <Link to="/explore" onClick={closeMenu}>
            <SlGlobe className="reactIcon" id="explore" />
            &nbsp;Explore
          </Link>
          <Link to="/vaccination" onClick={closeMenu}>
            <TbVaccine className="reactIcon" />
            &nbsp;Vaccination
          </Link>
          <Link to="/generate-qr" onClick={closeMenu}>
            <BsQrCodeScan className="reactIcon" />
            &nbsp;Pet QR
          </Link>
          <Link
            to="/contact"
            className="navbarLinksContact"
            onClick={closeMenu}
          >
            <HiOutlineMail className="reactIcon" />
            &nbsp;Contact
          </Link>
          <Link
            className="navbarLinksContact"
            style={loggedIn ? { display: "initial" } : { display: "none" }}
            onClick={logout}
          >
            <TbLogout />
            &nbsp;Logout
          </Link>
        </div>
      </div>
      <div className="navbarWiggles">
        <h1>Wiggles</h1>
      </div>
      {loggedIn ? (
        <>
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

              <Link className="navbarDogInfo" to={"/profile"}>
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
          )}{" "}
        </>
      ) : (
        <div className="navbarSecondaryInfo">
          <Button text="Login / Signup" type="button" path="/login" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
