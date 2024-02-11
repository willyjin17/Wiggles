import React from "react";
import "../../CSS/Skeleton.css";

const NavbarSkeleton = () => {
  return (
    <div className="navbarSkeletonContainer">
      <div className="navbarSkeletonCircle skeleton2"></div>
      <div className="navbarSkeletontext30 skeleton2"></div>
    </div>
  );
};

const FriendCardSkeleton = () => {
  return (
    <div className="skeletonCardWrapper">
      <div className="skeletonCircle skeleton"></div>
      <div className="skeletonTextContainer">
        <div className="skeletonText30 skeleton"></div>
        <div className="skeletonText70 skeleton"></div>
      </div>
    </div>
  );
};

const ExploreCardSkeleton = () => {
  return (
    <div className="skeletonExploreCardWrapper">
      <div className="skeletonExploreCircle skeleton"></div>
      <div className="skeletonExploreTextContainer">
        <div className="skeletonText50 skeleton"></div>
        <div className="skeletonText30 skeleton"></div>
        <div className="skeletonText100 skeleton"></div>
      </div>
    </div>
  );
};

const VaccinationCardSkeleton = () => {
  return (
    <>
      <div className="vaccinationSkeletonContainer">
        <div className="skeleton vaccinationSkeletontext30"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
      </div>
      <div className="vaccinationSkeletonContainer">
        <div className="skeleton vaccinationSkeletontext50"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
        <div className="skeleton vaccinationSkeletontext70"></div>
      </div>
    </>
  );
};
const VaccinationTableSkeleton = () => {
  return (
    <tr>
      <td>
        <span className="skeletonText10 skeleton"></span>
      </td>
      <td>
        <span className="skeletonText10 skeleton"></span>
      </td>
      <td>
        <span className="skeletonText10 skeleton"></span>
      </td>
      <td>
        <span className="skeletonText10 skeleton"></span>
      </td>
    </tr>
  );
};
const NotificationSkeleton = () => {
  return (
    <div className="notificationSkeletonCardWrapper">
      <div className="notificationSkeletonCircle skeleton"></div>
      <div className="skeletonTextContainer">
        <div className="skeletonText30 skeleton"></div>
        <div className="skeletonText70 skeleton"></div>
      </div>
    </div>
  );
};

export {
  FriendCardSkeleton,
  ExploreCardSkeleton,
  VaccinationCardSkeleton,
  NavbarSkeleton,
  NotificationSkeleton,
  VaccinationTableSkeleton,
};
