import React from "react";
import LandingPage from "./Components/LandingPage";
import Register from "./Components/Register";
import  DogInformation  from "./Components/DogInformation";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Base from "./Components/Base";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;