import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import  Home  from "./Components/Home";
import LandingPage from "./Components/Login";
import Register from "./Components/Register";
import SecondaryRegister from "./Components/SecondaryRegister";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import Explore from "./Components/Explore";
import Footer from "./Components/Footer"
import AllNotifications from "./Components/AllNotifications"
import OTP from "./Components/OTP";
import ChangePassword from "./Components/ChangePassword";
import UserProfile from "./Components/UserProfile";
import Friends from "./Components/Friends";
import Error404 from "./Components/Error404";

function App() { 
  const location=useLocation();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [location])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/Login" element={<LandingPage/>}/> 
        <Route path= "/OTPverification" element={<OTP/>}/> 
        <Route path= "/ChangePassword" element={<ChangePassword/>}/> 
        <Route path= "/Register" element={<Register/>}/> 
        <Route path= "/SecondaryRegister" element={<SecondaryRegister/>}/> 
        <Route path="/Profile" element={<Profile/> }/>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/AllNotifications" element={<AllNotifications />} />
        <Route path="/Profile/:id" element={<UserProfile />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;