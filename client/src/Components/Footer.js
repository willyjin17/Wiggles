import { Link } from "react-router-dom"
import Footerimg from "../images/FooterTop.png"
export default function Footer(){
    return(
        <div>
        <div className="footer-container">
        <div>
            <img className="Footer-top" src={Footerimg}></img>
        </div>
            <div className="footer">
            <div className="about-wiggles">
                <h3 className="footer-heading">About Wiggles</h3>
                <p>
                quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                </p>
            </div>
            <div className="support-wiggles">
                <h3 className="footer-heading">Support</h3>
                <div className="support">
                <Link className="support-links">Contact Us</Link> 
                <div className="connect-us">
                    <a className="connect-links">github</a>
                    <a className="connect-links">instagram</a>
                    <a className="connect-links">linkedIn</a>
                    </div> 
                </div>
            </div>
            </div>
            <div className="copyright-bar">Copyright © 2023 - Wiggles - All rights reserved</div>
        </div>
        </div>
    )
}