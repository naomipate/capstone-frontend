import React, { useState, useEffect, useContext } from "react";
import "./NotiUnit.css";
import { addNewFriend, updateNotification } from "../../API/API";
import { toast } from "react-toastify";
import { FriendsContext } from "../../common/context/context";

function NotiUnit({ data, handleDeleteNoti }) {
  const { setToggleUpdate } = useContext(FriendsContext);
  const [collection, setCollection] = useState(data);
  const [formatDate, setFormatDate] = useState("");
  const [isReadValue, setIsReadValue] = useState(data?.is_read);
  const [notiId, setNotiId] = useState(null);
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
  async function handleAcceptFriendRequest(user_id, sender_id, item_id) {
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
            checked={isReadValue}
            onChange={(e) => handleOnChange(e.target.checked)}
          />
          <p>{formatDate}</p>
          <p>{collection?.msg_type}</p>
          <p>{collection?.messages}</p>
          <button className="__btn">Delete</button>
        </>
      ) : (
        <>
          {collection?.msg_type === "request" && (
            <>
              <input
                type="checkbox"
                checked={isReadValue}
                onChange={(e) => handleOnChange(e.target.checked)}
              />
              <p>{formatDate}</p>
              <p>{collection?.msg_type}</p>
              <p>{`${collection?.sender_name}: ${collection?.messages}`}</p>
              <button
                className="__btn"
                onClick={() =>
                  handleAcceptFriendRequest(
                    collection?.user_id,
                    collection?.sender_id,
                    collection?.id
                  )
                }
              >
                Accept
              </button>
              <button
                className="__btn"
                onClick={() => handleDeleteNoti(collection?.id)}
              >
                Decline
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default NotiUnit;
