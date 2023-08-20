import { Link, useNavigate } from "react-router-dom";
import Footerimg from "../images/FooterTop.png";
import "../CSS/Footer.css"

export default function Footer() {
  const navigate = useNavigate();
  function deleteCookies() {
    var allCookies = document.cookie.split(";");

    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
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
              quia dolor sit amet, consectetur, adipisci velit, sed quia non
              numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
              ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
              qui in ea voluptate velit esse quam nihil molestiae consequatur,
              vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
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
);}