import React from "react";
import "./SearchList.css";

function SearchList({ filteredUsers }) {
  return (
    <div className="search-list-results-container">
      {filteredUsers.map((user, index) => {
        console.log(user);
        return (
          <div key={index} className="search-list-result">
            <img
              src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
              className="search-list-profile-img"
              alt="..."
              style={{ maxHeight: "40px" }}
            />
            <p className="search-list-profile-username">{user.user_name}</p>
            
          </div>
        );
      })}
    </div>
  );
}

export default SearchList;
