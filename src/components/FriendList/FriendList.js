import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./FriendList.css";
import { getAllFriendsFromUser, getFriendsWishlist } from "../API/API";

function FriendList() {
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
              {friendsList.map((user) => {
                return (
                  
                  <li key={user.id} className="friend-list-user">
                    <Link to={`/dashboard/${id}/friends/${user.id}`} className="friend-list-link">
                    <div className="user-first-row">
                      <span className="friend-list-user-name">{user.user_name}</span>
                      <button className="button-1" role="button">
                        Unfollow
                      </button>
                    </div>
                    <div>
                      <span className="user-occupation">{user.dob}</span>
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
