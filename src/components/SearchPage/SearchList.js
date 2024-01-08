import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchList.css";
import SearchListBtn from "./SearchListBtn";
import profileImg from "../../Assets/profile-img-red.png";
import { pullUserFromLocal } from "../common/FunctionsLibrary";
import { getAllFriendsFromUser } from "../API/API";

function SearchList({ filteredUsers }) {
  const navigate = useNavigate();
  const [toggleFullView, setToggleFullView] = useState(false);
  const [LoggedInId, setLoggedInId] = useState(0);
  const [formattedUsers, setFormattedUsers] = useState([]);

  useEffect(() => {
    let storedUser = pullUserFromLocal();
    if (storedUser) {
      setToggleFullView(true);
      setLoggedInId(storedUser?.id);
      GrabFriends(storedUser?.id);
    } else {
      setFormattedUsers(filteredUsers);
    }

    // eslint-disable-next-line
  }, []);
  function applyFriendStatus(friendsArr) {
    const friendsSet = new Set(friendsArr.map((element) => element.user_id));
    let newArr = filteredUsers.map((item) => {
      let status = friendsSet.has(item.id);
      return { ...item, status };
    });
    setFormattedUsers(newArr);
  }

  async function GrabFriends(id) {
    try {
      let { data } = await getAllFriendsFromUser(id);
      applyFriendStatus(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="search-list-results-container">
      {formattedUsers.map((user, index) => {
        return (
          <div key={index} className="search-list-result">
            <img
              src={`${user.user_picture ? user.user_picture : profileImg}`}
              className="search-list-profile-img"
              alt="..."
              style={{ maxHeight: "40px" }}
            />
            <Link
              to={
                !user.status
                  ? `/users/${user.id}/`
                  : `/dashboard/${LoggedInId}/friends/${user.id}`
              }
              className="search-list-profile-username"
            >
              {user?.user_name}
            </Link>
            {toggleFullView && (
              <>
                {!user.status ? (
                  <SearchListBtn targetUser={user} />
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/dashboard/${LoggedInId}/friends/${user.id}`);
                    }}
                    className="__confirmedFriends"
                  >
                    View Profile
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SearchList;
