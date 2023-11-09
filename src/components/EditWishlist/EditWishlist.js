import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Axios from "./Axios";

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
        const response = await Axios.get(`/example/${id}`);
        setWishlist(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, [id]);

  const handleTextChange = (e) => {
    setWishlist({
      ...wishlist,
      [e.target.id]: e.target.value,
    });
  };

  const updateWishlist = async (id, updatedWishlist) => {
    try {
      await Axios.put(`/wishlist/${id}`, updatedWishlist);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateWishlist(id);

      navigate(`/wishList/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item name</label>
          <input
            required
            type="text"
            name="item_name"
            id="item_name"
            value={wishlist.itemName}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label>Image Url</label>
          <input
            required
            type="text"
            name="image_Url"
            id="image_Url"
            onChange={handleTextChange}
            value={wishlist.imageUrl}
          />
        </div>

        <div>
          <label>Item Link</label>
          <input
            required
            type="text"
            name="itemLink"
            id="itemLink"
            onChange={handleTextChange}
            value={wishlist.itemLink}
          />
        </div>

        <button>Submit</button>
        <button className="EditButton"> Edit</button>
      </form>
    </div>
  );
}

export default EditWishlist;
