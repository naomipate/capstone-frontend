import "./Footer.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="content">
        <h3 className="title">Giftune</h3>
        <p className="text">
          An app designed to keep you on top of your loved ones upcoming
          birthdays, where you can effortlessly select the perfect gift from a
          diverse array of options.
        </p>
      </div>
      <div className="bottom">
        <p className="copyright">
          copyright ©
          <NavLink to={"#"} className={"copy-link"}>
            Giftune Inc 2023
          </NavLink>
        </p>
        <div className="menu">
          <ul className="list">
            <li className="item">
              <NavLink to={"/"} className={"link"}>
                Home
              </NavLink>
            </li>
            <li className="item">
              <NavLink to={"/login"} className={"link"}>
                Login
              </NavLink>
            </li>
            <li className="item">
              <NavLink to={"/signup"} className={"link"}>
                SignUp
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
  // <div className="footer">© Giftune Inc 2023</div>;
}

export default Footer;
