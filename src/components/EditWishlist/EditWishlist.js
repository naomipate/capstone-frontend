import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from ".././API/Axios";
import WishlistForm from "../WishlistForm/WishlistForm";

import "./EditWishlist.css";

function EditWishlist() {
  const navigate = useNavigate();
  const { id, item_id } = useParams();

  const [formData, setFormData] = useState({
    item_name: "",
    item_price: "",
    link: "",
  });

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await Axios.get(
          `/dashboard/${id}/userwishlist/${item_id}`
        );
        setFormData(response.data[0]);
        navigate(`/dashboard/${id}/userwishlist`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, [id, item_id, navigate]);

  return (
    <div className="edit-wishlist-page-container">
      <h2>item</h2>
      <WishlistForm selectedItem={formData} setSelectedItem={setFormData} />
    </div>
  );
}

export default EditWishlist;
