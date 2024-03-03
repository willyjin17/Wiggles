import React, {Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import  Home  from "./components/Home";
import Navbar from "./components/Navbar";

const Profile = lazy(()=> import("./pages/Profile"));
const EditProfile = lazy(()=> import("./components/EditProfile"));
const Explore = lazy(()=> import("./pages/Explore"));
const AllNotifications = lazy(()=> import("./pages/AllNotifications"));
const UserProfile = lazy(()=> import("./pages/UserProfile"));
const Friends = lazy(()=> import("./pages/Friends"));
const QRGenerator = lazy(()=> import("./pages/QRGenerator"));
const Vaccination = lazy(()=> import("./pages/Vaccination"));
const Error404 = lazy(()=> import("./components/Error404"));

const Path = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Suspense fallback={<div>Loading</div>}><Profile/></Suspense>}/>
        {/* <Route path="/EditProfile" element={<Suspense fallback={<div>Loading</div>}><EditProfile/></Suspense>}/> */}
        <Route path="/Explore" element={<Suspense fallback={<div>Loading</div>}><Explore /></Suspense>} />
        <Route path="/AllNotifications" element={<Suspense fallback={<div>Loading</div>}><AllNotifications /></Suspense>} />
        <Route path="/Profile/:id" element={<Suspense fallback={<div>Loading</div>}><UserProfile /></Suspense>} />
        <Route path="/Friends" element={<Suspense fallback={<div>Loading</div>}><Friends /></Suspense>} />
        <Route path="/GenerateQR" element={<Suspense fallback={<div>Loading</div>}><QRGenerator/></Suspense> }/>
        <Route path="/Vaccination" element={<Suspense fallback={<div>Loading</div>}><Vaccination/></Suspense>} />
        <Route path="*" element={<Suspense fallback={<div>Loading</div>}><Error404 /></Suspense>} />
      </Routes>
    </div>
  )
}

export default Path