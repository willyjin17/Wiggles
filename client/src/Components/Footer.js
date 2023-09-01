import { Link, useNavigate } from "react-router-dom";
import Footerimg from "../images/FooterTop.png";
import "../CSS/Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  function deleteCookies() {
    var allCookies = document.cookie.split(";");

    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  }

  const logout = () => {
    deleteCookies();
    navigate("/login");
  };

  return (
    <div>
      <div className="footer-container">
        <div>
          <img className="footer-img" src={Footerimg}></img>
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
            <div className="support">
              <Link to="/Contact" className="support-links">
                Contact Us
              </Link>
              <div className="support-links" onClick={logout}>
                Logout
              </div>
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
