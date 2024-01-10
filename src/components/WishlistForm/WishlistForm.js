/* eslint-disable padded-blocks */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./WishlistForm.css";

function WishlistForm({ onSubmit, selectedItem, setSelectedItem }) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [listData, setListData] = useState(selectedItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListData({ ...listData, [name]: value });
    setSelectedItem({ ...listData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(listData);
    navigate(`/dashboard/${id}/userwishlist`);
  };

  return (
    <div className="wish-list-form-container">
      <form onSubmit={handleSubmit} className="wish-list-form">
        <div className="wish-list-form-group">
          <label htmlFor="itemName" className="wish-list-form-title">
            Item
          </label>
          <input
            required
            type="text"
            id="item_name"
            name="item_name"
            value={listData?.item_name || ""}
            onChange={(e) => handleInputChange(e)}
            className="wish-list-form-input"
          />

          <label htmlFor="itemLink" className="wish-list-form-title">
            Link
          </label>
          <input
            required
            type="text"
            id="link"
            name="link"
            value={listData?.link || ""}
            onChange={(e) => handleInputChange(e)}
            className="wish-list-form-input"
          />

          <label htmlFor="itemPrice" className="wish-list-form-title">
            ~
          </label>
          <input
            required
            type="number"
            id="item_price"
            name="item_price"
            value={listData?.item_price || ""}
            onChange={(e) => handleInputChange(e)}
            className="wish-list-form-input"
          />

          <button className="wish-list-button-container" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default WishlistForm;
