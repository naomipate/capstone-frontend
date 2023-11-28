import React from "react";
import "./FriendInList.css";
import { Link } from "react-router-dom";

function FriendInList({ id, friendsList }) {
  return (
    <div className="friend-list-bottom">
      <ul className="friend-list-users">
        {friendsList.map((user) => {
          return (
            <li key={user.id} className="friend-list-user">
              <Link
                to={`/dashboard/${id}/friends/${user.user_id}`}
                className="friend-list-link"
              >
                <div className="user-first-row">
                  <div className="user-first-row-left">
                    <div className="friend-list-profile-img-placeholder"></div>
                    <span className="friend-list-user-name">
                      {user.user_name}
                    </span>
                  </div>
                  <button className="button-1-friend-list" role="button">
                    Unfollow
                  </button>
                </div>
                <div className="user-dob">
                    {new Date(user.dob)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FriendInList;
