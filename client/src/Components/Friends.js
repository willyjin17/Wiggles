import FriendsCard from './FriendsCard'
import Navbar from './Navbar'
import "../CSS/FriendsCard.css"
import React, { useEffect, useState } from 'react'

export const Friends = () => {
  const [friends, setFriends]=useState(null);
  const [refresh, setRefresh]=useState(false);

  useEffect(()=>{
    const fetchFriends=async(e)=>{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/friends`,{
        method:"POST",
        credentials:"include",
      })
      let data=await response.json();
      if(data.status === "ok"){
        data=await data.friends;
        setFriends(data);
      }else{
        return;
      }
      
    } 
    fetchFriends();
    setRefresh(false);
  }, [refresh]);

  return (
    <>
    <Navbar/>
    <div className='friendsWrapper'>
      <h1>My Friends</h1>
      <div className='friendsCardContainer'>
      {friends !== null ? (
            friends.length > 0 ? (
              friends.map((friend) => (
                <FriendsCard key={friend} userID={friend} setRefresh={setRefresh} />
              ))
            ) : (
              <p><br/>No friends to show.</p>
            )
          ) : (
            <p><br/>Loading...</p>
          )}
      </div>
    </div>
    </>
  )
}

export default Friends