import React, { useEffect, useState } from 'react'
import "../CSS/FriendsCard.css"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";

const FriendsCard = ({userID, setRefresh}) => {
  const navigate=useNavigate();
  const[name, setName]=useState("");
  const[image, setImage]=useState("");
  const[bio, setBio]=useState("");
  const [isRemoving, setIsRemoving] = useState(false);
  
  useEffect(() => {
    const fetchFriendData=async()=>{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/userdata`,{
        method:"POST",
        body:JSON.stringify({
          userID,
        }),
        credentials:"include",
        headers:{
          'Content-type' : 'application/json',
        },
      })
      .catch((err)=>{
        console.log(err);
        toast.error("There was an error. Kindly referesh the page.")
        return;
      })

      let data= await response.json();
      if(data.status==="ok")
      {
        setName(data.foundUser.name);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
      }
    }
      fetchFriendData();
  },[userID])

  const handleClick=(e)=>{
    navigate("/Profile/" + userID);
  }

  const handleRemove=async(e)=>{
    e.stopPropagation();
    setIsRemoving(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/removeFriend`,{
      method:"POST",
      body: JSON.stringify({
        friendID: userID,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((error)=>{
      toast.error("There was an error while performing this action.");
      setIsRemoving(false);
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      toast.success("Successfully removed.")
      setRefresh(true);
    }
  }

  return (
    <>
    <div className='friendCardWrapper' onClick={handleClick}>
      <div className='friendsInfoContainer'>
      <div className="friendsProfilePictureContainer">
          {image ? (
            <img
              className="friendsProfilePicture"
              src={image}
              alt="Friend"
              loading="lazy"
            />
          ) : (
            <PiDogFill className="friendsProfileIcon" />
          )}
        </div>
        <div className='friendsInfo'>
          <h3>{name}</h3>
          <p>{bio}</p>
        </div>
      </div>
      <button onClick={handleRemove} className='removeFriendBtn' disabled={isRemoving}>
        {isRemoving ? 'Removing...' : 'Remove'}
      </button>
    </div>
    </>
  )
}

export default FriendsCard