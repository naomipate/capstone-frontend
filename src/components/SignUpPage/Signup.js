import "./Signup.css";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../API/API";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    dob: "",
    email: "",
  });

  async function createNewUser(e) {
    e.preventDefault();
    try {
      await createUser(user);

      setUser({
        user_name: "",
        dob: "",
        email: "",
      });
      alert("Signup Successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  function handleOnChange(id, value) {
    setUser({
      ...user,
      [id]: value,
    });
  }

  return (
    <div className="signup-container">
      <form className="form" onSubmit={createNewUser}>
        <span className="title">Sign Up</span>
        <span className="subtitle">Create an account with your email</span>
        <div className="form-container">
          <input
            type="text"
            className="input"
            placeholder="Username"
            id="user_name"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={user.user_name}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            id="email"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={user.email}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            required
          />
          <input
            type="date"
            className="input"
            id="dob"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={user.dob}
          />
        </div>
        <button className="formBtn" type="submit">
          Sign Up
        </button>
        <div className="form-section">
          <p>
            Have an account? <NavLink to={"/login"}>Log in</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
