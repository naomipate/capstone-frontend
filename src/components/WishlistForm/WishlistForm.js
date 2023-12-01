import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./WishlistForm.css";

function WishlistForm({ onSubmit, initialValues, formData, setFormData }) {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("wishlistForm", formData);
    onSubmit(formData);
    navigate(`/dashboard/${id}/userwishlist`);
  };

  return (
    <div className="wish-list-form-container">
      <form onSubmit={handleSubmit} class="wish-list-form">
        <div className="wish-list-form-group"> 
          <label htmlFor="itemName" className="wish-list-form-title">Item</label>
          <input
            required
            type="text"
            id="item_name"
            name="item_name"
            value={formData?.item_name || ""}
            onChange={(e) => handleInputChange(e)}
            className="wish-list-form-input"
          />


          <label htmlFor="itemLink" className="wish-list-form-title">Link</label>
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
        {/* <div className="form-group">
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleInputChange}
        />
      </div> */}
      </form>
    </div>
  );
}
export default WishlistForm;
