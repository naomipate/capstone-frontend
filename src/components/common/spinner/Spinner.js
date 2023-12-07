import React from "react";
import "./Spinner.css";
function Spinner() {
  return (
    <div className="spinner-parent">
      <div className="spinner-container">
        <div className="custom-loader"></div>
      </div>
    </div>
  );
}

export default Spinner;
