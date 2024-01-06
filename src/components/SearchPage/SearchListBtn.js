import React, { useEffect, useState, useContext } from "react";
import { newNotification, getAllFriendsFromUser } from "../API/API";
import { checkIfFriendRequest } from "../common/FunctionsLibrary";
import { NotificationContext } from "../common/context/context";
import "./SearchListBtn.css";
function SearchListBtn({ targetUser }) {
  const { NotificationsData, setSentRequest, SentRequest } =
    useContext(NotificationContext);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [user, setUser] = useState({
    id: targetUser?.id,
    message: `Wants to be friends`,
    sender_id: 0,
    sender_name: "",
    msg_type: "request",
    is_read: false,
    date_stamp: "",
    time_stamp: "",
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
    toggleNotifications();
    checkSentRequest(targetUser?.id);

    // eslint-disable-next-line
  }, []);
  function toggleNotifications() {
    let result = checkIfFriendRequest(user.id, NotificationsData);
    setHasRequest(result);
  }
  function checkSentRequest(targetId) {
    let sentRequestCheck = !!SentRequest.find((item) => item.id === targetId);
    if (sentRequestCheck) {
      setToggleBtn(true);
    }
  }

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
    let localUser = user;
    let currentDate = new Date();
    let formatDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    let fTime = `${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}:${currentDate.getUTCSeconds()}`;
    localUser = {
      ...localUser,
      date_stamp: formatDate,
      time_stamp: fTime,
    };

    try {
      await newNotification(localUser);
      setToggleBtn(!toggleBtn);
      setSentRequest([...SentRequest, localUser]);
    } catch (error) {
      console.log(error);
    }
  }

  /* if toggleBtn is true and hasRequest true => 
        
        */
  return (
    <button
      className="requestBtn"
      onClick={handleFriendRequest}
      disabled={toggleBtn}
    >
      {toggleBtn
        ? "Already Sent ✓"
        : `${
            hasRequest
              ? "Friend Request in Notifications"
              : "Send Friend Request"
          }`}
    </button>
  );
}

export default SearchListBtn;
