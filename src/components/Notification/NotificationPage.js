import React, { useEffect, useState } from "react";
import "./NotificationPage.css";
import {
  getNotificationById,
  deleteNotification,
  addNewFriend,
} from "../API/API";
import { toast } from "react-toastify";
import NotiUnit from "./NotiUnit/NotiUnit";

function NotificationPage() {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [notiData, setNotiData] = useState([]);
  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setCurrentUserId(storedUser?.id);
    fetchData(storedUser?.id);
    // eslint-disable-next-line
  }, []);

  async function fetchData(id) {
    try {
      let result = await getNotificationById(id);
      if (result?.response) {
        setNotiData([]);
      }
      setNotiData(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAcceptFriendRequest(user_id, sender_id, item_id) {
    const data = {
      user_id: user_id,
      friend_id: sender_id,
    };
    try {
      await addNewFriend(data);
    } catch (error) {
      toast.error("Something Went Wrong", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }
  async function handleDeleteNoti(id) {
    try {
      await deleteNotification(id);
      let filterdNoti = notiData.filter((item) => item.id !== id);
      setNotiData(filterdNoti);
    } catch (error) {
      toast.error("Something Went Wrong", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }

  return (
    <div className="noti__Container">
      <h1 className="__title">Title</h1>
      <div className="__functionals">
        <div className="__group">
          <button className="__btn">All</button>
          <button className="__btn">Unread</button>
        </div>
        <input
          className="__search"
          type="text"
          placeholder="filter by message"
        ></input>
        <select className="__sort">
          <option value={"Ascending"}>Ascending</option>
          <option value={"Descending"}>Descending</option>
        </select>
      </div>
      <div className="__content">
        <>
          {notiData.map((item) => {
            return <NotiUnit data={item} />;
          })}
        </>
      </div>
    </div>
  );
}

export default NotificationPage;
