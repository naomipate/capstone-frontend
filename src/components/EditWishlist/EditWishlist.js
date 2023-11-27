import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from ".././API/Axios";
import WishlistForm from "../WishlistForm/WishlistForm";


function EditWishlist() {
  const navigate = useNavigate();
  const { id, item_id } = useParams();

  const [formData, setFormData] = useState({
    item_name: "",
    // imageUrl: "",
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

  const handleEditWishlist = async () => {
    try {
      await Axios.get(`/userwishlist/${id}/edit`, formData);
      alert("Wishlist item updated successfully");
      navigate(`/dashboard/${id}/userwishlist`);
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
