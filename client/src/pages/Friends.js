import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendsCard from "../components/FriendsCard";
import "../styles/friends.css";
import { FriendCardSkeleton } from "../utils/skeleton";
import { toast } from "react-toastify";
import { postData } from "../lib/api";

export const Friends = () => {
  const [friends, setFriends] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await postData("friends");
      let data = response.data;
      if (data.status === "ok") {
        data = await data.friends;
        setFriends(data);
        setLoading(false);
      } else {
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      }
    };
    fetchFriends();
  }, [refresh]);

  return (
    <>
      <div className="friendsWrapper">
        <h1>My Friends</h1>
        <div className="friendsCardContainer">
          {loading ? (
            <>
              {Array.from({ length: 7 }).map(() => (
                <FriendCardSkeleton />
              ))}
            </>
          ) : (
            <>
              {friends?.length > 0 ? (
                friends.map((friend) => (
                  <FriendsCard
                    key={friend}
                    userID={friend}
                    setRefresh={setRefresh}
                    refresh={refresh}
                  />
                ))
              ) : (
                <p>
                  <br />
                  Connect to people through explore page to view friends.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
