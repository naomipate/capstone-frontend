import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./SearchList.css";
import SearchListBtn from "./SearchListBtn";
import profileImg from "../../Assets/profile-img-red.png";
import { FriendsContext } from "../common/context/context";
import {
  // checkFriendsAgainstArr,
  pullUserFromLocal,
} from "../common/FunctionsLibrary";

function SearchList({ filteredUsers }) {
  const [toggleFullView, setToggleFullView] = useState(false);
  // const [LoggedInId, setLoggedInId] = useState(0);
  const { FriendsData, setToggleUpdate } = useContext(FriendsContext);
  useEffect(() => {
    let storedUser = pullUserFromLocal();
    if (storedUser) {
      setToggleFullView(true);
      // setLoggedInId(storedUser?.id);
      setToggleUpdate(true);
    }
  }, []);

  return (
    <div className="search-list-results-container">
      {filteredUsers.map((user, index) => {
        console.log(user);
        // let checkFriend = checkFriendsAgainstArr(user.user_id, FriendsData);
        // console.log(checkFriend);
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
                // !checkFriend ?
                `/users/${user.id}/`
                // : `/dashboard/${LoggedInId}/friends/${user.id}`
              }
              className="search-list-profile-username"
            >
              {user?.user_name}
            </Link>
            {toggleFullView && (
              <>
                <SearchListBtn targetUser={user} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SearchList;
