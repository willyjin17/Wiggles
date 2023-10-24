import React, {Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import  Home  from "./Components/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileCard from "./Components/ProfileCard";

const Login = lazy(()=> import("./Components/Login"));
const OTP = lazy(()=> import("./Components/OTP"));
const ChangePassword = lazy(()=> import("./Components/ChangePassword"));
const Register = lazy(()=> import("./Components/Register"));
const SecondaryRegister = lazy(()=> import("./Components/SecondaryRegister"));
const Profile = lazy(()=> import("./Components/Profile"));
const EditProfile = lazy(()=> import("./Components/EditProfile"));
const Contact = lazy(()=> import("./Components/Contact"));
const Explore = lazy(()=> import("./Components/Explore"));
const AllNotifications = lazy(()=> import("./Components/AllNotifications"));
const UserProfile = lazy(()=> import("./Components/UserProfile"));
const Friends = lazy(()=> import("./Components/Friends"));
const QRGenerator = lazy(()=> import("./Components/QRGenerator"));
const Message = lazy(()=> import("./Components/Message"));
const Vaccination = lazy(()=> import("./Components/Vaccination"));
const UserVaccination = lazy(()=> import("./Components/UserVaccination"));
const AboutCreators = lazy(()=> import("./Components/AboutCreators"));
const Error404 = lazy(()=> import("./Components/Error404"));
const Footer = lazy(()=> import("./Components/Footer"));


function App() { 
  const location=useLocation();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [location])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/Login" element={<Suspense fallback={<div>Loading</div>}><Login/></Suspense>}/> 
        <Route path= "/OTPverification" element={<Suspense fallback={<div>Loading</div>}><OTP/></Suspense>}/> 
        <Route path= "/ChangePassword" element={<Suspense fallback={<div>Loading</div>}><ChangePassword/></Suspense>}/> 
        <Route path= "/Register" element={<Suspense fallback={<div>Loading</div>}><Register/></Suspense>}/> 
        <Route path= "/SecondaryRegister" element={<Suspense fallback={<div>Loading</div>}><SecondaryRegister/></Suspense>}/> 
        <Route path="/Profile" element={<Suspense fallback={<div>Loading</div>}><Profile/></Suspense>}/>
        <Route path="/EditProfile" element={<Suspense fallback={<div>Loading</div>}><EditProfile/></Suspense>}/>
        <Route path="/Contact" element={<Suspense fallback={<div>Loading</div>}><Contact /></Suspense>} />
        <Route path="/Explore" element={<Suspense fallback={<div>Loading</div>}><Explore /></Suspense>} />
        <Route path="/AllNotifications" element={<Suspense fallback={<div>Loading</div>}><AllNotifications /></Suspense>} />
        <Route path="/Profile/:id" element={<Suspense fallback={<div>Loading</div>}><UserProfile /></Suspense>} />
        <Route path="/Friends" element={<Suspense fallback={<div>Loading</div>}><Friends /></Suspense>} />
        <Route path="/GenerateQR" element={<Suspense fallback={<div>Loading</div>}><QRGenerator/></Suspense> }/>
        <Route path="/GenerateQR/:id" element={<Suspense fallback={<div>Loading</div>}><ProfileCard/></Suspense> }/>
        <Route path="/Vaccination" element={<Suspense fallback={<div>Loading</div>}><Vaccination/></Suspense>} />
        <Route path="/Vaccination/:id" element={<Suspense fallback={<div>Loading</div>}><UserVaccination/></Suspense>} />
        <Route path="/AboutCreators" element={<Suspense fallback={<div>Loading</div>}><AboutCreators /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<div>Loading</div>}><Error404 /></Suspense>} />
      </Routes>
      <Footer/>
      <ToastContainer/> 
    </div>
  );
}

export default App;