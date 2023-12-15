import React, { useEffect, useState } from "react";
import { newNotification, getAllFriendsFromUser } from "../API/API";

function SearchListBtn({ targetUser }) {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [user, setUser] = useState({
    id: targetUser.id,
    message: `Wants to be friends`,
    sender_id: 0,
    sender_name: "",
  });

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setUser({
      ...user,
      sender_name: storedUser.user_name,
      sender_id: storedUser.id,
    });
    checkIfFriends(storedUser.id);
    // eslint-disable-next-line
  }, []);

  async function checkIfFriends(localId) {
    try {
      let { data } = await getAllFriendsFromUser(localId);
      let checkRequest = !!data.find((element) => element.user_id === user.id);
      if (checkRequest) setToggleBtn(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFriendRequest() {
    try {
      await newNotification(user);
      setToggleBtn(!toggleBtn);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className="btn" onClick={handleFriendRequest} disabled={toggleBtn}>
      {toggleBtn ? "Already Sent ✓" : "Send Friend Request"}
    </button>
  );
}

export default SearchListBtn;
