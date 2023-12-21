import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FriendsProfileWishlist from "./FriendsProfileWishlist/FriendsProfileWishlist";
import { getFriendsAndTheirWishlists, deleteFriend } from "../API/API";
import { TbArrowLeft, TbCake } from "react-icons/tb";
import { PiSpeakerHighBold, PiSpeakerXBold } from "react-icons/pi";
import "./FriendsProfile.css";
import { toast } from "react-toastify";
import { RefreshContext } from "../common/context/context";
import { FriendsContext } from "../common/context/context";
import userProfileImg from "../../Assets/profile-img-red.png";

function FriendsProfile() {
  const [friendInfoProfile, setFriendInfoProfile] = useState([]);
  const [friendInfoWishList, setFriendInfoWishList] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const { setToggleRefresh } = useContext(RefreshContext);
  const [sortByPrice, setSortByPrice] = useState("asc");
  const [sortedItems, setSortedItems] = useState([]);
  const { setToggleUpdate } = useContext(FriendsContext);

  const { id, friendId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, []);

  async function fetchList() {
    try {
      let result = await getFriendsAndTheirWishlists(id, friendId);
      console.log(result.data.friendsWishlist);
      setFriendInfoProfile(result.data.friendProfile);
      setFriendInfoWishList(result.data.friendsWishlist);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteFriend() {
    try {
      await deleteFriend(friendId, id);
      await deleteFriend(id, friendId);
      setToggleUpdate(true);
      toast("Friend Unfollowed", toast.POSITION.TOP_CENTER);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  function mute() {
    setIsMuted(!isMuted);
  }

  const sortItems = () => {
    if (Array.isArray(friendInfoWishList)) {
      const sortedItemsCopy = [...friendInfoWishList];
      console.log(sortedItemsCopy);
      sortedItemsCopy.sort((a, b) => {
        if (sortByPrice === "asc") {
          return a.item_price - b.item_price;
        } else {
          return b.item_price - a.item_price;
        }
      });
      setSortedItems(sortedItemsCopy);
      console.log(sortedItems);
    }
  };

  useEffect(() => {
    sortItems();
  }, [sortByPrice, friendInfoWishList]);

  const handleSortPriceChange = (newSortPrice) => {
    setSortByPrice(newSortPrice);
  };

  return (
    <div className="friend-profile-container">
      <div className="friend-profile-info-top">
        <div className="friend-wishlist-top-left-side">
          <img
            alt="friend-user-profile"
            className="friend-user-profile"
            src={userProfileImg}
          />
          <div className="friend-profile-user-names">
            <h2>{friendInfoProfile.user_name}</h2>
            <p>
              {friendInfoProfile.first_name} {friendInfoProfile.last_name}
            </p>
            <div className="friend-profile-dob-container">
              <TbCake id="cake" size={"1.3rem"} />
              <p className="friend-user-dob">
                {new Date(friendInfoProfile.dob)
                  .toDateString()
                  .split(" ")
                  .splice(1, 2)
                  .join(" ")}
              </p>
            </div>
          </div>
        </div>

        <div className="friend-wishlist-top-right-side">
          <button
            className="button-friend-profile"
            onClick={handleDeleteFriend}
          >
            Unfollow
          </button>
        </div>
      </div>
      <div className="friend-list-button-container">
        <div onClick={() => navigate(-1)} id="back-button">
          <TbArrowLeft size={"2rem"} />
        </div>

        {/* ------- Price sorting order ------ */}
        <div>
          <label htmlFor="priceSortOrder">Sort by:</label>
          <select
            id="priceSortOrder"
            onChange={(e) => handleSortPriceChange(e.target.value)}
          >
            <option value="asc">Lowest Price</option>
            <option value="desc">Highest Price</option>
          </select>
        </div>

        {isMuted === false ? (
          <div onClick={() => mute()} id="speaker-button">
            <PiSpeakerHighBold size={"1.7rem"} />
          </div>
        ) : (
          <div onClick={() => mute()} id="speaker-button">
            <PiSpeakerXBold size={"1.7rem"} />
          </div>
        )}
      </div>
      <div className="friend-wishlist-list-container">
        <ul className="friend-wishlist-ul">
          {sortedItems.map((item) => {
            return (
              <FriendsProfileWishlist
                item={item}
                key={item.id}
                isMuted={isMuted}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default FriendsProfile;
