import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./FriendsWishlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function FriendsWishlist() {
  //   const API_URL = process.env.REACT_APP_API_URL;

  const { id } = useParams();

  //const [selectedFriend, setSelectedFriend] = useState(null);
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

  return (
    <div className="friends-container">
      <div key={wishlist.id}>
        <h2>List</h2>
        <h2>{wishlist.name}</h2>
        <p>{wishlist.dob}</p>
        <p>{wishlist.wishlist_id}</p>
      </div>
      <div className="friends-buttons">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
export default FriendsWishlist;
