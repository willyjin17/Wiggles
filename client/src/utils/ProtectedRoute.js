import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../utils/api";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await getData("");
      if (response.status === 401) {
        toast.error("Kindly login first");
        navigate("/verify/login");
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

  return <>{loading ? "Loading..." : auth && children}</>;
};

export default ProtectedRoute;
