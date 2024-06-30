import React, { useEffect, useState } from "react";
import { getData } from "./api";
import ViolationPopUp from "../components/ViolationPopUp";
import { useSelector } from "react-redux";

const ViolationWrapper = ({ children }) => {
  const [openViolationPopup, setOpenViolationPopup] = useState(false);
  const [violationMessage, setViolationMessage] = useState("");
  const loggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData("warnings");
      if (response.data.warn) {
        setOpenViolationPopup(true);
        setViolationMessage(response.data.violationMessage);
      }
      return response.data;
    };

    loggedIn && fetchData();
  }, [loggedIn]);
  return (
    <>
      {children}{" "}
      {openViolationPopup && (
        <ViolationPopUp
          setOpen={setOpenViolationPopup}
          violationMessage={violationMessage}
        />
      )}
    </>
  );
};

export default ViolationWrapper;
