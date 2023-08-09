import React from 'react'
import photo from '../images/photo.png'

export default function ExploreProfileCard({name, breed, gender, bio, image}) {
  return (
    <div className='profile-card'>
        <img src={photo} alt="profile image" />
        {/* <img src={require(`../Uploads/${image}`)} alt="profile image" /> */}
        <div id="profile-info">
            <div className="primary-info">
                <span id='gender'>{gender} | </span><span id='name'>{name}</span>
            </div>
            <div className="secondary-info">
                <div id='breed'>{breed}</div>
                <div id="bio">
                {bio || <p>Here we will show your bio.</p>}
                </div>
            </div>
            <button id='playdate'>Playdate</button>
        </div>
    </div>
    
  )
}
