import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
    const navigate = useNavigate();
    const [cookies,setCookie, removeCookie] = useCookies();
    useEffect(()=>{
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/verify/login");
            }
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/`,{
                method:"GET",
                credentials:'include'
            })
            const data = await response.json();
            return data.status
              ? navigate("/Profile")
              : (removeCookie("token"), navigate("/verify/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
}

export default Home