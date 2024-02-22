import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import "react-toastify/dist/ReactToastify.css";
import Verify from "./Verify";
import Path from "./Path";

const Footer = lazy(() => import("./Components/Footer"));

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/verify/*" element={<Verify />} />
        <Route path="*" element={<Path />} />
      </Routes>
      <Footer />
      <SpeedInsights/>
      <Analytics />
      <ToastContainer />
    </div>
  );
}

export default App;
