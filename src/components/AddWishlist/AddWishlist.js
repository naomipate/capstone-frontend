/* eslint-disable padded-blocks */
import React, { useState } from "react";
import Axios from ".././API/Axios";
import { useNavigate } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";
import "./AddWishList.css"



function AddWishlist({ user }) {
  let navigate = useNavigate();
  const { id } = user;

  const [formData, setFormData] = useState({
    user_id: id,
    item_name: "",
    // imageUrl: "",
    link: "",
  });

  const handleCreateWishlist = async () => {
    console.log(formData);
    let formatData = formData;
    formatData.user_id = id;
    console.log("New formatData", formatData);

    try {
      await Axios.post(`/userwishlist`, formatData);

      alert("Wishlist created successfully!");
      setFormData({
        user_id: id,
        item_name: "",
        // imageUrl: "",
        link: "",
      });
      navigate(`/dashboard/${id}/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-wishlist-page">
      <div className="add-wishlist-page-container">
      <h2 className="add-wishlist-title">Add item</h2>
      <WishlistForm
        onSubmit={handleCreateWishlist}
        formData={formData}
        setFormData={setFormData}
      />
      </div>
    </div>
  );
}
export default AddWishlist;
