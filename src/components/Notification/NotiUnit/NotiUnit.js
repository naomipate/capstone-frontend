import React, { useState, useEffect, useContext } from "react";
import "./NotiUnit.css";
import { addNewFriend, updateNotification } from "../../API/API";
import { toast } from "react-toastify";
import {
  FriendsContext,
  NotificationContext,
} from "../../common/context/context";

// Icon Imports
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function NotiUnit({ data, handleDeleteNoti }) {
  const { setToggleUpdate } = useContext(FriendsContext);
  const { NotificationsData, toggleUpdate, setNotificationsData } =
    useContext(NotificationContext);
  const [collection, setCollection] = useState(data);
  const [formatDate, setFormatDate] = useState("");
  const [isReadValue, setIsReadValue] = useState(data?.is_read);
  const [notiId, setNotiId] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dateParser(collection.date_stamp);
    setIsReadValue(collection?.is_read);
    setNotiId(collection?.id);

    // eslint-disable-next-line
  }, []);

  function dateParser(inputDate) {
    const dateObject = new Date(inputDate);
    const options = { month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    setFormatDate(formattedDate);
  }
  async function handleAcceptFriendRequest(user_id, sender_id) {
    const data = {
      user_id: user_id,
      friend_id: sender_id,
    };
    try {
      await addNewFriend(data);
      toast.success("You are now friends", toast.POSITION.TOP_CENTER);
      await handleDeleteNoti(collection?.id);

      setToggleUpdate(true);
    } catch (error) {
      toast.error("Something Went Wrong", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }
  async function changeReadData(checkVal) {
    const newData = {
      id: notiId,
      is_read: checkVal,
    };
    try {
      let result = await updateNotification(newData);
      console.log(result);
      setCollection(result);
    } catch (error) {
      console.log(error);
    }
  }
  const handleOnChange = (checked) => {
    setIsReadValue(!isReadValue);
    changeReadData(checked);
  };

  return (
    <div key={data.id} className="__noti">
      {collection?.msg_type === "purchase" ? (
        <>
          <input
            type="checkbox"
            className="__read"
            checked={isReadValue}
            onChange={(e) => handleOnChange(e.target.checked)}
          />
          <p className="__formatDate">{formatDate}</p>
          <p className="__messages">{collection?.messages}</p>
          <div className="__dropdown">
            <button className="__options" onClick={() => setShow(!show)}>
              <IoMdMore />
            </button>
            <div className={`__dropdownContent ${show ? "show" : ""}`}>
              <div className="__contentList">
                <button
                  className="__item"
                  onClick={() => handleDeleteNoti(collection?.id)}
                >
                  <MdDelete />
                  <span>&#8192;</span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {collection?.msg_type === "request" && (
            <>
              <input
                type="checkbox"
                className="__read"
                checked={isReadValue}
                onChange={(e) => handleOnChange(e.target.checked)}
              />
              <p className="__formatDate">{formatDate}</p>
              <p className="__messages">{`${collection?.sender_name}: ${collection?.messages}`}</p>
              <div className="__dropdown">
                <button className="__options" onClick={() => setShow(!show)}>
                  <IoMdMore />
                </button>
                <div className={`__dropdownContent ${show ? "show" : ""}`}>
                  <div className="__contentList">
                    <button
                      className="__item"
                      onClick={() =>
                        handleAcceptFriendRequest(
                          collection?.user_id,
                          collection?.sender_id,
                          collection?.id
                        )
                      }
                    >
                      <FaCheck />
                      <span>&#8192;</span>
                      Accept Friend
                    </button>
                    <button
                      className="__item"
                      onClick={() => handleDeleteNoti(collection?.id)}
                    >
                      <ImCross />
                      <span>&#8192;</span>
                      Decline Friend
                    </button>
                    <button className="__item">
                      <MdDelete />
                      <span>&#8192;</span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default NotiUnit;
