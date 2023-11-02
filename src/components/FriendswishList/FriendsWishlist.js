import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "./FriendsWishlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function FriendsWishlist() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (id) {
      fetchWishlist();
    }
  }, [id]);

  const fetchWishlist = async () => {
    try {
      let response = await axios.get(`${API_URL}/example/${id}`);

      console.log(response.data);
      setWishlist(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteWishlistItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/example/${id}`);
      console.log(response);
      const { wishlist_id } = response.data;
      alert(`Wishlist item ${wishlist_id} has been deleted`);

      setWishlist(wishlist.filter((item) => item.id !== id));
      navigate("/example");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="friends-wishlist">
      <div className="TitleBar" key={wishlist.id}>
        <h2>List</h2>
        <button className="AddButton">Add Item</button>
      </div>
      <div className="WishlistItem">
        <div className="ImageContainer">
          <img
            src="image-url.jpg"
            alt="WishlitLink"
            className="WishlistImage"
          />
        </div>
        <div className="ItemInfo">
          <h2>{wishlist.name}</h2>
          <a href="" className="WishlistLink">
            Link to Item
          </a>
          <p>{wishlist.wishlist_id}</p>
        </div>

        <div className="EditDeletButtons">
          <button className="EditButton"> Edit</button>
          <button
            className="DeleteButton"
            onClick={() => deleteWishlistItem(wishlist.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default FriendsWishlist;
