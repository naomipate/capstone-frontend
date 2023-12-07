/* eslint-disable padded-blocks */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./WishlistForm.css";

function WishlistForm({ onSubmit, initialValues, formData, setFormData }) {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialValues);
    // eslint-disable-next-line
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
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
            value={formData?.item_name || ""}
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
            value={formData?.link || ""}
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
