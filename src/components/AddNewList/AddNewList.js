import React, { useState } from "react";

import "./AddNewList.css";

function NewList() {
  const [formData, setFormData] = useState({
    itemName: "",
    imageUrl: "",
    itemLink: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.targe.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="list-form">
      <h2>Add item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label hrmlFor="imageUrl">Item Url</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label hrmlFor="itemLink">Item Link</label>
          <input
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
