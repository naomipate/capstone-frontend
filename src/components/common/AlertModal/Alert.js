import React from "react";
import "./Alert.css";

function Alert({ message }) {
  return <div className={`AlertBox show`}>{message}</div>;
}

export default Alert;
