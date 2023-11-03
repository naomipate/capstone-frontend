import "./Footer.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      {/* © Giftune Inc 2023 */}
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/login"}>Login</NavLink>
      <NavLink to={"/signup"}>Signup</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      <NavLink>Find Friend</NavLink>
    </div>
  );
}

export default Footer;
