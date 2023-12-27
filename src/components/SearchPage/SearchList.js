import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchList.css";
import SearchListBtn from "./SearchListBtn";

function SearchList({ filteredUsers }) {
  const [toggleFullView, setToggleFullView] = useState(false);
  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    if (storedUser) setToggleFullView(true);
  }, []);

  return (
    <div className="search-list-results-container">
      {filteredUsers.map((user, index) => {
        return (
          <div key={index} className="search-list-result">
            <img
              src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
              className="search-list-profile-img"
              alt="..."
              style={{ maxHeight: "40px" }}
            />
            <Link
              to={`/users/${user.id}/`}
              className="search-list-profile-username"
            >
              {user?.user_name}
            </Link>
            {toggleFullView && <SearchListBtn targetUser={user} />}
          </div>
        );
      })}
    </div>
  );
}

export default SearchList;
