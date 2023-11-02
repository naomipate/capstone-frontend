import "./Nav.css";
import React from "react";
import { NavLink } from "react-router-dom";
import GiftuneLogo from "../../Assets/GiftuneLogo.png";
function Nav() {
  return (
    // <header className="topnav">
    //   <div className="left">
    //     <NavLink className={"active"} to={"/"}>
    //       <img src={GiftuneLogo} width={"62px"} height={"62px"} alt="logo" />
    //     </NavLink>
    //   </div>
    //   <div className="right">
    //     <NavLink to={"/"}>Home</NavLink>
    //     <NavLink to={"/login"}>Login</NavLink>
    //     <NavLink to={"/signup"}>Signup</NavLink>
    //     <NavLink to={"/about"}>About</NavLink>
    //     <NavLink>Find Friend</NavLink>
    //   </div>
    // </header>
    <div className="wrapper">
      <header className="topnav">
        <img src={GiftuneLogo} alt="logo"/>

        <div className="nav-links">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/signup"}>Signup</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink>Find Friend</NavLink>
        </div>
      </header>
    </div>
  );
}

export default Nav;
