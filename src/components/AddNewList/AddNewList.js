import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AddNewList.css";

const API_URL = process.env.REACT_APP_API_URL;

function NewList() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    imageUrl: "",
    itemLink: "",
  });

  async function handleCreateWishlist(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/friendswishlist`, formData);

      console.log(formData);
      navigate(`/friendswishlist`);
    } catch (e) {
      console.log(e);
    }
    setFormData({
      itemName: "",
      imageUrl: "",
      itemLink: "",
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="list-form">
      <h2>Add item</h2>
      <form onSubmit={handleCreateWishlist}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            required
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            required
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemLink">Item Link</label>
          <input
            required
            type="text"
            id="itemLink"
            name="itemLink"
            value={formData.itemLink}
            onChange={handleInputChange}
          />
        </div>
        <button className="button-container" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewList;
