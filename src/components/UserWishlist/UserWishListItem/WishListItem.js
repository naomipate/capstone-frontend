import React, { useState } from "react";
import "./WishListItem.css";
import { IconContext } from "react-icons";
import { TbEdit, TbTrash } from "react-icons/tb";

function WishListItem({ item, handleEditClick, deleteWishlistItem }) {
  // eslint-disable-next-line
  const [sortByPrice, setSortByPrice] = useState("asc");

  return (
    <li key={item?.id} className="user-wishlist-item-container">
      <div className="list-item-body">
        <div className="list-item-content">
          <div className="EditDeletButtons">
            <IconContext.Provider value={{ size: "2rem" }}>
                <TbEdit
                  className="EditButton"
                  onClick={() => handleEditClick(item?.id)}
                />
            </IconContext.Provider>
          </div>

          <div className="list-item-name-and-link">
            <p>
              {" "}
              {item?.item_name.charAt(0).toUpperCase() +
                item?.item_name.slice(1)}{" "}
            </p>
            <a href={item?.link} className="WishlistLink">
              {item?.link.length > 20
                ? item?.link.slice(0, 21) + "..."
                : item?.link}
            </a>
          </div>

          <div className="list-item-price">
            Price: ${item?.item_price} <br />
            (Approximate){" "}
          </div>

          <div>
            <IconContext.Provider value={{ size: "2rem" }}>
                <TbTrash
                  className="DeleteButton"
                  onClick={() => deleteWishlistItem(item?.id)}
                />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </li>
  );
}

export default WishListItem;
