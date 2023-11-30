/* eslint-disable padded-blocks */
import React, { useState } from "react";
import Axios from ".././API/Axios";
import { useNavigate } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";
import "./AddWishList.css"

function AddWishlist({ user, fetchWishlist }) {
  let navigate = useNavigate();
  const { id } = user;

  const [formData, setFormData] = useState({
    user_id: id,
    item_name: "",
    link: "",
  });

  const handleCreateWishlist = async () => {
    let formatData = formData;
    formatData.user_id = id;

    try {
      await Axios.post(`/userwishlist`, formatData);

      fetchWishlist();
      alert("Wishlist created successfully!");
      setFormData({
        user_id: id,
        item_name: "",
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
