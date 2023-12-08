import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FoundUser.css";
import { getSpecificUser, getSpecificUserWishlist } from "../API/API";
import { TbArrowLeft } from "react-icons/tb";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";

import SearchListBtn from "../SearchPage/SearchListBtn";

function FoundUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toggleFullView, setToggleFullView] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userwishlist, setUserwishlist] = useState([]);
  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    if (storedUser) {
      setToggleFullView(true);
    } else setToggleFullView(false);
    fetchData();
    // eslint-disable-next-line
  }, []);

  async function fetchData() {
    try {
      let result = await getSpecificUser(id);
      let wishlistData = await getSpecificUserWishlist(id);
      if (!toggleFullView) {
        delete result.first_name;
        delete result.last_name;
        delete result.email;
      }
      setUserwishlist(wishlistData);
      setUserInfo(result);
    } catch (error) {
      toast("There was a server error", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
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
            <h2>
              {toggleFullView
                ? `${userInfo?.first_name} ${userInfo?.last_name}`
                : `${userInfo?.user_name}`}
            </h2>
            <p>{userInfo.user_name}</p>
            <p className="friend-user-dob">
              {toggleFullView
                ? `${new Date(userInfo.dob)
                    .toDateString()
                    .split(" ")
                    .splice(1, 2)
                    .join(" ")}`
                : "Please sign in or make an account to view their birthday"}
            </p>
          </div>
        </div>
        <div className="friend-wishlist-top-right-side">
          {toggleFullView ? <SearchListBtn targetUser={userInfo} /> : <></>}
        </div>
      </div>
      <div className="friend-wishlist-list-container">
        <ul className="friend-wishlist-ul">
          {userwishlist.length === 0 ? (
            <li>This user has no wishlist items</li>
          ) : (
            <>
              {userwishlist.map((item) => {
                return (
                  <li key={item.id}>
                    {/* <div className="userItemCard">{`${item?.item_name}`}</div> */}
                    <div className="wishlistItem">
                      <div className="itemGlow"></div>
                      <div className="itemBorderGlow"></div>
                      <div className="itemBody">
                        <div className="itemTitle">
                          {item.item_name.charAt(0).toUpperCase() +
                            item.item_name.slice(1)}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
      <IconContext.Provider value={{ size: "2rem" }}>
        <div className="back-left-arrow-container" onClick={() => navigate(-1)}>
          <TbArrowLeft />
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default FoundUser;
