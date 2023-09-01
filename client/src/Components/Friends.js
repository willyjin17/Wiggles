import FriendsCard from './FriendsCard'
import Navbar from './Navbar'
import "../CSS/FriendsCard.css"
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Footer from './Footer'

export const Friends = () => {
  const[cookies]=useCookies();
  const ID=cookies.userID;
  const [friends, setFriends]=useState([]);

  useEffect(()=>{
    const fetchFriends=async(e)=>{
      const response=await fetch("http://localhost:3001/friends",{
        method:"POST",
        credentials:"include",
        body: JSON.stringify({
          ID,
        }),
        headers:{
          'Content-type' : 'application/json',
        },
      })
      let data=await response.json();
      data=await data.friends;
      setFriends(data);
    } 
    fetchFriends();
  }, [setFriends]);

  return (
    <>
    <Navbar/>
    <div className='friendsWrapper'>
      <h1>My Friends</h1>
      <div className='friendsCardContainer'>
        {friends.length ? friends.map((friend)=>(
          <FriendsCard
            key={friend}
            userID={friend}
          />
        )):
        <p> <br/>No friends to show.</p>}     
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Friends