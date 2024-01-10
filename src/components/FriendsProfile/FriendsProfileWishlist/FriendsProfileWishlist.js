import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../FriendsProfile.css";
import confetti from "canvas-confetti";
// import popSound from "../../../Assets/pop-sound.mp3";
import chime from "../../../Assets/chime.mp3";
import { updateItemBoughtByItemId, newNotification } from "../../API/API";
import { pullUserFromLocal } from "../../common/FunctionsLibrary";

function FriendsProfileWishlist({ item, isMuted }) {
  const [is_bought, setis_bought] = useState(item.is_bought);
  const [assigned_user, setAssigned_user] = useState(item.assigned_user);
  const [BoughtNotification, setBoughtNotification] = useState({
    id: 0,
    message: `An Item has been bought`,
    sender_id: 0,
    sender_name: "",
    msg_type: "purchase",
    is_read: false,
    date_stamp: "",
    time_stamp: "",
  });

  const { id } = useParams();
  let userId = parseInt(id);
  useEffect(() => {
    let storedUser = pullUserFromLocal();
    setBoughtNotification({
      ...BoughtNotification,
      id: item.user_id,
      sender_id: userId,
      sender_name: storedUser.user_name,
    });
    // eslint-disable-next-line
  }, []);

  function playSound() {
    if (is_bought === false && isMuted === false) {
      new Audio(chime).play();
    }
  }

  function confettiTrue() {
    if (is_bought === false) {
      // return confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { y: 0.6 },
      // });
      return confetti({
        scalar: 2,
        spread: 200,
        particleCount: 50,
        origin: { y: -0.1 },
        startVelocity: -35,
      });
    }
  }

  const updateItem = async () => {
    setAssigned_user(userId);
    let localData = BoughtNotification;
    let currentDate = new Date();
    let fTime = `${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}:${currentDate.getUTCSeconds()}`;
    let formatDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    localData = {
      ...localData,
      date_stamp: formatDate,
      time_stamp: fTime,
    };
    console.log(localData);
    try {
      await updateItemBoughtByItemId(item.id, !is_bought, userId);
      await newNotification(localData);
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
                onChange={updateItem}
                disabled={is_bought && assigned_user !== userId ? true : false}
              />
              <div className="checkmark"></div>
            </label>

            <div className="notititle">
              {item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}
            </div>
            <Link
              to={item?.link}
              target="_blank"
              className="friend-wish-list-item-link"
            ></Link>
            {/* ------- Price is added below -------------- */}

            <div className="notititle">
              ~ ${item.item_price} <br />
            </div>
            <Link to={item?.link} target="_blank">
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
