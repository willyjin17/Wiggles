import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
    const navigate = useNavigate();
    const [cookies,setCookie, removeCookie] = useCookies();
    const [username, setUsername] = useState("");
    useEffect(()=>{
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/login");
            }
            const response = await fetch('http://localhost:3001/',{
                method:"POST",
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            const data = await response.json();
            return data.status
              ? navigate("/Profile")
              : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    // return (
    // <></>
    // )
}

export default Home