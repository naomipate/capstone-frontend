import React, { useState, useEffect } from "react";
import "./SearchPage.css";
// import { SearchList } from "./SearchList"
import SearchList from "./SearchList";
import { getAllUsersAPI } from "../API/API";

function Search() {
  const [input, setInput] = useState("");
  const [usersData, setUsersData] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      let result = await getAllUsersAPI();
      setUsersData(result.data);
      // console.log(usersData);
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
      return user.user_name.toLowerCase().includes(input);
    });
    // console.log(filtered);
    // setFilteredUsers([...usersData, filtered]);
    setFilteredUsers(filtered);
    // setUsersData(filtered)
    // console.log(filteredUsers);
    // console.log(usersData);
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
            ></input>

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
            {/* <SearchList filteredUsers={filteredUsers} /> */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
