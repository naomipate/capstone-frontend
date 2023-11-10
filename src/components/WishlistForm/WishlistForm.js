import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./WishlistForm.css";

function WishlistForm({ onSubmit, initialValues }) {
  let navigate = useNavigate();

  const [formData, setFormData] = useState(initialValues || {});

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate(`/userwishlist`);
  };

  return (
    // <div className="list-form">
    //   <h2>Add item</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="itemName">Item Name</label>
        <input
          required
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl || ""}
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
          value={formData.itemLink || ""}
          onChange={handleInputChange}
        />
      </div>
      <button className="button-container" type="submit">
        Submit
      </button>
    </form>
    // </div>
  );
}
export default WishlistForm;
