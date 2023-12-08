import React, { useEffect, useState } from 'react'
import ExploreProfileCard from "./ExploreProfileCard";
import Navbar from "./Navbar";
import "../CSS/Explore.css"
import { toast } from 'react-toastify';
import { ExploreCardSkeleton } from './Skeleton/FriendsSkeleton';
import 'react-toastify/dist/ReactToastify.css';

export default function Explore() {
  const[users, setUsers]=useState();
  const[userID, setUserID]=useState("");
  const[loading,setLoading]=useState(true);
  let status="";

  useEffect(()=>{
    setTimeout( async()=>{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/data`,{
        method:"GET",
        credentials:'include',
      })
      .catch((err)=>{
        toast.error('There was an error in loading. Kindly refresh!');
        return;
      })
      let data= await response.json();
      if(data.status==="ok"){
        setUserID(data.userID);
        setLoading(false);
      }else{
        return;
      }
      data=await data.Users;
      setUsers(data);
    }, 1000)
  })

  return (
    <>
    {/* <Navbar/> */}
    <div id='profile-card-container'> 
      {users && 
      users.filter((User)=>(User._id!==userID))  //filter user
      .filter((User)=>(!(User.friends).includes(userID)))   //filter users' friends
      .map((User)=>(
        (User.requestRecieved).includes(userID) ? status="Pending..." : status="Connect +",   // Status based on request sent or not.
        <ExploreProfileCard 
          key={User._id}
          id={User._id}
          name={User.name}
          breed={User.breed}
          gender={User.gender}
          bio={User.bio}
          image={User.image}
          status={status}
          loading={loading}
        />
      ))}
      { !users && 
      <>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      <ExploreCardSkeleton/>
      </> 
      }
    </div>
    </>
  )
}
