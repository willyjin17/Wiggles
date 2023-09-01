import React from "react";
import  Home  from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SecondaryRegister from "./Components/SecondaryRegister";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import Contact from "./Components/Contact";
import Explore from "./Components/Explore";
import Footer from "./Components/Footer"
import AllNotifications from "./Components/AllNotifications"
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import OTP from "./Components/OTP";
import ChangePassword from "./Components/ChangePassword";
import "./CSS/Navbar.css"
import UserProfile from "./Components/UserProfile";

function App() {
  const [cookies,setcookie]=useCookies();
  var isLoggedIn = cookies.token;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/Login" element={<Login/>}/> 
        <Route path= "/OTPverification" element={<OTP/>}/> 
        <Route path= "/ChangePassword" element={<ChangePassword/>}/> 
        <Route path= "/Register" element={<Register/>}/> 
        <Route path= "/SecondaryRegister" element={<SecondaryRegister/>}/> 
        <Route path="/Profile" element={<Profile/> }/>
        <Route path="/EditProfile" element={<EditProfile/> }/>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/AllNotifications" element={<AllNotifications />} />
        <Route path="/Profile/:id" element={<UserProfile />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;