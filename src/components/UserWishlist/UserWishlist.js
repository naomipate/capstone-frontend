import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";

import "./UserWishlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function UserWishlist() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (id) {
      fetchWishlist(id);
    }
  }, [id]);

  const fetchWishlist = async () => {
    try {
      let response = await axios.get(`${API_URL}/userwishlist/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWishlistItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/userwishlist/${id}`);
      const { item_name } = response.data;
      alert(`Wishlist item ${item_name} has been deleted`);
      setFormData((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== id)
      );
      navigate(`/userwishlist/2`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (id) => {
    setEditingItemId(id);
    const selectedItem = formData.find((item) => item.id === id);
    setSelectedItem(selectedItem);
    if (selectedItem) {
      setFormData(selectedItem);
      console.log(editingItemId);
    }
  };

  const handleEditSubmit = async (formData) => {
    console.log("FormData before submit:", formData);

    try {
      let response = await axios.put(
        `${API_URL}/userwishlist/${editingItemId}`,
        formData
      );
      console.log("Server Response:", response.data);

      alert(`Wishlist item updated successfully.`);
      setEditingItemId(null);
      fetchWishlist();
      navigate(`/userwishlist/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateWishlist = async (formData) => {
    try {
      await axios.post(`${API_URL}/userwishlist`, formData);
      alert("Wishlist item created successfully!");
      setFormData({
        user_id: 2,
        item_name: "",
        // imageUrl: "",
        link: "",
      });
      navigate(`/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-wishlist">
      <div className="TitleBar" key={formData.id}>
        <h2>List</h2>
        <Link to={`/userwishlist/new?id=${id}`}>
          <button>Add Item</button>
        </Link>
      </div>

      {(editingItemId !== null || formData.length === 0) && (
        <WishlistForm
          onSubmit={editingItemId ? handleEditSubmit : handleCreateWishlist}
          initialValues={editingItemId ? selectedItem || {} : {}}
        />
      )}

      {formData.length > 0 ? (
        formData.map((item) => (
          <div className="WishlistItem" key={item.id}>
            <div className="ImageContainer">
              <img
                src={`https://images.pexels.com/photos/4397844/pexels-photo-4397844.jpeg?auto=compress&=tinysrgb&w=600`}
                alt={item.name}
                className="WishlistImage"
              />
            </div>
            <div className="ItemInfo">
              <h2>{item.item_name}</h2>
            </div>
            <div>
              <a href={item.link} className="WishlistLink">
                Link
              </a>
            </div>

            <div className="EditDeletButtons">
              <button onClick={() => handleEditClick(item.id)}>Edit</button>
              <button
                className="DeleteButton"
                onClick={() => deleteWishlistItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="ErrorMsg">No wishlist items found.</p>
      )}
    </div>
  );
}

export default UserWishlist;
