import React, {
  useState,
  useEffect,
  // useContext
} from "react";
import { Link } from "react-router-dom";
import "./SearchList.css";
import SearchListBtn from "./SearchListBtn";
import profileImg from "../../Assets/profile-img-red.png";
// import { FriendsContext } from "../common/context/context";
import { pullUserFromLocal } from "../common/FunctionsLibrary";
import { getAllFriendsFromUser } from "../API/API";

function SearchList({ filteredUsers }) {
  const [toggleFullView, setToggleFullView] = useState(false);
  const [LoggedInId, setLoggedInId] = useState(0);
  const [formattedUsers, setFormattedUsers] = useState([]);
  // const { FriendsData, setToggleUpdate } = useContext(FriendsContext);

  // const [copyFriendsData, setCopyFriendsData] = useState([]);
  useEffect(() => {
    let storedUser = pullUserFromLocal();
    if (storedUser) {
      setToggleFullView(true);
      setLoggedInId(storedUser?.id);
      GrabFriends(storedUser?.id);
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
                  <p className="__confirmedFriends">View Profile</p>
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
