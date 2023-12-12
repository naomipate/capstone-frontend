import React, { useState, useEffect, useId } from "react";
import { Link, useParams } from "react-router-dom";
import "../FriendsProfile.css";
import confetti from "canvas-confetti";
import popSound from "../../../Assets/pop-sound.mp3";
import { updateItemBoughtByItemId } from "../../API/API";

function FriendsProfileWishlist({ item }) {
  const [is_bought, setis_bought] = useState(item.is_bought);
  const [assigned_user, setAssigned_user] = useState(item.assigned_user);

  const { id } = useParams();

  const updateItem = async () => {
    setAssigned_user(id)
    try {
      await updateItemBoughtByItemId(item.id, !is_bought, id);
      setis_bought(!is_bought);
      confettiTrue();
    } catch (e) {
      console.log(e);
    }
  };

  console.log(item.id, !is_bought, assigned_user);

  function playSound() {
    if (is_bought === false) {
      new Audio(popSound).play();
    }
  }

  function confettiTrue() {
    if (is_bought === false) {
      return confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }

  return (
    <li key={item.id} className="friend-wishlist-list-item">
      <div className="tooltip">
        <div className="friend-wish-list">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>

          <div className="notibody">
            <label className="container-checkmark">
              <input
                checked={is_bought}
                type="checkbox"
                onClick={(e) => playSound()}
                onChange={updateItem}
                disabled={assigned_user !== id ? true : false}
                
              />
              <div className="checkmark"></div>
            </label>

            <div className="notititle">
              {item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}
            </div>
            <Link
              to={item.link}
              target="_blank"
              className="friend-wish-list-item-link"
            >
              <button className="button-friend-profile-wishlist">
                Buy Item
              </button>
            </Link>
          </div>
        </div>
        <div
          className="right"
          style={
            is_bought ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          <div className="text-content">
            <h3>Come back to check off once you buy!</h3>
          </div>
          <i
            className="tooltip-triangle"
            style={
              is_bought ? { visibility: "hidden" } : { visibility: "visible" }
            }
          ></i>
        </div>
      </div>
    </li>
  );
}

export default FriendsProfileWishlist;
