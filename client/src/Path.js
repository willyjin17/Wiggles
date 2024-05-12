import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./components/Loader";

const Profile = lazy(() => import("./pages/Profile"));
const Explore = lazy(() => import("./pages/Explore"));
const AllNotifications = lazy(() => import("./pages/AllNotifications"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Friends = lazy(() => import("./pages/Friends"));
const QRGenerator = lazy(() => import("./pages/QRGenerator"));
const Vaccination = lazy(() => import("./pages/Vaccination"));
const Error404 = lazy(() => import("./pages/Error404"));
const UserVaccination = lazy(() => import("./components/UserVaccination"));

const Path = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <Explore />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Explore"
          element={
            <ProtectedRoute>
              {" "}
              <Suspense fallback={<Loader />}>
                <Explore />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllNotifications"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <AllNotifications />
              </Suspense>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile/:id"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <UserProfile />
              </Suspense>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Friends"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Friends />
              </Suspense>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/GenerateQR"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <QRGenerator />
              </Suspense>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Vaccination"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Vaccination />
              </Suspense>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Vaccination/:id"
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
    </div>
  );
};

export default Path;
