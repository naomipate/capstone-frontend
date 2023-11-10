import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WishlistForm from "../WishlistForm/WishlistForm";

const API_URL = process.env.REACT_APP_API_URL;

function EditWishlist() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [wishlist, setWishlist] = useState({
    itemName: "",
    imageUrl: "",
    itemLink: "",
  });

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/${API_URL}/userwishlist/${id}`);
        setWishlist(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, [id]);

  const handleEditWishlist = async (formData) => {
    try {
      await axios.put(`/${API_URL}/userwishlist/${id}`, formData);
      alert("Wishlist item updated successfully");
      navigate(`/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  //   const updateWishlist = async (id, updatedWishlist) => {
  //     try {
  //       await axios.put(`${API_URL}/wishlist/${id}`, updatedWishlist);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     try {
  //       await updateWishlist(id);

  //       navigate(`/wishList/${id}`);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  return (
    <div className="list-form">
      <h2>Edit item</h2>
      <WishlistForm onSubmit={handleEditWishlist} wishlist={wishlist} />
    </div>
  );
}

export default EditWishlist;
