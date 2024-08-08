import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreProfileCard from "../components/ExploreProfileCard";
import "../styles/explore.css";
import { toast } from "react-toastify";
import { ExploreCardSkeleton } from "../utils/skeleton";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../utils/api";
import { useSelector } from "react-redux";
import Login from "../components/LoginPopUpComponent";
import SearchBar from "../components/SearchBar";

export default function Explore() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  useEffect(() => {
    const handleResponse = async () => {
      if (!loggedIn) {
        const response = await getData("data");
        let data = response.data;
        if (data.status === "ok") {
          setUsers(data.Users);
          setLoading(false);
        } else {
          toast.error("Unauthorised access");
          return;
        }
      } else if (loggedIn) {
        const response = await getData("data");
        let data = response.data;
        if (data.status === "ok") {
          setUserID(data.userID);
          setUsers(
            data.Users.filter(
              (user) =>
                user._id !== data.userID && !user.friends.includes(data.userID)
            )
          );
          setLoading(false);
        } else {
          toast.error("Unauthorised access");
          navigate("/login");
          return;
        }
      }
    };
    handleResponse();
  }, [loggedIn]);

  const skeletonCards = Array.from({ length: 9 }).map((index) => (
    <ExploreCardSkeleton key={index} />
  ));

  return (
    <>
      <SearchBar/>
      <div id="profileCardContainer">
        {loading
          ? skeletonCards
          : users.map((user) => (
              <ExploreProfileCard
                key={user._id}
                id={user._id}
                name={user.name}
                breed={user.breed}
                gender={user.gender}
                bio={user.bio}
                image={user.image}
                status={
                  !loggedIn
                    ? "Connect +"
                    : user.requestRecieved.includes(userID)
                    ? "Pending..."
                    : "Connect +"
                }
                // openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              />
            ))}
      </div>
      {openPopup && (
        <Login
          setOpen={setOpenPopup}
          open={openPopup}
          message="See more on Wiggles!!"
        />
      )}
    </>
  );
}
