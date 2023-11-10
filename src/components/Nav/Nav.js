import "./Nav.css";
import React from "react";
import { NavLink } from "react-router-dom";
import GiftuneLogo from "../../Assets/GiftuneLogo3Nav.png";

function Nav() {
  return (
    <div className="wrapper">
      <header className="topnav">
        <img src={GiftuneLogo} alt="logo" />
        <div className="nav-links">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/signup"}>Signup</NavLink>
          <NavLink to={"/about"}>About</NavLink>
        </div>
      </header>
    </div>
  );
}

export default Nav;
