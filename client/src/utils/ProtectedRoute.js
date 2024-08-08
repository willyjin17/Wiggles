import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../utils/api";
import Loader from "../components/Loader";
import ViolationPopUp from "../components/ViolationPopUp";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openViolationPopup, setOpenViolationPopup] = useState(false);
  const [violationMessage, setViolationMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData("warnings");
      console.log(response);
      if (response.data.warn) {
        setOpenViolationPopup(true);
        setViolationMessage(response.data.violationMessage);
      }
      return response.data;
    };

    fetchData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await getData("");
      if (response.status === 401) {
        navigate("/login");
      } else {
        setAuth(true);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        auth && (
          <>
            {children}{" "}
            {/* {openViolationPopup && (
              <ViolationPopUp
                setOpen={setOpenViolationPopup}
                violationMessage={violationMessage}
              />
            )} */}``
          </>
        )
      )}
    </>
  );
};

export default ProtectedRoute;
