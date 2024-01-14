import FriendsCard from './FriendsCard'
import Navbar from './Navbar'
import "../CSS/FriendsCard.css"
import React, { useEffect, useState } from 'react'
import {FriendCardSkeleton} from './Skeleton/FriendsSkeleton'

export const Friends = () => {
  const [friends, setFriends]=useState(null);
  const [refresh, setRefresh]=useState(false);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout( async()=>{
    const fetchFriends=async(e)=>{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/friends`,{
        method:"POST",
        credentials:"include",
      })
      let data=await response.json();
      if(data.status === "ok"){
        data=await data.friends;
        setLoading(false);
        setFriends(data);
      }else{
        return;
      }
      
    } 
    fetchFriends();
    setRefresh(false);
  }, 1000)
  }, [refresh]);

  return (
    <>
    {/* <Navbar/> */}
    <div className='friendsWrapper'>
      <h1>My Friends</h1>
      <div className='friendsCardContainer'>
      {!loading &&
      <>
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
        </>
      }
      
      { loading && 
      <>
        <FriendCardSkeleton/>
        <FriendCardSkeleton/>
        <FriendCardSkeleton/>
        <FriendCardSkeleton/>
        <FriendCardSkeleton/>
      </>
      }
      </div>
    </div>
    </>
  )
}

export default Friends