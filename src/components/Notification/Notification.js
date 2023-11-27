import React, { useEffect, useState } from "react";
import { getNotificationById, deleteNotification } from "../API/API";
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
      setNotiData(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteNoti(id) {
    try {
      deleteNotification(id);
      let filterdNoti = notiData.filter((item) => item.id !== id);
      setNotiData(filterdNoti);
    } catch (error) {
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
          <ul className="ContentList">
            {notiData[0] ? (
              <>
                {notiData.map((item) => {
                  return (
                    <li className="dropdownItem" key={item.id}>
                      <p>
                        {`${item?.sender_name}: ${item?.messages}`}
                        <button className="btnAccept">✅</button>
                        <button
                          className="btnDecline"
                          type="button"
                          onClick={() => handleDeleteNoti(item.id)}
                        >
                          ❌
                        </button>
                      </p>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <li className="dropdownItem">No new Notification</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Notification;
