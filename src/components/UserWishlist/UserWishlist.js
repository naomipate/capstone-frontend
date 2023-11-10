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

  useEffect(() => {
    if (id) {
      fetchWishlist(id);
    }
  }, [id]);

  const fetchWishlist = async () => {
    try {
      let response = await axios.get(`${API_URL}/userwishlist/${id}`);

      console.log(response.data);
      setFormData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWishlistItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/userwishlist/${id}`);

      const { wishlist_id } = response.data;
      alert(`Wishlist item ${wishlist_id} has been deleted`);

      setFormData((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== id)
      );
      navigate("/userwishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`${API_URL}/userwishlist/${editingItemId}`);
      alert(`Wishlist item updated successfully.`);
      setEditingItemId(null);
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateWishlist = async (formData) => {
    try {
      await axios.post(`${API_URL}/userwishlist`, formData);
      alert("Wishlist item created successfully!");
      setFormData({
        itemName: "",
        imageUrl: "",
        itemLink: "",
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
        <Link to={"/Create-wishlist"}>
          <button>Add Item</button>
        </Link>
      </div>

      <WishlistForm
        onSubmit={editingItemId ? handleEditSubmit : handleCreateWishlist}
        initialValues={
          editingItemId
            ? formData.find((item) => item.id === editingItemId)
            : null
        }
      />

      {formData.length > 0 ? (
        formData.map((item) => (
          <div className="WishlistItem" key={item.id}>
            <div className="ImageContainer">
              <img src={item.Image} alt={item.name} className="WishlistImage" />
            </div>
            <div className="ItemInfo">
              <h2>{item.item_name}</h2>
              <a href={item.link} className="WishlistLink"></a>
              <p>{item.wishlist_id}</p>
            </div>

            <div className="EditDeletButtons">
              <button>
                <Link to={`/userwishlist/${id}/edit`}>Edit</Link>
              </button>
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
