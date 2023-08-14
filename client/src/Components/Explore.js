import React, { useEffect, useState } from 'react'
import ExploreProfileCard from "./ExploreProfileCard";
import Navbar from "./Navbar";

export default function Explore() {
  const[users, setUsers]=useState();

  useEffect(()=>{
    const fetchdata = async()=>{
      const response=await fetch('http://localhost:3001/data',{
        method:"GET",
        credentials:'include',
      })
      .catch((err)=>{
        console.log(err);
        alert("There was an error in loading. Kindly refresh!")
      })
      let data= await response.json();
      data=await data.Users;
      setUsers(data);
      console.log(data.image);
    }
    fetchdata();
  }, [])

  return (
    <>
    <Navbar />
    <div id='profile-card-container'>
      {users && users.map((User)=>(
        <React.Fragment key={User._id}>
          <ExploreProfileCard 
            name={User.name}
            breed={User.breed}
            gender={User.gender}
            bio={User.bio}
            image={User.image}
          />
        </React.Fragment>
      ))}
       
      <ExploreProfileCard />
    </div>
    </>
  )
}
