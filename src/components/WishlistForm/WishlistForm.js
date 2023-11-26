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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
    navigate(`/dashboard/${id}/userwishlist`);
  };

  return (
    // <div className="list-form">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="itemName">Item Name</label>
        <input
          required
          type="text"
          id="item_name"
          name="item_name"
          value={formData?.item_name || ""}
          onChange={(e) => handleInputChange(e)}
        />
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
      <div className="form-group">
        <label htmlFor="itemLink">Item Link</label>
        <input
          required
          type="text"
          id="link"
          name="link"
          value={formData?.link || ""}
          onChange={(e) => handleInputChange(e)}
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
