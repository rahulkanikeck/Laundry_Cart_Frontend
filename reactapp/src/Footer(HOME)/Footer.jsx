import React from "react";
import "./Footer.css";
import fbicon from "../imgs/facebook.svg";
import instaIcon from "../imgs/instagram.svg";
import linkDinIcon from "../imgs/linkedin.svg";
// import { Link } from "react-router-dom";
function HomeFooter() {
  return (
    <>
      <footer>
        <div className="first_footer">
          <section className="refer_Earn_container">
            <p className="refer_Earn">
              Now Refer & Earn ₹500 for every referral*
            </p>
            <p className="T_C_apply">* Terms and conditions will be applied</p>
          </section>
        </div>
        <div className="Mid_footer">
          <section className="Mid_footer_Contact_Detail">
            <p className="AboutUs">ABOUT US</p>
            <p className="Door_Step">Doorstep Wash & Dryclean Service</p>
          </section>
          <section className="link_Container">
            <ul className="Home_Pricing_career_contact">
              <li>Home</li>
              <li>Pricing</li>
              <li>Career</li>
              <li>Contact</li>
            </ul>
            <div className="signin_register_Blogs_create">
              <ul className="signin_register">
                <li>Sign In</li>
                <li>Rgister</li>
              </ul>
              <ul className="Blogs_create">
                <li>Blogs</li>
                <li>Create</li>
              </ul>
            </div>
          </section>
          <div className="social_media_container">
            <h2 id="Social_Media">Social Media</h2>
            <ul className="icon_Container">
              <li id="fb_Icon">
                <img src={fbicon} alt="fbicon" />
              </li>
              <li id="insta_Icon">
                <img src={instaIcon} alt="Instaicon" />
              </li>
              <li id="Ln_Icon">
                <img src={linkDinIcon} alt="Lnicon" />
              </li>
            </ul>
          </div>
        </div>
        <div className="End_footer">
          <p>2023 &copy; Laundry</p>
        </div>
      </footer>
    </>
  );
}
export default HomeFooter;
