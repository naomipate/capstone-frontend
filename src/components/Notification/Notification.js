import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotificationById } from "../API/API";
import "./Notification.css";
function Notification() {
  const [notiData, setNotiData] = useState([]);
  const { id } = useParams();
  const [show, setSetShow] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  async function fetchData() {
    try {
      let result = await getNotificationById(id);
      setNotiData(result);
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
        <span className="notiBadge">{notiData.length}</span>
        <div className={`dropdownContent ${show ? "show" : ""}`}>
          <ul className="ContentList">
            {notiData.map((item) => {
              return (
                <li className="dropdownItem" key={item.id}>
                  <p>
                    {`${item?.sender_name}: ${item?.messages}`}
                    {/* <span>✅</span>
                    <span>❌</span> */}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Notification;
