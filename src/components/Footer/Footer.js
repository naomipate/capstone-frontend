import "./Footer.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import GiftuneLogo from "../../Assets/GiftuneLogoFooter.png";

function Footer({ user, setUser }) {
  const navigate = useNavigate();
  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="brand">
          <img className="footer-image" src={GiftuneLogo} alt="Logo" />
          <p className="slogan">
            "Where heartfelt gifting meets perfect harmony."
          </p>
        </div>
        <div>
          <ul className="navLink">
            <li>
              <NavLink className="link" to={"/"}>
                Home
              </NavLink>
            </li>
            {user ? (
              <li>
                <NavLink className={"link"} to={"/"} onClick={handleLogOut}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink className="link" to={"/login"}>
                    Login
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink className="link" to={"/signup"}>
                    Signup
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink className="link" to={"/about"}>
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p className="text">
          An app designed to keep you on top of your loved ones upcoming
          birthdays, where you can effortlessly select the perfect gift from a
          diverse array of options.
        </p>
        <p className="copyright">copyright ©</p>
        < br/>
      </div>
    </footer>
  );
}

//

export default Footer;
