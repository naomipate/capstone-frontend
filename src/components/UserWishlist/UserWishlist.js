import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./UserWishlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function UserWishlist() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (id) {
      fetchWishlist(id);
    }
  }, [id]);

  const fetchWishlist = async () => {
    try {
      let response = await axios.get(`${API_URL}/userwishlist/${id}`);

      console.log(response.data);
      setWishlist(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteWishlistItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/userwishlist/${id}`);

      const { wishlist_id } = response.data;
      alert(`Wishlist item ${wishlist_id} has been deleted`);

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== id)
      );
      navigate("/userwishlist");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="user-wishlist">
      <div className="TitleBar" key={wishlist.id}>
        <h2>List</h2>
        <Link to={"/Create-wishlist"}>
          <button>Add Item</button>
        </Link>
      </div>

      {wishlist.length > 0 ? (
        wishlist.map((item) => (
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
                <Link to={`/properties/${id}/edit`}>Edit</Link>
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
