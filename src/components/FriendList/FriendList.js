import React, { useState, useEffect } from "react";
import "./FriendList.css";
import { getAllFriendsFromUser, getFriendsWishlist } from "../API/API";


function FriendList() {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      let result = await getAllFriendsFromUser();

      setFriendsList(result.data);
      console.log(result.data)

    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div>
        <ul>
            {/* {friendsList.map(({}))} */}
        </ul>
    </div>
  )
}

export default FriendList