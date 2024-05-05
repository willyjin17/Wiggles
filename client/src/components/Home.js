import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getData } from "../lib/api";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (!cookies.token) {
          navigate("/verify/login");
        }
        const response = await getData("");
        if (response.status === 401) {
          navigate("/verify/login");
        } else {
          navigate("/Profile");
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
};

export default Home;
