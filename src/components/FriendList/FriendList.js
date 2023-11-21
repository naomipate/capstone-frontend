/* eslint-disable padded-blocks */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./FriendList.css";
import { getAllFriendsFromUser } from "../API/API";

function FriendList() {
  const [friendsList, setFriendsList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchList();
  }, [id]);

  async function fetchList() {
    try {
      let result = await getAllFriendsFromUser(id);

      setFriendsList(result.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="friend-list-container">
      <div className="friend-list-wrapper">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="friend-list-card">
          <section className="top">
            <span className="u-l">Friends List</span>
          </section>
          <section className="friend-list-bottom">
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
                      <div>
                        <span className="user-dob">
                          {new Date(user.dob)
                            .toDateString()
                            .split(" ")
                            .splice(1, 2)
                            .join(" ")}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FriendList;
