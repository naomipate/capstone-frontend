import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../FriendsProfile.css";
import confetti from "canvas-confetti"

function FriendsProfileWishlist({ item }) {
  const [checkMark, setCheckMark] = useState(false);

  function confettiTrue(){
    if(checkMark === false){
      return confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }


  return (
    <li key={item.id} className="friend-wishlist-list-item">
      <div className="tooltip" >
        <div className="friend-wish-list">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>

          <div className="notibody">
            <label className="container-checkmark">
              <input
                checked={checkMark}
                type="checkbox"
                // onClick={(e) => setCheckMark(!checkMark)}
                onChange={(e) => setCheckMark(!checkMark)}
                onClick={(e) => confettiTrue() }
              />
              <div className="checkmark"></div>
            </label>
            <div className="notititle">
              {item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}
            </div>
            <Link to={item.link} target="_blank" className="friend-wish-list-item-link">
              <button className="button-friend-profile-wishlist">Buy Item</button>
            </Link>
          </div>
        </div>
        <div className="right" style={ checkMark ? { visibility: "hidden" } : {visibility: "visible"} }>
        <div className="text-content">
          <h3>Come back to check off once you buy!</h3>
        </div>
        <i className="tooltip-triangle" style={ checkMark ? { visibility: "hidden" } : {visibility: "visible"} }></i>
      </div>
      </div>
    </li>
  );
}

export default FriendsProfileWishlist;
