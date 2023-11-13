import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./FriendList.css";
import { getAllFriendsFromUser, getFriendsWishlist } from "../API/API";

function FriendList({ user }) {
  const [friendsList, setFriendsList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      let result = await getAllFriendsFromUser(id);

      setFriendsList(result.data);
      console.log(result.data);
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
              {friendsList.map(({ id, user_name, dob }) => {
                return (
                  <li key={id} className="friend-list-user">
                    <div className="user-first-row">
                      <span className="friend-list-user-name">{user_name}</span>
                      <button className="button-1" role="button">
                        Unfollow
                      </button>
                    </div>
                    <div>
                      <span className="user-occupation">{dob}</span>
                    </div>
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
