import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

const Profile = lazy(() => import("./pages/Profile"));
const Explore = lazy(() => import("./pages/Explore"));
const AllNotifications = lazy(() => import("./pages/AllNotifications"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Friends = lazy(() => import("./pages/Friends"));
const QRGenerator = lazy(() => import("./pages/QRGenerator"));
const Vaccination = lazy(() => import("./pages/Vaccination"));
const Error404 = lazy(() => import("./components/Error404"));

const Path = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<ProtectedRoute><Suspense fallback={<div>Loading</div>}><Profile /></Suspense></ProtectedRoute>} />
        <Route path="/Explore" element={<ProtectedRoute> <Suspense fallback={<div>Loading</div>}><Explore /></Suspense></ProtectedRoute>} />
        <Route path="/AllNotifications" element={<ProtectedRoute><Suspense fallback={<div>Loading</div>}><AllNotifications /></Suspense> </ProtectedRoute>} />
        <Route path="/Profile/:id" element={<ProtectedRoute><Suspense fallback={<div>Loading</div>}><UserProfile /></Suspense> </ProtectedRoute>} />
        <Route path="/Friends" element={<ProtectedRoute><Suspense fallback={<div>Loading</div>}><Friends /></Suspense> </ProtectedRoute>} />
        <Route path="/GenerateQR" element={<ProtectedRoute><Suspense fallback={<div>Loading</div>}><QRGenerator /></Suspense> </ProtectedRoute>} />
        <Route path="/Vaccination" element={<ProtectedRoute><Suspense fallback={<div>Loading</div>}><Vaccination /></Suspense> </ProtectedRoute>} />
        <Route path="*" element={<Suspense fallback={<div>Loading</div>}><Error404 /></Suspense>} />
      </Routes>
    </div>
  )
}

export default Path