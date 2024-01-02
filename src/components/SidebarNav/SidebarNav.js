import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
// import Notification from "../Notification/Notification";
import userProfileImg from "../../Assets/profile-img-yellow.png";
import { FriendsContext } from "../common/context/context";
import { getAllFriendsFromUser } from "../API/API";
import { TbCake } from "react-icons/tb";
import "./SidebarNav.css";

function SidebarNav() {
  const [user, setUser] = useState({});
  const [friendsCount, setFriendsCount] = useState(0);

  const { setFriendsData, toggleUpdate, setToggleUpdate } =
    useContext(FriendsContext);

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    console.log(storedUser);
    setUser(storedUser);
    fetchFriends(storedUser?.id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (toggleUpdate) {
      fetchFriends(user?.id);
      setToggleUpdate(false);
      let userFromStorage = localStorage.getItem("user");
      let storedUser = JSON.parse(userFromStorage);
      console.log(storedUser);
      setUser(storedUser);
    }
    // eslint-disable-next-line
  }, [toggleUpdate]);

  function formatDate(inputDate) {
    // Parse the input string into a Date object
    const dateObject = new Date(inputDate);
    // EST DateTime Offset
    const dateObjectESTTimeOffset = dateObject.getTimezoneOffset() * 60 * 1000;
    dateObject.setTime(dateObject.getTime() + dateObjectESTTimeOffset);
    // Options for formatting the date
    const options = { month: "long", day: "numeric" };

    // Format the date using the specified options
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  async function fetchFriends(id) {
    try {
      let result = await getAllFriendsFromUser(id);
      setFriendsCount(result.data.length);
      setFriendsData(result.data);
    } catch (error) {
      console.log(error);
    }
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
              <NavLink end to={`/dashboard/${user?.id}`}>
                Dashboard
              </NavLink>
            </li>
            <li key="search" className="sidebarItem">
              <NavLink to={`/search-page`}>Find Friends</NavLink>
            </li>
            <li key="friends" className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}/friends`}>
                Friends: {friendsCount ? friendsCount : 0}
              </NavLink>
            </li>
            <li key="wishlist" className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}/userwishlist`}>
                Wish List
              </NavLink>
            </li>
            {/* <li key="notification" className="sidebarItem">
              <Notification />
            </li> */}
            <li className="sidebarItem">
              <NavLink to={"/dashboard/notification"}>Notificiations</NavLink>
            </li>
            <li key="profile" className="sidebarItem">
              <NavLink to={`/dashboard/${user?.id}/editProfile`}>Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarNav;
