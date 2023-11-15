import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";

import "./AddWishlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function AddWishlist() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    user_id: 2,
    item_name: "",
    // imageUrl: "",
    link: "",
  });

  const handleCreateWishlist = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/userwishlist`, formData);
      console.log("Server Response after adding:", response.data);

      alert("Wishlist item created successfully!");
      setFormData({
        user_id: 2,
        item_name: "",
        // imageUrl: "",
        link: "",
      });

      navigate(`/userwishlist/2`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="list-form">
      <h2>Add item</h2>
      <WishlistForm
        onSubmit={handleCreateWishlist}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default AddWishlist;
