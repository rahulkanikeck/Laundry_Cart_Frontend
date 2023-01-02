import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
function HomeHeader() {
  return (
    <>
      <div className="Header_Container">
        <header className="Header">
          <h1 className="laundry_home_page">LAUNDRY</h1>
          <ol className="header_list">
            <li>Home</li>
            <li>Pricing</li>
            <li>Career</li>
            <Link to={"/"}>
              <li>SignIn </li>
            </Link>
          </ol>
        </header>
      </div>
    </>
  );
}
export default HomeHeader;
