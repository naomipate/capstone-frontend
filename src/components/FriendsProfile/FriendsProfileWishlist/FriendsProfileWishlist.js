import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../FriendsProfile.css";
import confetti from "canvas-confetti"
import { updateItemBoughtByItemId } from "../../API/API";

function FriendsProfileWishlist({item}) {
  const [is_bought, setis_bought] = useState(item.is_bought);

  let item_id = item.id

  const updateItem = async () => {
    try {
      let result = await updateItemBoughtByItemId(item_id, !is_bought);
      console.log(result.is_bought);
      setis_bought(!is_bought);
      confettiTrue()
    } catch (e) {
      console.log(e);
    }
  };

  console.log(item_id, is_bought);

  function confettiTrue(){
    if(is_bought === false){
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
                checked={is_bought}
                type="checkbox"
                // onClick={(e) => setCheckMark(!checkMark)}
                onChange={updateItem}
                // onClick={(e) => confettiTrue()}
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
        <div className="right" style={ is_bought ? { visibility: "hidden" } : {visibility: "visible"} }>
        <div className="text-content">
          <h3>Come back to check off once you buy!</h3>
        </div>
        <i className="tooltip-triangle" style={ is_bought ? { visibility: "hidden" } : {visibility: "visible"} }></i>
      </div>
      </div>
    </li>
  );
}

export default FriendsProfileWishlist;
