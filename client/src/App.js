import React from "react";
import LandingPage from "./Components/LandingPage";
import Register from "./Components/Register";
import SecondaryRegister from "./Components/SecondaryRegister";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Base from "./Components/Base";

function App() {
  return (
    <div>
      <Routes>
        <Route path= "/Login" element={<LandingPage/>}/> 
        <Route path= "/Register" element={<Register/>}/> 
        <Route path= "/SecondaryRegister" element={<SecondaryRegister/>}/> 
        <Route path="/Profile" element={<Profile/> }/>
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;