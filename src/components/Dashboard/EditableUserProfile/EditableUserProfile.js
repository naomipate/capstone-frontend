import React, { useState } from "react";
import Axios from "../.././API/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./EditableUserProfile.css";

function EditableUserProfile({ user }) {
  const navigate = useNavigate();

  const user_id = user?.id;

  const [updatedUser, setUpdatedUser] = useState({
    username: user?.user_name || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    dob: user?.dob,
    email: user?.email || "",
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setUpdatedUser({ ...user, [id]: value });
  };

  const updateProfile = async (e) => {
    console.log(user_id);
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

      toast.success(
        "Your profile is updated successfully.",
        toast.POSITION.TOP_CENTER
      );
      navigate(`/dashboard/${user_id}`);
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
            id="user_name"
            required
            onChange={handleOnChange}
            value={updatedUser.username}
          />
          <input
            type="text"
            className="input"
            id="first_name"
            required
            onChange={handleOnChange}
            value={updatedUser.first_name}
          />
          <input
            type="text"
            className="input"
            id="last_name"
            required
            onChange={handleOnChange}
            value={updatedUser.last_name}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            id="email"
            required
            onChange={handleOnChange}
            value={updatedUser.email}
          />
          <div className="dateContainer">
            <label className="dateLabel">D.O.B:</label>
            <input
              type="date"
              className="input"
              id="dob"
              required
              onChange={handleOnChange}
              value={new Date(updatedUser.dob).toISOString().split("T")[0]}
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
