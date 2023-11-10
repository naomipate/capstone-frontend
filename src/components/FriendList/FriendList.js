import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./FriendList.css";
import { getAllFriendsFromUser, getFriendsWishlist } from "../API/API";


function FriendList({user}) {
  const [friendsList, setFriendsList] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    fetchList();
  }, [id]);

  async function fetchList() {
    try {
      let result = await getAllFriendsFromUser();

      setFriendsList(result.data);
      // console.log(result.data)

    } catch (error) {
      console.log(error);
    }

  }
  

  return (
    <div>
      <h1> friends</h1>
        {/* <ul>
            {friendsList.map(({id, user_name}))} => {
              return (
                <li key={id}> 
                {user_name}
                </li>
              )
            }
        </ul> */}
    </div>
  )
}

export default FriendList