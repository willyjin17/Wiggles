import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import  Home  from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SecondaryRegister from "./Components/SecondaryRegister";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import Contact from "./Components/Contact";
import Explore from "./Components/Explore";
import AllNotifications from "./Components/AllNotifications"
import OTP from "./Components/OTP";
import ChangePassword from "./Components/ChangePassword";
import UserProfile from "./Components/UserProfile";
import Friends from "./Components/Friends";
import Error404 from "./Components/Error404";
import Footer from "./Components/Footer";
import AboutCreators from "./Components/AboutCreators";
import QRGenerator from "./Components/QRGenerator";
import Message from "./Components/Message";
import Vaccination from "./Components/Vaccination";
import UserVaccination from "./Components/UserVaccination";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() { 
  const location=useLocation();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [location])

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
        <Route path="/Friends" element={<Friends />} />
        <Route path="/GenerateQR" element={<QRGenerator/> }/>
        <Route path="/GenerateQR/:id" element={<Message/> }/>
        <Route path="/Vaccination" element={<Vaccination/>} />
        <Route path="/Vaccination/:id" element={<UserVaccination/>} />
        <Route path="/AboutCreators" element={<AboutCreators />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer/>
      <ToastContainer/> 
    </div>
  );
}

export default App;