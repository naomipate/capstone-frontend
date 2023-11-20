import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../FriendsProfile.css";

function FriendsProfileWishlist({item}) {
  const [checkMark, setCheckMark] = useState(false);


  return (
    <li key={item.id} className="friend-wishlist-list-item">
      <div className="friend-wish-list">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>

        <div className="notibody">
          <label className="container-checkmark">
            <input
              checked={checkMark}
              type="checkbox"
              onClick={(e) => setCheckMark(!checkMark)}
            />
            <div className="checkmark"></div>
          </label>

          <div className="notititle">{item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}</div>
          <Link to={item.link} className="friend-wish-list-item-link">
            <button className="button-1">Buy Item</button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default FriendsProfileWishlist;
