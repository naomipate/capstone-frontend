import React, { useEffect, useState, useContext } from "react";
import "./NotificationPage.css";
import { getNotificationById, deleteNotification } from "../API/API";
import { toast } from "react-toastify";
import NotiUnit from "./NotiUnit/NotiUnit";
import { NotificationContext } from "../common/context/context";
import { pullUserFromLocal } from "../common/FunctionsLibrary";

function NotificationPage() {
  const {
    // NotificationsData,
    // toggleUpdate,
    setNotificationsData,
    // setToggleUpdate,
  } = useContext(NotificationContext);
  // let currentDate = new Date(Date.now());
  const [notiData, setNotiData] = useState([]);
  const [toggleActive, setToggleActive] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortCheck, setSortCheck] = useState(true);
  useEffect(() => {
    let storedUser = pullUserFromLocal();
    fetchData(storedUser?.id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    //if toggleActive = false (Show all notifications)
    if (notiData.length !== 0) {
      if (!toggleActive) {
        setFilterData(notiData);
      } else {
        let format = notiData.filter((item) => item.is_read === false);
        format = sortByDate(format, sortCheck);
        setFilterData(format);
      }
    }
    //if toggleActive = true (Show unread messages)
    // eslint-disable-next-line
  }, [toggleActive]);

  useEffect(() => {
    if (search !== "") {
      let format = filterData.filter((item) => {
        let localMsg = item.messages.toLowerCase();
        return localMsg.includes(search);
      });
      format = sortByDate(format, sortCheck);

      setFilterData(format);
    } else {
      setFilterData(notiData);
    }

    // eslint-disable-next-line
  }, [search]);

  function sortByDate(arr, order) {
    if (order) {
      return arr.sort((a, b) => {
        let dateA = new Date(a.date_stamp);
        let dateB = new Date(b.date_stamp);
        return dateA - dateB;
      });
    } else {
      return arr.sort((a, b) => {
        let dateA = new Date(a.date_stamp);
        let dateB = new Date(b.date_stamp);
        return dateB - dateA;
      });
    }
  }

  async function fetchData(id) {
    try {
      let result = await getNotificationById(id);
      if (result.length !== 0) {
        if (result?.response) {
          setNotiData([]);
        }
        let formatOrder = sortByDate(result, sortCheck);
        setNotificationsData(formatOrder);
        setNotiData(formatOrder);
        setFilterData(formatOrder);
      } else {
        toast.info("No new notifications", toast.POSITION.TOP_CENTER);
      }
    } catch (error) {
      toast.error("Something Went Wrong", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }

  async function handleDeleteNoti(id) {
    try {
      await deleteNotification(id);
      let filterdNoti = notiData.filter((item) => item.id !== id);
      setNotificationsData(filterdNoti);
      setNotiData(filterdNoti);
    } catch (error) {
      toast.error("Something Went Wrong", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }

  return (
    <div className="noti__Container">
      <h1 className="__title">Notifications</h1>
      <div className="__functionals">
        <div className="__group">
          <button
            className={`__btn ${!toggleActive ? "active" : ""}`}
            onClick={() => setToggleActive(!toggleActive)}
          >
            All
          </button>
          <button
            className={`__btn ${toggleActive ? "active" : ""}`}
            onClick={() => setToggleActive(!toggleActive)}
          >
            Unread
          </button>
        </div>
        <input
          className="__search"
          type="text"
          placeholder="filter by message"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <select className="__sort" onChange={(e) => setSortCheck(!sortCheck)}>
          <option value={"Ascending"}>Ascending</option>
          <option value={"Descending"}>Descending</option>
        </select>
      </div>
      <div className="__content">
        <>
          {notiData.length === 0 ? (
            <div>No Notifications</div>
          ) : (
            <>
              {toggleActive || search !== "" ? (
                <>
                  {filterData.map((item) => {
                    return (
                      <NotiUnit
                        data={item}
                        key={item.id}
                        handleDeleteNoti={handleDeleteNoti}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {notiData.map((item) => {
                    return (
                      <NotiUnit
                        data={item}
                        key={item.id}
                        handleDeleteNoti={handleDeleteNoti}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default NotificationPage;
