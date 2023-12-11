import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Notification from "../Notification/Notification";
import { getUserProfile } from "../API/API";
import { RefreshContext } from "../common/context/context";

import "./SidebarNav.css";

function SidebarNav() {
  const { setToggleRefresh, toggleRefresh } = useContext(RefreshContext);
  const [user, setUser] = useState({});
  const [friendsCount, setFriendsCount] = useState(0);

  async function fetchFriendsLength() {
    try {
      let result = await getUserProfile(user.id);
      setFriendsCount(result.data?.friendsOrderedByDOB?.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      fetchFriendsLength();
    }
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    if (toggleRefresh) {
      window.location.reload();
      setToggleRefresh(false);
    }
    // eslint-disable-next-line
  }, [toggleRefresh]);

  function formatDate(inputDate) {
    // Parse the input string into a Date object
    const dateObject = new Date(inputDate);

    // Options for formatting the date
    const options = { month: "long", day: "numeric" };

    // Format the date using the specified options
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <div className="sidebar-nav-container">
      <div className="sidebarUserInfo">
        <img
          className="sidebarImage"
          src="https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1119%2Fr1093133_1296x1296_1%2D1.jpg"
          alt="profile_img"
        />
        <h2 className="sidebarUsername">{user.user_name}</h2>
        <p className="sidebarBirthday">
          {user.dob ? formatDate(user.dob) : ""} 🎈
        </p>
        <hr className="sidebarDivider" />
        <div className="sidebarListContainer">
          <ul className="sidebarList">
            <li className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}`}>Dashboard</NavLink>
            </li>
            <li className="sidebarItem">
              <NavLink to={`/search-page`}>Find Friends</NavLink>
            </li>
            <li className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}/friends`}>
                Friends: {friendsCount ? friendsCount : 0}
              </NavLink>
            </li>
            <li className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}/userwishlist`}>
                Wish List
              </NavLink>
            </li>
            <li className="sidebarItem">
              <Notification />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarNav;
