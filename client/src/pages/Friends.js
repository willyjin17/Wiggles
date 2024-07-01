import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FriendsCard from "../components/FriendsCard";
import "../styles/friends.css";
import { FriendCardSkeleton } from "../utils/skeleton";
import { toast } from "react-toastify";
import { postData } from "../utils/api";
import Login from "../components/LoginPopUpComponent";

export const Friends = () => {
  const [friends, setFriends] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  useEffect(() => {
    const fetchFriends = async () => {
      if (loggedIn) {
        const response = await postData("friends");
        console.log("logged in ", response);
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
      } else if (!loggedIn) {
        setOpenPopup(true);
      }
    };
    fetchFriends();
  }, [refresh, loggedIn]);

  return (
    <div className="friendsWrapper">
      {loggedIn ? (
        <>
          <h1>My Friends</h1>
          <div className="friendsCardContainer">
            {loading ? (
              <>
                {Array.from({ length: 7 }).map((index) => (
                  <FriendCardSkeleton />
                ))}
              </>
            ) : (
              <>
                {friends?.length > 0 ? (
                  friends.map((friend, index) => (
                    <FriendsCard
                      key={index}
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
        </>
      ) : (
        openPopup && <Login setOpen={setOpenPopup} open={openPopup} message="Find Friends on Wiggles" />
      )}
    </div>
  );
};

export default Friends;
