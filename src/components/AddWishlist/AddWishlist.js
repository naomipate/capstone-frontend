// /* eslint-disable padded-blocks */
import React, { useState, useContext } from "react";
import Axios from ".././API/Axios";
import { useNavigate } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";
import { toast } from "react-toastify";
import { WishlistContext } from "../common/context/context";

import "./AddWishList.css";

function AddWishlist({ user }) {
  let navigate = useNavigate();
  const { id } = user;

  const [formData, setFormData] = useState({
    user_id: id,
    item_name: "",
    item_price: "",
    link: "",
  });

  const { setToggleUpdate } = useContext(WishlistContext);

  const handleCreateWishlist = async () => {
    try {
      await Axios.post(`/userwishlist`, formData);

      setToggleUpdate(true);

      toast.success(
        "Wishlist created successfully!",
        toast.POSITION.TOP_CENTER
      );

      setFormData({
        user_id: id,
        item_name: "",
        item_price: "",
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
          selectedItem={formData}
          setSelectedItem={setFormData}
        />
      </div>
    </div>
  );
}
export default AddWishlist;
