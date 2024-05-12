import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreProfileCard from "../components/ExploreProfileCard";
import "../styles/explore.css";
import { toast } from "react-toastify";
import { ExploreCardSkeleton } from "../utils/skeleton";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../lib/api";

export default function Explore() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResponse = async () => {
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
        navigate("/verify/login");
        return;
      }
    };
    handleResponse();
  }, []);

  const skeletonCards = Array.from({ length: 9 }).map(() => (
    <ExploreCardSkeleton />
  ));

  return (
    <>
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
                  user.requestRecieved.includes(userID)
                    ? "Pending..."
                    : "Connect +"
                }
              />
            ))}
      </div>
    </>
  );
}
