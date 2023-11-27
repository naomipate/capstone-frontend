/* eslint-disable padded-blocks */
import React, { useState } from "react";
import Axios from ".././API/Axios";
import { useNavigate } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";
// import UserWishlist from "../UserWishlist/UserWishlist";

function AddWishlist({ user, fetchWishlist }) {
  let navigate = useNavigate();
  const { id } = user;

  const [formData, setFormData] = useState({
    user_id: id,
    item_name: "",
    // imageUrl: "",
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
        // imageUrl: "",
        link: "",
      });
      navigate(`/dashboard/${id}/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list-form">
      <h2>Add item</h2>
      <WishlistForm
        onSubmit={handleCreateWishlist}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
export default AddWishlist;
