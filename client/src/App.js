import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import ProfileCard from "./pages/ProfileCard";
import Signup from "./pages/Signup";
import Loader from "./components/Loader";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import ViolationWrapper from "./utils/ViolationWrapper";

const Login = lazy(() => import("./pages/Login"));
const OTP = lazy(() => import("./pages/OTP"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutCreators = lazy(() => import("./pages/AboutCreators"));
const UserVaccination = lazy(() => import("./components/UserVaccination"));

const Profile = lazy(() => import("./pages/Profile"));
const Explore = lazy(() => import("./pages/Explore"));
const AllNotifications = lazy(() => import("./pages/AllNotifications"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Friends = lazy(() => import("./pages/Friends"));
const QRGenerator = lazy(() => import("./pages/QRGenerator"));
const Vaccination = lazy(() => import("./pages/Vaccination"));
const Error404 = lazy(() => import("./pages/Error404"));

const Footer = lazy(() => import("./components/Footer"));

function App() {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const excludedRoutes = ["/login", "/signup"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              {loggedIn ? <Navigate to="/" /> : <Login />}
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
              {loggedIn ? <Navigate to="/" /> : <Signup />}
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
        <Route
          path="/"
          element={
            <ViolationWrapper>
              <Suspense fallback={<Loader />}>
                <Explore />
              </Suspense>
            </ViolationWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ViolationWrapper>
              <Suspense fallback={<Loader />}>
                <Explore />
              </Suspense>
            </ViolationWrapper>
          }
        />
        <Route
          path="/all-notifications"
          element={
            // <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <AllNotifications />
            </Suspense>
            //   {" "}
            // </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            // <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <UserProfile />
            </Suspense>
            //   {" "}
            // </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ViolationWrapper>
              <Suspense fallback={<Loader />}>
                <Friends />
              </Suspense>
            </ViolationWrapper>
          }
        />
        <Route
          path="/generate-qr"
          element={
            // <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <QRGenerator />
            </Suspense>
            //   {" "}
            // </ProtectedRoute>
          }
        />
        <Route
          path="/vaccination"
          element={
            // <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Vaccination />
            </Suspense>
            //   {" "}
            // </ProtectedRoute>
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
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
      <SpeedInsights />
      <Analytics />
      <ToastContainer />
    </div>
  );
}

export default App;
