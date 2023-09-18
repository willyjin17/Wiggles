import FriendsCard from './FriendsCard'
import Navbar from './Navbar'
import "../CSS/FriendsCard.css"
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export const Friends = () => {
  const navigate = useNavigate();
  const[cookies]=useCookies();
  const ID=cookies.userID;
  const [friends, setFriends]=useState([]);
  const [authorized,setAuthorized] = useState(false)

  useEffect(()=>{
    const fetchFriends=async(e)=>{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/friends`,{
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
      if(data.status === "ok"){
        setAuthorized(true);
      }else{
        setAuthorized(false);
        navigate("/login")
      }
      data=await data.friends;
      setFriends(data);
    } 
    fetchFriends();
  }, [friends]);

  return authorized ? (
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
    </>
  ) : <></>
}

export default Friends