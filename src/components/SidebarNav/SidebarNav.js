import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Notification from "../Notification/Notification";
import { getUserProfile } from "../API/API";
import userProfileImg from "../../Assets/profile-img-yellow.png";
import { TbCake } from "react-icons/tb";
import "./SidebarNav.css";

function SidebarNav() {
  const [user, setUser] = useState({});
  const [friendsCount, setFriendsCount] = useState(0);

  let location = useLocation();


  async function fetchFriendsLength() {
    try {
      // Query for this function, can be done with SELECT COUNT(id) FROM friends_list
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
      <div className="sidebar-nav-content">
        <div className="sidebar-user-info">
          <img
            className="sidebarImage"
            src={userProfileImg}
            alt="profile_img"
          />
          <h2 className="sidebarUsername">{user.user_name}</h2>
          <p className="sidebarBirthday">
            <TbCake id="cake" size={"1.3rem"} />
            {user.dob ? formatDate(user.dob) : ""}
          </p>
        </div>

        <hr className="sidebarDivider" />
        <div className="sidebarListContainer">
          <ul className="sidebarList">
            <li key="dashboard" className="sidebarItem">
              <NavLink 
              end to={`/dashboard/${user?.id}`}
              >Dashboard</NavLink>
            </li>
            <li key="search" className="sidebarItem">
              <NavLink
               to={`/search-page`}
               >Find Friends</NavLink>
            </li>
            <li key="friends" className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}/friends`}
              >Friends: {friendsCount ? friendsCount : 0}</NavLink>
            </li>
            <li key="wishlist" className="sidebarItem">
              <NavLink
               to={`/dashboard/${user?.id}/userwishlist`}

               >Wish List</NavLink>
            </li>
            <li key="notification" className="sidebarItem">
              <Notification />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarNav;
