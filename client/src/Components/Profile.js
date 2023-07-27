import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from "../images/profilephoto.png"
import Base from './Base';

const Profile = () => {
    const name="Gin";
  return (
    <>
    <Base />
    <div className='profile'>
        {/* <div className='profileInfo'> */}
            <img className='profilePhoto' src={ProfilePhoto} alt="" />
            {/* <h2 className='profileBio'>Bio</h2> */}
        {/* </div> */}
        <div className='profileInfoPrimary'>
            <h1>Name : {name}</h1>
            <h1>Bio : </h1>
            <h1>Breed : </h1>
            <h1>Gender : </h1>
            <h1>Age : </h1>
            <h1>Address : </h1>
            <h1>Vaccination due on : </h1>
            <Link><h1 className='profileInfoEdit'>Edit Profile</h1></Link>
        </div>
    </div>
    </>
  )
}

export default Profile