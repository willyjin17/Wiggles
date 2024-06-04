import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "./pages/ProfileCard";
import Signup from "./pages/Signup";
import Loader from "./components/Loader";
import CommunityGuidelines from "./pages/CommunityGuidelines";

const Login = lazy(() => import("./pages/Login"));
const OTP = lazy(() => import("./pages/OTP"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutCreators = lazy(() => import("./pages/AboutCreators"));
const UserVaccination = lazy(() => import("./components/UserVaccination"));

const Verify = () => {
    const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            {
                loggedIn 
                ? (<Navigate to="/" />) 
                : (<Login />)
            }
          </Suspense>
        }
      />
      <Route
        path="community-guidelines"
        element={
          <Suspense fallback={<Loader />}>
            <CommunityGuidelines />
          </Suspense>
        }
      />
      <Route
        path="/otp-verification"
        element={
          <Suspense fallback={<Loader />}>
            <OTP />
          </Suspense>
        }
      />
      <Route
        path="/change-password"
        element={
          <Suspense fallback={<Loader />}>
            <ChangePassword />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader />}>
            {
                loggedIn 
                ? (<Navigate to="/" />) 
                : (<Signup />)
            }
          </Suspense>
        }
      />
      <Route
        path="/generate-qr/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ProfileCard />
          </Suspense>
        }
      />
      <Route
        path="/vaccination/:id"
        element={
          <Suspense fallback={<Loader />}>
            <UserVaccination />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path="/about-creators"
        element={
          <Suspense fallback={<Loader />}>
            <AboutCreators />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Verify;
