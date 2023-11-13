import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WishlistForm from "../WishlistForm/WishlistForm";

const API_URL = process.env.REACT_APP_API_URL;

function EditWishlist() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    item_name: "",
    // imageUrl: "",
    link: "",
  });

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/${API_URL}/userwishlist/${id}`);
        setFormData(response.data[0]);
        navigate(`/userWishlist/${id}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, [id]);

  const handleEditWishlist = async () => {
    try {
      await axios.put(`/${API_URL}/userwishlist/${id}/edit`, formData);
      alert("Wishlist item updated successfully");
      navigate(`/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list-form">
      <h2>item</h2>
      <WishlistForm onSubmit={handleEditWishlist} wishlist={formData} />
    </div>
  );
}

export default EditWishlist;
