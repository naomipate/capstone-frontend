import "./Nav.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import GiftuneLogo from "../../Assets/GiftuneLogo3Nav.png";

function Nav() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      {/* <header className="topnav">
        <div className="left">
          <NavLink className={"active"} to={"/"}>
            <img src={GiftuneLogo} width={"62px"} height={"62px"} alt="logo" />
          </NavLink>
        </div>
        <div className="right">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/signup"}>Signup</NavLink>
          <NavLink to={"/about"}>About</NavLink>
        </div>
      </header> */}

      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={GiftuneLogo} alt="NavLogo" />
          </div>
          <div className="menu-icon" onClick={toggleNav}>
            ☰
          </div>
          <div className={`nav-elements ${showNav && "active"}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/signup"}>Signup</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/about"}>About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
