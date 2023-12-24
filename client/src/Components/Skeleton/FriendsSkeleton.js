import React from 'react'
import "../../CSS/Skeleton.css"

const FriendCardSkeleton = () => {
  return (
    <div className='skeletonCardWrapper'>
      <div className='skeletonCircle skeleton'></div>
      <div className='skeletonTextContainer'>
        <div className='skeletonText30 skeleton'></div>
        <div className='skeletonText100 skeleton'></div>
      </div>
    </div>
  )
}

const ExploreCardSkeleton = () => {
  return (
    <div className='skeletonExploreCardWrapper'>
      <div className='skeletonExploreCircle skeleton'></div>
      <div className='skeletonExploreTextContainer'>
        <div className='skeletonText50 skeleton'></div>
        <div className='skeletonText30 skeleton'></div>
        <div className='skeletonText100 skeleton'></div>
      </div>
    </div>
  )
}

const VaccinationCardSkeleton = () => {
  return (
    <span className='skeletonText30 skeleton'></span>
  )
}

export {FriendCardSkeleton, ExploreCardSkeleton, VaccinationCardSkeleton}