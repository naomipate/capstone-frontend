import "./Nav.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GiftuneLogo from "../../Assets/image_360.png";

function Nav({ user, setUser }) {
  const navigate = useNavigate();
  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <header className="topnav-container">
      <div className="topnav">
      <img src={GiftuneLogo} alt="logo" />
      <nav className="nav-links">
        {user ? (
          <NavLink to={"/"} onClick={handleLogOut}>
            Logout
          </NavLink>
        ) : (
          <>
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
