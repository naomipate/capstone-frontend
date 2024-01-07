import React, { useEffect, useState, useContext } from "react";
import { newNotification, deleteNotification } from "../API/API";
import { checkIfFriendRequest } from "../common/FunctionsLibrary";
import { NotificationContext } from "../common/context/context";
import "./SearchListBtn.css";
function SearchListBtn({ targetUser }) {
  const { NotificationsData, setSentRequest, SentRequest } =
    useContext(NotificationContext);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [alreadySentRequest, setAlreadySentRequest] = useState(false);
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
    toggleNotifications();
    checkSentRequest(targetUser?.id);

    // eslint-disable-next-line
  }, []);
  function toggleNotifications() {
    let result = checkIfFriendRequest(user.id, NotificationsData);
    setHasRequest(result);
  }
  function checkSentRequest(targetId) {
    let sentRequestCheck;
    if (!SentRequest) {
      sentRequestCheck = false;
    } else {
      sentRequestCheck = !!SentRequest.find((item) => item.id === targetId);
    }
    setAlreadySentRequest(sentRequestCheck);
  }

  useEffect(() => {
    handleDisableBtn();
    // eslint-disable-next-line
  }, [alreadySentRequest, hasRequest]);

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
      setAlreadySentRequest(true);
      setSentRequest([...SentRequest, localUser]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDisableBtn() {
    if (alreadySentRequest || hasRequest) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }

  return (
    <button
      className="requestBtn"
      onClick={handleFriendRequest}
      disabled={toggleBtn}
    >
      {alreadySentRequest && !hasRequest
        ? "Already Sent ✓"
        : !alreadySentRequest && hasRequest
        ? "Friend Request in Notifications"
        : "Send Friend Request"}
    </button>
  );
}

export default SearchListBtn;
