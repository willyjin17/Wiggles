import React from 'react'
import photo from '../images/photo.png'

export default function ExploreProfileCard() {
  return (
    <div className='profile-card'>
        <img src={photo} alt="profile image" />
        <div id="profile-info">
            <div className="primary-info">
                <span id='gender'>M | </span><span id='name'>ABC XYZ</span>
            </div>
            <div className="secondary-info">
                <div id='breed'>Labrador</div>
                <div id="bio">
                The flex-grow property specifies how much the item will grow.
                </div>
            </div>
            <button id='playdate'>Playdate</button>
        </div>
    </div>
    
  )
}
