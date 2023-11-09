import React, { useState, useEffect } from "react";
import "./Alert.css";

function Alert({ message }) {
  return <div className={`AlertBox show`}>{message}</div>; //<div className={`AlertBox ${show ? "show" : ""}`}>{message}</div>;
}

export default Alert;
