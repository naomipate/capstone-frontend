import "./Signup.css";
import Alert from "../common/AlertModal/Alert";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../API/API";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [show] = useState(false);
  const [user, setUser] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
  });

  async function createNewUser(e) {
    e.preventDefault();
    try {
      await createUser(user);

      setUser({
        user_name: "",
        first_name: "",
        last_name: "",
        dob: "",
        email: "",
      });

      //TODO Import react toastify and add firstname and lastname to the user data in the form
      // setShow(true);
      // setTimeout(() => {
      //   setShow(false);
      //   navigate("/login");
      // }, 3000);
      toast.success("Signup Successful", toast.POSITION.TOP_CENTER);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        "Please fill out the form correctly",
        toast.POSITION.TOP_CENTER
      );
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
            type="text"
            className="input"
            placeholder="First Name"
            id="first_name"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={user.first_name}
          />
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            id="last_name"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={user.last_name}
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
      {show && <Alert message={"Successfull Signup"} />}
    </div>
  );
}

export default Signup;
