import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FriendsProfileWishlist from "./FriendsProfileWishlist/FriendsProfileWishlist";
import { getFriendsAndTheirWishlists, deleteFriend } from "../API/API";
import { TbArrowLeft } from "react-icons/tb";
import { PiSpeakerHighBold, PiSpeakerXBold } from "react-icons/pi";
import "./FriendsProfile.css";
import { toast } from "react-toastify";
import { RefreshContext } from "../common/context/context";

function FriendsProfile() {
  const [friendInfoProfile, setFriendInfoProfile] = useState([]);
  const [friendInfoWishList, setFriendInfoWishList] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const { setToggleRefresh } = useContext(RefreshContext);

  const { id, friendId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, []);

  async function fetchList() {
    try {
      let result = await getFriendsAndTheirWishlists(id, friendId);
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
      toast("Friend Unfollowed", toast.POSITION.TOP_CENTER);
      setToggleRefresh(true);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  function mute() {
    setIsMuted(!isMuted);
  }

  return (
    <div className="friend-profile-container">
      <div className="friend-profile-info-top">
        <div className="friend-wishlist-top-left-side">
          <img
            alt="friend-user-profile"
            className="friend-user-profile"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUdhnWROHccYu5AG4Ahi_WnaQgxINV9abPz1MqdYXFwT4txCA5"
          />
          <div className="friend-user-names">
            <h2>{friendInfoProfile.user_name}</h2>
            <p>
              {friendInfoProfile.first_name} {friendInfoProfile.last_name}
            </p>
            <p className="friend-user-dob">
              {new Date(friendInfoProfile.dob)
                .toDateString()
                .split(" ")
                .splice(1, 2)
                .join(" ")}
            </p>
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
          {friendInfoWishList.map((item) => {
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
