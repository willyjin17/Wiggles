import React from "react";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import  DogInformation  from "./components/DogInformation";
import  Home  from "./components/Home";
import Profile from "./components/Profile";
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
        <Route path= "/SecondaryRegister" element={<DogInformation/>}/> 
        <Route path="/Profile" element={isLoggedIn? <Profile/> : <Home/>}/>
      </Routes>
    </div>
  );
}

export default App;