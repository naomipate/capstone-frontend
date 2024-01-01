import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../FriendsProfile.css";
import confetti from "canvas-confetti";
// import popSound from "../../../Assets/pop-sound.mp3";
import chime from "../../../Assets/chime.mp3";
import { updateItemBoughtByItemId } from "../../API/API";

function FriendsProfileWishlist({ item, isMuted }) {
  const [is_bought, setis_bought] = useState(item.is_bought);
  const [assigned_user, setAssigned_user] = useState(item.assigned_user);

  const { id } = useParams();
  let userId = parseInt(id);

  function playSound() {
    if (is_bought === false && isMuted === false) {
      new Audio(chime).play();
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

  const updateItem = async () => {
    setAssigned_user(userId);
    try {
      await updateItemBoughtByItemId(item.id, !is_bought, userId);
      setis_bought(!is_bought);
      confettiTrue();
      playSound();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li key={item.id} className="friend-wishlist-list-item">
      <div className="tooltip">
        <div className="friend-wish-list">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>

          <div
            className="notibody"
            style={
              is_bought && assigned_user !== userId ? { opacity: "50%" } : {}
            }
          >
            <label className="container-checkmark">
              <input
                checked={is_bought}
                type="checkbox"
                // onClick={updateItem}
                onChange={updateItem}
                disabled={is_bought && assigned_user !== userId ? true : false}
              />
              <div className="checkmark"></div>
            </label>

            <div className="notititle">
              {item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}
            </div>

            {/* ------- Price is added below -------------- */}

            <div className="notititle">
              ${item.item_price} <br /> (Approximate)
            </div>
            {/* <div to={item.price}></div> */}

            <Link
              to={item.link}
              target="_blank"
              className="friend-wish-list-item-link"
            >
              <button
                className="button-friend-profile-wishlist"
                disabled={is_bought && assigned_user !== userId ? true : false}
              >
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
