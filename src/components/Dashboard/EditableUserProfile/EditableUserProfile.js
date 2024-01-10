import React, { useState, useContext, useEffect } from "react";
import Axios from "../.././API/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WishlistContext } from "../../common/context/context";

import "./EditableUserProfile.css";

function EditableUserProfile({ user }) {
  const navigate = useNavigate();

  const user_id = user?.id;
  const { setToggleUpdate } = useContext(WishlistContext);
  const [updatedUser, setUpdatedUser] = useState({
    user_picture: "",
    user_name: "",
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
  });
  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setUpdatedUser(storedUser);
    //A comment
    //eslint-disable-next-line
  }, []);
  const handleOnChange = (id, value) => {
    setUpdatedUser({ ...updatedUser, [id]: value });
  };

  const updateProfile = async (e) => {
    try {
      await Axios.put(`/users/${user_id}`, updatedUser);
    } catch (err) {
      console.log(err);
    }
  };

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await updateProfile();
      window.localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success(
        "Your profile is updated successfully.",
        toast.POSITION.TOP_CENTER
      );
      setToggleUpdate(true);
      navigate(`/dashboard/${updatedUser.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="user-profile-container">
      <form className="form" onSubmit={handleEditSubmit}>
        <span className="title">Edit your profile</span>
        <div className="form-container">
          <input
            type="text"
            className="input"
            placeholder="User Picture URL"
            id="user_picture"
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={updatedUser?.user_picture}
          />
          <input
            type="text"
            className="input"
            placeholder="Username"
            id="user_name"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={updatedUser?.user_name}
          />
          <input
            type="text"
            className="input"
            placeholder="First Name"
            id="first_name"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={updatedUser?.first_name}
          />
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            id="last_name"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={updatedUser?.last_name}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            id="email"
            required
            onChange={(e) => handleOnChange(e.target.id, e.target.value)}
            value={updatedUser?.email}
          />
          <div className="dateContainer">
            <label className="dateLabel">D.O.B:</label>
            <input
              type="date"
              className="input"
              id="dob"
              required
              onChange={(e) => handleOnChange(e.target.id, e.target.value)}
              value={updatedUser?.dob}
            />
          </div>
        </div>
        <button className="formBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditableUserProfile;
