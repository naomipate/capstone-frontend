import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FriendList.css";
import { getAllFriendsFromUser } from "../API/API";
import FriendInList from "./FriendInList/FriendInList";

function FriendList() {
  const [input, setInput] = useState("");
  const [friendsFromUser, setFriendsFromUser] = useState([]);
  const [filteredFriends, setFilteredUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  async function fetchUsers() {
    try {
      let result = await getAllFriendsFromUser(id);
      setFriendsFromUser(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (value) => {
    setInput(value);
    fetchUsers(value);
    handleFilter(value);
  };

  function handleFilter(input) {
    let filtered = friendsFromUser.filter((user) => {
      return user.user_name.toLowerCase().includes(input);
    });

    setFilteredUsers(filtered);
  }

  return (
    <div className="friend-list-container">
      <div className="friend-list-wrapper">
        {/* <div className="circle-1"></div>
        <div className="circle-2"></div> */}
        <div className="friend-list-card">
          <section className="top">
            <span className="u-l">Friends List</span>
          </section>

          <div className="friends-list-search-box">
            <input
              type="text"
              className="friends-list-search-input"
              placeholder="Search by username"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />

            <button className="friends-list-search-button">
              <img
                className="search-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                src="../../images/search-icon.png"
                alt="Magnifying glass"
              />
            </button>
          </div>
          {input === "" ? (
            <FriendInList id={id} friendsList={friendsFromUser} />
          ) : (
            <FriendInList id={id} friendsList={filteredFriends} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendList;
