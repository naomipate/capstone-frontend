import React from "react";
import "./Hamburger.css";

function Hamburger({ hamburgerOpen }) {
  console.log(hamburgerOpen);
  return (
    <div className="hamburger">
      <div
        className="burger line-1"
        style={
          hamburgerOpen
            ? { transform: "rotate(45deg)" }
            : { transform: "rotate(0)" }
        }
      ></div>
      <div
        className="burger line-2"
        style={
          hamburgerOpen
            ? { transform: "translateX(100%)" }
            : { transform: "translateX(0)" }
        }
      ></div>
      <div
        className="burger line-3"
        style={
          hamburgerOpen
            ? { transform: "rotate(-45deg)" }
            : { transform: "rotate(0)" }
        }
      ></div>
    </div>
  );
}

export default Hamburger;
