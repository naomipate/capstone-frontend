import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../API/API";

import "./Login.css";

function Login({ setUser, user }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("user")) navigate(`/dashboard/${user.id}`);
  }, []);

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
      if (!user.data.id) {
        throw Error;
      } else {
        setUser(user.data);
        window.localStorage.setItem("user", JSON.stringify(user.data));
        setPassword("");
        toast.success("Login Successful", toast.POSITION.TOP_CENTER);
        navigate(`/dashboard/${user.data.id}`); // This is to go to the dashboard page.
      }
      setEmail({
        email: "",
      });
    } catch (error) {
      toast.error("User not found", toast.POSITION.TOP_CENTER);
      // console.log(error);
    }
  }

  return (
    <>
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
              Don't have an account?{" "}
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
