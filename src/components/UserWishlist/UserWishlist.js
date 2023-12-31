/* eslint-disable padded-blocks */
import React, { useEffect, useState, useContext } from "react";
import Axios from ".././API/Axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { TbArrowLeft } from "react-icons/tb";
import { IconContext } from "react-icons";

import WishlistForm from "../WishlistForm/WishlistForm";
import WishListItem from "./UserWishListItem/WishListItem";
import { WishlistContext } from "../common/context/context";
import "./UserWishlist.css";

function UserWishlist({ handleCreateWishlist, user }) {
  const navigate = useNavigate();

  const { WishlistData, setWishlistData, setToggleUpdate, toggleUpdate } =
    useContext(WishlistContext);

  const user_id = user?.id;

  const [formData, setFormData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [sortByPrice, setSortByPrice] = useState("asc");
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    if (user_id) {
      fetchWishlist();
    }
    // eslint-disable-next-line
  }, [user_id]);

  useEffect(() => {
    if (toggleUpdate) {
      fetchWishlist();
      setToggleUpdate(false);
    }
  }, [toggleUpdate]);

  const fetchWishlist = async () => {
    try {
      let response = await Axios.get(`/userwishlist/${user_id}`);
      setFormData(response.data);
      setWishlistData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWishlistItem = async (itemId) => {
    try {
      await Axios.delete(`/userwishlist/${itemId}`);

      toast.success(
        "Wishlist item has been deleted",
        toast.POSITION.TOP_CENTER
      );

      let filterdList = formData.filter((item) => item.id !== itemId);
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
    // if (selectedItem) {
    //   setFormData(selectedItem);
    // }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await Axios.put(`/userwishlist/${editingItemId}`, formData);

      toast.success(
        "Wishlist item updated successfully",
        toast.POSITION.TOP_CENTER
      );
      setEditingItemId(null);
      fetchWishlist();
      navigate(`/dashboard/${user_id}/userwishlist`);
    } catch (err) {
      console.log(err);
    }
  };

  const sortItems = () => {
    if (Array.isArray(formData)) {
      const sortedItemsCopy = [...formData];
      sortedItemsCopy.sort((a, b) => {
        if (sortByPrice === "asc") {
          return a.item_price - b.item_price;
        } else {
          return b.item_price - a.item_price;
        }
      });
      setSortedItems(sortedItemsCopy);
    }
  };

  useEffect(() => {
    sortItems();
  }, [sortByPrice, formData]);

  const handleSortPriceChange = (newSortPrice) => {
    setSortByPrice(newSortPrice);
  };

  return (
    <div className="user-wishlist-container">
      <div className="user-wishlist">
        <div className="TitleBar" key={formData.id}>
          <h2>Wishlist</h2>

          <Link to={`/dashboard/${user_id}/new`}>
            <button>Add Item</button>
          </Link>
        </div>

        {/* ------- Price sorting order ------ */}
        <div className="back-sort-actions">
          {" "}
          <IconContext.Provider value={{ size: "2rem" }}>
            <div
              onClick={() => navigate(`/dashboard/${user_id}`)}
              className="back-left-arrow-container"
            >
              <TbArrowLeft />
            </div>
            {editingItemId !== null ? (
              <></>
            ) : (
              <div className="SortByDropdown">
                <label htmlFor="priceSortOrder">Sort by:</label>
                <select
                  id="priceSortOrder"
                  onChange={(e) => handleSortPriceChange(e.target.value)}
                >
                  <option value="asc">Lowest Price</option>
                  <option value="desc">Highest Price</option>
                </select>
              </div>
            )}
          </IconContext.Provider>
        </div>

        {editingItemId !== null ? (
          <WishlistForm
            onSubmit={editingItemId ? handleEditSubmit : handleCreateWishlist}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <>
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => {
                return (
                  <WishListItem
                    key={item.id}
                    item={item}
                    deleteWishlistItem={deleteWishlistItem}
                    handleEditClick={handleEditClick}
                  />
                );
              })
            ) : (
              <p className="ErrorMsg">No wishlist items found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserWishlist;
