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
                    <div className="friend-list-all-names">
                      <span className="friend-list-user-name">
                        {user.user_name}
                      </span>
                      <div className="friend-list-firstname-lastname">
                        {user.first_name} {user.last_name}
                      </div>
                    </div>
                  </div>
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
