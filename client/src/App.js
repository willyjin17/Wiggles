import React from "react";
import  Home  from "./components/Home";
import LandingPage from "./Components/LandingPage";
import Register from "./Components/Register";
import SecondaryRegister from "./Components/SecondaryRegister";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Base from "./Components/Base";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

function App() {
  const [cookies,setcookie]=useCookies();
  var isLoggedIn = cookies.token;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
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