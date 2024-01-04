import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FriendsProfileWishlist from "./FriendsProfileWishlist/FriendsProfileWishlist";
import { getFriendsAndTheirWishlists, deleteFriend } from "../API/API";
import { TbArrowLeft, TbCake } from "react-icons/tb";
import { PiSpeakerHighBold, PiSpeakerXBold } from "react-icons/pi";
import { calculateZodiacSign } from "../common/Zodiac/CalculateZodiacSign";
import "./FriendsProfile.css";
import { toast } from "react-toastify";
import { FriendsContext } from "../common/context/context";
import userProfileImg from "../../Assets/profile-img-red.png";

function FriendsProfile() {
  const [friendInfoProfile, setFriendInfoProfile] = useState([]);
  const [friendInfoWishList, setFriendInfoWishList] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [sortByPrice, setSortByPrice] = useState("asc");
  const [sortedItems, setSortedItems] = useState([]);
  const { setToggleUpdate } = useContext(FriendsContext);
  let currentDate = new Date(Date.now()); // Time from system

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
    // eslint-disable-next-line
  }, [sortByPrice, friendInfoWishList]);

  const handleSortPriceChange = (newSortPrice) => {
    setSortByPrice(newSortPrice);
  };

  // Sorting DOB by positive/negative where we subtract the current date from an upcoming date
  const upcomingDateCalc = (dob) => {
    // DOB date
    let date = new Date(dob);
    let upcomingDateESTTimeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
    // UpcomingDOBDate: calc dates with current year attached.
    let upcomingDateWithCurrentYear = new Date(
      date.setFullYear(currentDate.getFullYear())
    );
    // UpcomingDate - now = Time before each date.
    let oneMiliBeforeTwentyFourHrs = 86399999;
    let upcomingDateDiff = upcomingDateWithCurrentYear - currentDate;
    // Sort by this ^^^^^
    if (upcomingDateDiff > 0) {
      // positive is in the current year
      upcomingDateWithCurrentYear.setTime(
        upcomingDateWithCurrentYear.getTime() +
          oneMiliBeforeTwentyFourHrs +
          upcomingDateESTTimeZoneOffset
      );
      console.log(upcomingDateWithCurrentYear);
      return upcomingDateWithCurrentYear;
      // return upcomingDateWithCurrentYear.setTime(
      //   upcomingDateWithCurrentYear.getTime() +
      //     oneMiliBeforeTwentyFourHrs +
      //     upcomingDateESTTimeZoneOffset
      // );
    } else {
      // negative is next year
      let upcomingDateWithNextYear = new Date(
        date.setFullYear(currentDate.getFullYear() + 1)
      );
      upcomingDateWithNextYear.setTime(
        upcomingDateWithNextYear.getTime() +
          oneMiliBeforeTwentyFourHrs +
          upcomingDateESTTimeZoneOffset
      );
      console.log(upcomingDateWithNextYear);
      return upcomingDateWithNextYear;
    }
  };

  let dobInMili = upcomingDateCalc(friendInfoProfile.dob);

  let dayNumOfUpcomingBirthDay = new Date(
    friendInfoProfile.dob
  ).toLocaleDateString("en-US", { day: "numeric" });

  let fullMonthOfUpcomingBirthday = new Date(
    friendInfoProfile.dob
  ).toLocaleDateString("en-US", {
    month: "long",
  });

  let sign = calculateZodiacSign(dobInMili);
  console.log(sign?.zodiacSign);

  return (
    <div className="friend-profile-container">
      <div className="zodiac-tooltip">
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
                <p className="friend-user-dob">
                  {fullMonthOfUpcomingBirthday} {dayNumOfUpcomingBirthDay}
                </p>
                <TbCake id="cake" size={"1.3rem"} />
              </div>
              <p className="friend-profile-zodiac">
                Zodiac:{" "}
                <span id="zodiac">
                  {sign?.zodiacSign}
                </span>
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
          <div
          className="zodiac-right" style={{ backgroundImage: `url(${sign?.zodiacSign})` }} >
          <div className="zodiac-text-content">
            <h3>{friendInfoProfile.first_name} is a {sign?.zodiacName}, they might like gifts that are:</h3>
            <h3 className="list-item">• {sign?.zodiacInfo[0]}</h3>
            <h3 className="list-item">• {sign?.zodiacInfo[1]}</h3>
            <h3 className="list-item">• {sign?.zodiacInfo[2]}</h3>
            <h3>Note these are suggestions. Always consider the persons interest and preferences before purchasing outside of their wish list.</h3>

          </div>
          <i
            className="zodiac-tooltip-triangle"
          ></i>
        </div>
        </div>
        </div>
      </div>
      <div className="friend-list-button-container">
        <div onClick={() => navigate(-1)} id="back-button">
          <TbArrowLeft size={"2rem"} />
        </div>

        {/* ------- Price sorting order ------ */}
        <div>
          <label htmlFor="priceSortOrder">Sort by: </label>
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
          <>
            {sortedItems.length === 0 ? (
              <>
                <li className="friend-wishlist-list-item">No wishlist items</li>
              </>
            ) : (
              <>
                {sortedItems.map((item) => {
                  return (
                    <FriendsProfileWishlist
                      item={item}
                      key={item.id}
                      isMuted={isMuted}
                    />
                  );
                })}
              </>
            )}
          </>
        </ul>
      </div>
    </div>
  );
}

export default FriendsProfile;
