import FriendsCard from './FriendsCard'
import Navbar from './Navbar'
import "../CSS/FriendsCard.css"
import React, { useEffect, useState } from 'react'
import {FriendCardSkeleton} from './Skeleton/FriendsSkeleton'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Friends = () => {
  const [friends, setFriends]=useState(null);
  const [refresh, setRefresh]=useState(false);
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const numberOfSkeletonCards = 7;

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
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      }
      
    } 
    fetchFriends();
    setRefresh(false);
  }, 1200)
  }, [refresh]);

  const skeletonCards = Array.from({ length: numberOfSkeletonCards }).map(() => (
    <FriendCardSkeleton />
  ));

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
          {skeletonCards}
      </>
      }
      </div>
    </div>
    </>
  )
}

export default Friends