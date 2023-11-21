import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FriendsProfileWishlist from "./FriendsProfileWishlist/FriendsProfileWishlist";
import { getFriendsAndTheirWishlists, deleteFriend } from "../API/API";
import "./FriendsProfile.css";

function FriendsProfile() {
  const [friendInfoProfile, setFriendInfoProfile] = useState([]);
  const [friendInfoWishList, setFriendInfoWishList] = useState([]);
  const navigate = useNavigate();

  const { id, friendId } = useParams();
  // console.log(id, friendId);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, []);

  async function fetchList() {
    try {
      let result = await getFriendsAndTheirWishlists(id, friendId);
      // console.log(result.data);
      setFriendInfoProfile(result.data.friendProfile);
      setFriendInfoWishList(result.data.friendsWishlist);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteFriend() {
    try {
      await deleteFriend(friendId, id);
      alert("Friend Successfully Unfollowed");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="friend-profile-container">
      <div className="friend-profile-info-top">
        <div className="friend-wishlist-top-left-side">
          <div className="profile-img-placeholder"></div>
          <div>
            <h2>{friendInfoProfile.user_name}</h2>
            <p>Firstname Lastname</p>
          </div>
        </div>

        <div className="friend-wishlist-top-right-side">
          <p>{friendInfoProfile.dob}</p>
          <button
            className="button-friend-profile"
            onClick={handleDeleteFriend}
          >
            Unfollow
          </button>
        </div>
      </div>
      <div className="friend-wishlist-list-container">
        <div>
          {FriendsProfileWishlist.length > 0 ? (
            <div className="friend-wishlist-reminder-box">
              <p className="friend-wishlist-reminder">
                Reminder to check off the item once you buy!!
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <ul className="friend-wishlist-ul">
          {friendInfoWishList.map((item) => {
            return <FriendsProfileWishlist item={item} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default FriendsProfile;
