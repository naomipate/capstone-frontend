import React, { useEffect, useState, useContext } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import {
  getNotificationById,
  deleteNotification,
  addNewFriend,
} from "../API/API";
import { toast } from "react-toastify";
import "./Notification.css";
import { RefreshContext } from "../common/context/context";
function Notification() {
  const [notiData, setNotiData] = useState([]);
  const [show, setSetShow] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);
  const { setToggleRefresh } = useContext(RefreshContext);

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setCurrentUserId(storedUser.id);
    fetchData(storedUser.id);
    // eslint-disable-next-line
  }, []);
  async function fetchData(id) {
    try {
      let result = await getNotificationById(id);
      console.log(result);
      if (result?.response) {
        setNotiData([]);
      }
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
      friend_id: sender_id,
    };
    const alternateData = {
      user_id: sender_id,
      sender_id: user_id,
    };
    console.log(data, alternateData);
    try {
      await addNewFriend(data);
      await addNewFriend(alternateData);
      await deleteNotification(item_id);
      setToggleRefresh(true);
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
            <button
              className={"refreshBtn"}
              onClick={() => fetchData(currentUserId)}
            >
              <IoMdRefresh />
            </button>
            {notiData[0] ? (
              <>
                {notiData.map((item, index) => {
                  return (
                    <>
                      {item.messages.includes("friends") ? (
                        <div className="dropdownItem" key={item.id || index}>
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
                            onClick={() =>
                              handleDeleteNoti(item.id, item.sender_id)
                            }
                          >
                            <IoClose />
                          </button>
                        </div>
                      ) : (
                        <div className="dropdownItem" key={item.id || index}>
                          {`${item?.sender_name}: ${item?.messages}`}
                          <button
                            className="bttn"
                            onClick={() => handleDeleteNoti(item.id)}
                          >
                            <IoClose />
                          </button>
                        </div>
                      )}
                    </>
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
