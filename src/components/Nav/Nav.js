import "./Nav.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GiftuneLogo from "../../Assets/image_360.png";
import Hamburger from "./Hamburger";
import OpenHamburger from "./OpenHamburger";

function Nav({ user, setUser }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const navigate = useNavigate();
  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }
  return (
    <header className="topnav-container">
      <div className="topnav">
        <nav className="nav-links">
          {user ? (
            <>
            <div className="hamburger" onClick={toggleHamburger}>
            {hamburgerOpen ? <><Hamburger hamburgerOpen={hamburgerOpen}/> <OpenHamburger/></> : 
            <Hamburger hamburgerOpen={hamburgerOpen}/>}
            </div>
              <img className="logo-nav" src={GiftuneLogo} alt="logo" />
              <NavLink to={"/"} onClick={handleLogOut}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <img  className="logo-nav" src={GiftuneLogo} alt="logo" />
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/signup"}>Signup</NavLink>
              <NavLink to={"/search-page"}>Find Friend</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
