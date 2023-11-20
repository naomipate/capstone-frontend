/* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import Axios from ".././API/Axios";
import { useNavigate, Link } from "react-router-dom";
import WishlistForm from "../WishlistForm/WishlistForm";

import "./UserWishlist.css";

// const API_URL = process.env.REACT_APP_API_URL;

function UserWishlist({ handleCreateWishlist, user }) {
  const navigate = useNavigate();

  console.log(user);
  const user_id = user?.id;
  console.log(user_id);

  const [formData, setFormData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (user_id) {
      fetchWishlist();
    }
  }, [user_id]);

  const fetchWishlist = async () => {
    try {
      let response = await Axios.get(`/userwishlist/${user_id}`);
      setFormData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWishlistItem = async (itemId) => {
    try {
      await Axios.delete(`/userwishlist/${itemId}`);
      alert(`Wishlist item has been deleted`);
      let filterdList = formData.filter((item) => item.id !== itemId);
      console.log(filterdList);
      setFormData(filterdList);

      navigate(`/dashboard/${user_id}/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (itemId) => {
    setEditingItemId(itemId);
    const selectedItem = formData.find((item) => item.id === itemId);
    setSelectedItem(selectedItem);
    if (selectedItem) {
      setFormData(selectedItem);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await Axios.put(`/userwishlist/${editingItemId}`, formData);

      alert(`Wishlist item updated successfully.`);
      setEditingItemId(null);
      fetchWishlist();
      navigate(`/dashboard/${user_id}/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-wishlist">
      <div className="TitleBar" key={formData.id}>
        <h2>List</h2>
        <Link to={`/dashboard/${user_id}/new`}>
          <button>Add Item</button>
        </Link>
      </div>

      {(editingItemId !== null || formData.length === 0) && (
        <WishlistForm
          onSubmit={editingItemId ? handleEditSubmit : handleCreateWishlist}
          initialValues={editingItemId ? selectedItem : {}}
          setFormData={setFormData}
          formData={formData}
        />
      )}

      {formData.length > 0 ? (
        formData.map((item) => (
          <div className="WishlistItem" key={item.id}>
            {/* <div className="ImageContainer">
              <img
                src={`https://images.pexels.com/photos/4397844/pexels-photo-4397844.jpeg?auto=compress&=tinysrgb&w=600`}
                alt={item.name}
                className="WishlistImage"
              />
            </div> */}
            {/* <div className="ItemInfo">
              <h2>{item.item_name}</h2>
            </div> */}
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
