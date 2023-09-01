import React, { useEffect, useState } from 'react'
import ExploreProfileCard from "./ExploreProfileCard";
import Navbar from "./Navbar";
import "../CSS/Explore.css"
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const navigate = useNavigate();
  const[users, setUsers]=useState();
  const [authorized,setAuthorized] = useState(false);
  const[cookies, setCookie]=useCookies();
  const userID=cookies.userID;
  let status="";

  useEffect(()=>{
    const fetchdata = async()=>{
      const response=await fetch('http://localhost:3001/data',{
        method:"GET",
        credentials:'include',
      })
      .catch((err)=>{
        toast.error('There was an error in loading. Kindly refresh!');
        return;
      })
      let data= await response.json();
      if(data.status==="ok"){
        setAuthorized(true);
      }else{
        console.log("Navigating to login page...");
        navigate("/login")
        setAuthorized(false);
      }
      data=await data.Users;
      setUsers(data);
    }
    fetchdata();
  }, [])

  return (
    <>
    {authorized ?  <Navbar/>: <></>}
    
    <div id='profile-card-container'> 
      {users && 
      users.filter((User)=>(User._id!==userID))  //filter user
      .filter((User)=>(!(User.friends).includes(userID)))   //filter users' friends
      .map((User)=>(
        (User.requestRecieved).includes(userID) ? status="Pending..." : status="Connect +" ,  // Status based on request sent or not.
        <ExploreProfileCard 
          key={User._id}
          id={User._id}
          name={User.name}
          breed={User.breed}
          gender={User.gender}
          bio={User.bio}
          image={User.image}
          status={status}
        />
      ))}
      <ToastContainer />
    </div>
    {authorized ?  <Footer/>: <></>}
    </>
  )
}
