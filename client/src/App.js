import React from "react";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import  DogInformation  from "./components/DogInformation";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;