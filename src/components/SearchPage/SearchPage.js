import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import SearchList from "./SearchList";
import { getAllUsersAPI } from "../API/API";

function Search() {
  const [input, setInput] = useState("");
  const [usersData, setUsersData] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [mainUser, setMainUser] = useState({});

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setMainUser(storedUser);
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      let result = await getAllUsersAPI();
      setUsersData(result.data);
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
    let filtered = usersData.filter((user) => {
      return user?.user_name.toLowerCase().includes(input);
    });
    filtered = filtered.filter((element) => {
      return element?.user_name !== mainUser?.user_name;
    });
    setFilteredUsers(filtered.sort());
  }

  return (
    <div className="search-page">
      <div className="search-page-container">
        <div className="search-page-content">
          <div className="search-page-title">
            <p> Find Your Friend</p>
          </div>

          <div className="search-box">
            <input
              type="text"
              className="search-page-search-input"
              placeholder="Search by username"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />

            <button className="search-page-search-button">
              <img
                className="search-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                src="./images/search-icon.png"
                alt="Magnifying glass"
              />
            </button>
            <div></div>
          </div>
          <div className="search-page-results">
            {input ? <SearchList filteredUsers={filteredUsers} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
