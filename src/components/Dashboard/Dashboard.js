/* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../API/API";
import Giftune from "../../Assets/GituneLogoImage.png";
import "./Dashboard.css";

function Dashboard() {
  
  const [user, setUser] = useState({});
  const [dayNameVisual, setDayName] = useState(null);
  const [dayNumVisual, setDayNum] = useState(null);
  const [monthVisual, setMonth] = useState(null);
  const [yearVisual, setYear] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    fetchData();
    updateDate();
  }, [id]);

  async function fetchData() {
    try {
      // console.log(id, "Dashboard");
      let response = await getUserProfile(id);
      // console.log(response.data);
      setUser(response.data);
      console.log(response.data.friendsOrderedByDOB);
    } catch (error) {
      console.log(error);
    }
  }

  // Sorting DOB by positive/negative where we subtract the current date from an upcoming date
  const upcomingDateCalc = (dob) => {
    // Now: Calc the current time.
    let currentDate = new Date(Date.now());
    // DOB date
    let date = new Date(dob);
    // UpcomingDOBDate: calc dates with current year attached.
    let upcomingDateWithCurrentYear = new Date(
      date.setFullYear(currentDate.getFullYear())
    );
    // UpcomingDate - now = Time before each date.
    let upcomingDateDiff = upcomingDateWithCurrentYear - currentDate;
    // Sort by this ^^^^^
    if (upcomingDateDiff > 0) {
      // positive is in the current year
      return upcomingDateWithCurrentYear.getTime();
    } else {
      // negative is next year
      let upcomingDateWithNextYear = new Date(
        date.setFullYear(currentDate.getFullYear() + 1)
      );
      return upcomingDateWithNextYear.getTime();
    }
  };
  user?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
  });

  let friendsList = user?.friendsOrderedByDOB?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} id={id} />;
  });

  // Date
  function updateDate() {
    let today = new Date();

    // return number
    let dayName = today.getDay(),
      dayNum = today.getDate(),
      month = today.getMonth(),
      year = today.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    setDayName(dayWeek[dayName]);
    setDayNum(dayNum);
    setMonth(months[month]);
    setYear(year);
  }

  return (
    <div className="dashboard-container">
      <div class="card">
        <div class="card__content">
          <div className="dashboard-date-container">
            <div className="display-date">
              <p className="todays-date-heading">Today's Date</p>
              <hr className="dashboard-hr"/>
              <span id="daynum">{dayNumVisual}</span>
              <div className="bottom-date-card">
                <div id="day">{dayNameVisual}</div>
                {"  "}
                <div className="month-and-year">
                <div id="month">{monthVisual}</div>
                <div id="year">{yearVisual}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
      </div>
      <div className="dashboard-main-section">
        <p className="dashboard-heading">Upcoming Dates</p>
        {friendsList}
      </div>
    
    </div>
  );
}

function Friend({ friendDetails, id }) {
  // console.log(friendDetails);
  let { first_name, last_name, wishlist, user_name, dob } = friendDetails;
  let wishlistItem = wishlist.map((item, index) => (
    <li key={index}>
      <img id="giftune-wishlist-item-logo" src={Giftune} alt="Giftune" />
      <a href={item.link}>{item.item_name}</a>
    </li>
  ));

  let upcomingDate = new Date(dob)
    .toDateString()
    .split(" ")
    .splice(1, 2)
    .join(" ");
  return (
    <div className="dashboard-friend-card-container">
      <Link
        to={`/dashboard/${id}/friends/${wishlist[0].user_id}`}
        className="friend-list-link"
      >
        <div className="dashboard-friend-card-top">
          <div className="dashboard-friend-card-left">
            <div className="dashboard-img-placeholder"></div>
            <p className="dashboard-card-name">{user_name}</p>
          </div>
          <p className="dashboard-card-text">{upcomingDate}</p>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
