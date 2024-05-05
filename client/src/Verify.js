import React, {Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom'
import ProfileCard from "./Components/ProfileCard";
import Signup from "./Components/Signup";

const Login = lazy(()=> import("./Components/Login"));
const OTP = lazy(()=> import("./Components/OTP"));
const ChangePassword = lazy(()=> import("./Components/ChangePassword"));
const Contact = lazy(()=> import("./Components/Contact"));
const AboutCreators = lazy(()=> import("./Components/AboutCreators"));
const UserVaccination = lazy(()=> import("./Components/UserVaccination"));

const Verify = () => {
  return (
    <Routes>
      <Route path= "/Login" element={<Suspense fallback={<div>Loading</div>}><Login/></Suspense>}/> 
      <Route path= "/OTPverification" element={<Suspense fallback={<div>Loading</div>}><OTP/></Suspense>}/> 
      <Route path= "/ChangePassword" element={<Suspense fallback={<div>Loading</div>}><ChangePassword/></Suspense>}/> 
      <Route path= "/Signup" element={<Suspense fallback={<div>Loading</div>}><Signup/></Suspense>}/> 
      <Route path= "/GenerateQR/:id" element={<Suspense fallback={<div>Loading</div>}><ProfileCard/></Suspense> }/>
      <Route path= "/Vaccination/:id" element={<Suspense fallback={<div>Loading</div>}><UserVaccination/></Suspense>} />
      <Route path= "/Contact" element={<Suspense fallback={<div>Loading</div>}><Contact /></Suspense>} />
      <Route path= "/AboutCreators" element={<Suspense fallback={<div>Loading</div>}><AboutCreators /></Suspense>} />
    </Routes>
  )
}

export default Verify