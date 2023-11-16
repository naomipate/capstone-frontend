import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FriendsProfileWishlist from "./FriendsProfileWishlist/FriendsProfileWishlist";
import { getFriendsAndTheirWishlists } from "../API/API";
import "./FriendsProfile.css";

function FriendsProfile() {
  const [friendInfoProfile, setFriendInfoProfile] = useState([]);
  const [friendInfoWishList, setFriendInfoWishList] = useState([]);

  const { id, friendId } = useParams();
  console.log(id, friendId);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      let result = await getFriendsAndTheirWishlists(id, friendId);
      setFriendInfoProfile(result.data.friendProfile);
      setFriendInfoWishList(result.data.friendsWishlist);
      //   console.log(result.data);
      //   console.log(result.data.friendProfile);
      //   console.log(result.data.friendsWishlist);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="friend-profile-container">
      <div className="friend-profile-info-top">
        <div className="friend-wishlist-top-left-side">
          <div className="profile-img-placeholder"></div>
          <h2>{friendInfoProfile.user_name}</h2>
        </div>
        
        <div className="friend-wishlist-top-right-side">
          <p>{friendInfoProfile.dob}</p>
        </div>
      </div>
        <div className="friend-wishlist-list-container">
        <div>
        {FriendsProfileWishlist.length > 0 ?
        <div className="friend-wishlist-reminder-box">
            <p className="friend-wishlist-reminder">Reminder to check off the item once you buy!!</p>
            </div>
          : ""}
        </div>
        <ul className="friend-wishlist-ul">
          {friendInfoWishList.map((item) => {
            return <FriendsProfileWishlist item={item}  />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default FriendsProfile;
