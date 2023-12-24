import React, {Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom'
import ProfileCard from "./Components/ProfileCard";

const Login = lazy(()=> import("./Components/Login"));
const OTP = lazy(()=> import("./Components/OTP"));
const ChangePassword = lazy(()=> import("./Components/ChangePassword"));
const Register = lazy(()=> import("./Components/Register"));
const SecondaryRegister = lazy(()=> import("./Components/SecondaryRegister"));
const Contact = lazy(()=> import("./Components/Contact"));
const AboutCreators = lazy(()=> import("./Components/AboutCreators"));
const UserVaccination = lazy(()=> import("./Components/UserVaccination"));

const Verify = () => {
  return (
    <Routes>
      <Route path= "/Login" element={<Suspense fallback={<div>Loading</div>}><Login/></Suspense>}/> 
      <Route path= "/OTPverification" element={<Suspense fallback={<div>Loading</div>}><OTP/></Suspense>}/> 
      <Route path= "/ChangePassword" element={<Suspense fallback={<div>Loading</div>}><ChangePassword/></Suspense>}/> 
      <Route path= "/Register" element={<Suspense fallback={<div>Loading</div>}><Register/></Suspense>}/> 
      <Route path= "/SecondaryRegister" element={<Suspense fallback={<div>Loading</div>}><SecondaryRegister/></Suspense>}/> 
      <Route path= "/GenerateQR/:id" element={<Suspense fallback={<div>Loading</div>}><ProfileCard/></Suspense> }/>
      <Route path= "/Vaccination/:id" element={<Suspense fallback={<div>Loading</div>}><UserVaccination/></Suspense>} />
      <Route path= "/Contact" element={<Suspense fallback={<div>Loading</div>}><Contact /></Suspense>} />
      <Route path= "/AboutCreators" element={<Suspense fallback={<div>Loading</div>}><AboutCreators /></Suspense>} />
    </Routes>
  )
}

export default Verify