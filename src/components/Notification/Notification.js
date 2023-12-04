import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import {
  getNotificationById,
  deleteNotification,
  addNewFriend,
} from "../API/API";
import { toast } from "react-toastify";
import "./Notification.css";
function Notification() {
  const [notiData, setNotiData] = useState([]);
  const [show, setSetShow] = useState(false);

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    fetchData(storedUser.id);
    // eslint-disable-next-line
  }, []);
  async function fetchData(id) {
    try {
      let result = await getNotificationById(id);
      //console.log(result);
      setNotiData(result);
    } catch (error) {
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
  async function handleAcceptFriendRequest(user_id, sender_id, item_id) {
    const data = {
      user_id: user_id,
      sender_id: sender_id,
    };
    try {
      await addNewFriend(data);
      //await deleteNotification(item_id);
      toast.success("You Are now Friends!", toast.POSITION.TOP_CENTER);
    } catch (error) {
      toast.error("Something Went Wrong", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }

  return (
    <>
      <div className="dropdown">
        <button className="dropBtn" onClick={() => setSetShow(!show)}>
          Notifications
        </button>
        {notiData.length > 0 ? (
          <span className="notiBadge">{notiData.length}</span>
        ) : (
          <></>
        )}
        <div className={`dropdownContent ${show ? "show" : ""}`}>
          <div className="ContentList">
            {notiData[0] ? (
              <>
                {notiData.map((item) => {
                  return (
                    <div className="dropdownItem" key={item.id}>
                      {`${item?.sender_name}: ${item?.messages}`}
                      <button
                        className="bttn Accept"
                        onClick={() =>
                          handleAcceptFriendRequest(
                            item.user_id,
                            item.sender_id,
                            item.id
                          )
                        }
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="bttn Decline"
                        type="button"
                        onClick={() => handleDeleteNoti(item.id)}
                      >
                        <IoClose />
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="dropdownItem">No new Notification</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
