import "./Nav.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GiftuneLogo from "../../Assets/GiftuneLogo3Nav.png";

function Nav({ user, setUser }) {
  const navigate = useNavigate();
  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <header className="topnav">
      <img src={GiftuneLogo} alt="logo" />
      <nav className="nav-links">
        <NavLink to={"/"}>Home</NavLink>
        {user ? (
          <NavLink to={"/"} onClick={handleLogOut}>
            Log out
          </NavLink>
        ) : (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Signup</NavLink>
          </>
        )}
        <NavLink to={"/about"}>About</NavLink>
      </nav>
    </header>
  );
}

export default Nav;
