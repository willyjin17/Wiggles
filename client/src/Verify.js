import React, {Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom'
import ProfileCard from "./pages/ProfileCard";
import Signup from "./pages/Signup";

const Login = lazy(()=> import("./pages/Login"));
const OTP = lazy(()=> import("./pages/OTP"));
const ChangePassword = lazy(()=> import("./pages/ChangePassword"));
const Contact = lazy(()=> import("./pages/Contact"));
const AboutCreators = lazy(()=> import("./pages/AboutCreators"));
const UserVaccination = lazy(()=> import("./components/UserVaccination"));

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