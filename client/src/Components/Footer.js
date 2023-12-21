import { Link, useNavigate } from "react-router-dom";
import Footerimg from "../images/FooterTop.png";
import {AiFillGithub, AiFillInstagram} from "react-icons/ai"
import "../CSS/Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const logout = async() =>{
    try{
      const response =await fetch(`${process.env.REACT_APP_BASE_URL}/logout`,{
        method: 'POST',
        credentials: 'include', 
      });
      if (response.status === 200) {
        // Successfully logged out
        navigate("/verify/login")
      } else {
        console.log("bad response")
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div className="footer-container">
        <div>
          <img className="footer-img" src={Footerimg} alt="Footer"></img>
        </div>
        <div className="footer">
          <div className="about-wiggles">
            <h3 className="footer-heading">About Wiggles</h3>
            <p>
              Wiggles is a platform where pet owners can effortlessly
              arrange playdates for their furry friends, share pet-care
              insights, and forge lasting connections. Wiggles isn't just a
              social space; it's a vibrant community where pets take center
              stage. 🐾 <br/>But we're more than just a platform; we're an
              open-source project. This means our community shapes Wiggles,
              ensuring it evolves with your needs. At Wiggles, 
              every wag, chirp, or meow deserves to find its kindred
              spirit.
            </p>
          </div>
          <div className="support-wiggles">
            <h3 className="footer-heading">Support</h3>
            <div className="supportLogin">
              <div>
              <Link to="/Vaccination" className="support-links">
                Vaccination
              </Link>
              <Link to="/generateqr" className="support-links">
                My QR code
              </Link>
              <Link className="support-links" to="/Friends">
                Friends
              </Link>
              </div>
              <div>
              <Link to="/verify/Contact" className="support-links">
                Contact Us
              </Link>
              <Link to="/verify/AboutCreators" className="support-links">
                Creators
              </Link>
              </div>
              <div>
              <Link className="support-links" to="/Explore">
                Explore
              </Link>
              <div className="support-links" onClick={logout}>
                Logout
              </div>
              </div>
            </div>
            <div className="footerSocialLinksContainer">
              <a className="footerSocialLinks" href="https://github.com/DevanshSahni/Wiggles"><AiFillGithub/></a>
            </div>
          </div>
        </div>
        <div className="copyright-bar">
          Copyright © 2023 - Wiggles - All rights reserved
        </div>
      </div>
    </div>
  );
}
