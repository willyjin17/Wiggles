import React, {Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom'
import ProfileCard from "./pages/ProfileCard";
import Signup from "./pages/Signup";
import Loader from "./components/Loader";

const Login = lazy(()=> import("./pages/Login"));
const OTP = lazy(()=> import("./pages/OTP"));
const ChangePassword = lazy(()=> import("./pages/ChangePassword"));
const Contact = lazy(()=> import("./pages/Contact"));
const AboutCreators = lazy(()=> import("./pages/AboutCreators"));
const UserVaccination = lazy(()=> import("./components/UserVaccination"));

const Verify = () => {
  return (
    <Routes>
      <Route path= "/Login" element={<Suspense fallback={<Loader />}><Login/></Suspense>}/> 
      <Route path= "/OTPverification" element={<Suspense fallback={<Loader />}><OTP/></Suspense>}/> 
      <Route path= "/ChangePassword" element={<Suspense fallback={<Loader />}><ChangePassword/></Suspense>}/> 
      <Route path= "/Signup" element={<Suspense fallback={<Loader />}><Signup/></Suspense>}/> 
      <Route path= "/GenerateQR/:id" element={<Suspense fallback={<Loader />}><ProfileCard/></Suspense> }/>
      <Route path= "/Vaccination/:id" element={<Suspense fallback={<Loader />}><UserVaccination/></Suspense>} />
      <Route path= "/Contact" element={<Suspense fallback={<Loader />}><Contact /></Suspense>} />
      <Route path= "/AboutCreators" element={<Suspense fallback={<Loader />}><AboutCreators /></Suspense>} />
    </Routes>
  )
}

export default Verify