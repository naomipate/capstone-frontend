import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";

import "./AddWishlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function AddWishlist() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    imageUrl: "",
    itemLink: "",
  });

  const handleCreateWishlist = async (formData) => {
    try {
      await axios.post(`${API_URL}/userwishlist`, formData);
      alert("Wishlist item created successfully!");
      setFormData({
        itemName: "",
        imageUrl: "",
        itemLink: "",
      });

      navigate(`/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  return (
    <div className="list-form">
      <h2>Add item</h2>
      <WishlistForm onSubmit={handleCreateWishlist} />
    </div>
  );
}

export default AddWishlist;
