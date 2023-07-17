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
