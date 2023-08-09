import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom'
import Logo from "../images/wigglesLogo.png";
import ProfilePhoto from "../images/profilephoto.png";
import { IoIosNotifications } from "react-icons/io";
import DropDownNotification from './DropDownNotification';
const Navbar = () => {
  var showMenu= ()=>{
    var bar=document.getElementsByClassName("bar");
    var ham=document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.toggle("barOne");
    bar[1].classList.toggle("barTwo");
    bar[2].classList.toggle("barThree");

    ham[0].classList.toggle("navbarLinksMenuShow");

}
  const [openNotification,setOpenNotification]=useState('false');
  const HandleClick = () =>{
    setOpenNotification(!openNotification)
  }

document.addEventListener("mousedown",handler)
function handler(){
  setOpenNotification("false");
}

const notificationclick=document.getElementsByClassName("notificationIcon");
notificationclick[0] && notificationclick[0].addEventListener("mousedown",(event)=>{
  event.stopPropagation();
})

    
  return (
    <>
    <div className='navbar'>
      <div className='Hamburger' onClick={showMenu}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
        
      <div className='navbarLinks'>
        <Link to={"/"}><img className="logo" src={Logo} alt="" /></Link>
        <div className='navbarLinksMenu'>
          <Link className='navbarLinksProfile'>Profile</Link>
          <Link>Vaccinations</Link>
          <Link>Friends</Link>
          <Link>Add Sibling</Link>
          <Link>Settings</Link> 
          <Link to="/Contact" className='navbarLinksContact'>Contact</Link>
        </div>
      </div>
      <IoIosNotifications 
        className={`notificationIcon ${(openNotification ? "active": "inactive")}`}
        onClick={HandleClick}
         
        />
      <Link className='navbarDogInfo' to={"/Profile"}>
        <img className='dogPhoto' src={ProfilePhoto} alt="" />
        <h2>Dog Name</h2>
      </Link>
      </div>
    <DropDownNotification
    activestate={openNotification} />
  </>
  )
}


export default Navbar