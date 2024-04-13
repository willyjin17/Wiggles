import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getData } from "../lib/api";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    try {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/verify/login");
        }
        // const response = await fetch(`${process.env.REACT_APP_BASE_URL}/`, {
        //   method: "GET",
        //   credentials: "include",
        // });
        const response = await getData("");
        let data = response.data;
        // const data = await response.json();
        if (response.status === 401) {
          navigate("/verify/login");
        } else {
          navigate("/Profile");
        }
        return;
      };
      verifyCookie();
    } catch (err) {
      console.error(err);
    }
  }, [cookies, navigate, removeCookie]);
};

export default Home;
