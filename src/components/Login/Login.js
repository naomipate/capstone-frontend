import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserData } from "../API/API";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let user = await getUserData(email);
      console.log(user);
      setEmail({
        email: "",
      });
      setPassword("");
      alert("Login Success!");
      navigate(`/dashboard/${user.data.id}`); // This is to go to the dashboard page.
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <div className="formBox">
        <h1 className="Title">Login</h1>
        <form className="Container" onSubmit={handleSubmit}>
          <span className="Subtitle">Login with your credentials here!</span>
          <div className="InputGroup">
            <input
              type="text"
              className="Input"
              placeholder="Email"
              id="email"
              // value={email.email}
              // onChange={(e) => handleEmailChange(e.target.id, e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              className="Input"
              placeholder="Password"
              id="password"
              // value={password}
              // onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="Section">
          <p className="Text">
            Don't have an account yet?{" "}
            <Link to={"/"} className="Link">
              Sign up here
            </Link>
          </p>
        </div>
      </div> */}
      <br />
      <div className="formBox">
        <form onSubmit={handleSubmit} className="Container">
          <span className="Title">Login</span>
          <span className="Subtitle">Login with your credentials here!</span>
          <div className="InputGroup">
            <input
              type="text"
              className="Input"
              required
              onChange={handleEmailChange}
              value={email}
              placeholder="E-mail"
              id="email"
            />
            <input
              type="password"
              className="Input"
              required
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
              id="password"
            />
          </div>
          <button type="submit" className="submitBtn">
            Login
          </button>
          <div className="Section">
            <p className="Text">
              <Link to={"/signup"} className="Link">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
