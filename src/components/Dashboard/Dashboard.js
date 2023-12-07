/* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../API/API";
import Giftune from "../../Assets/GituneLogoImage.png";
import CalculateZodiacSign from "../common/Zodiac/CalculateZodiacSign";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});
  let currentDate = new Date(Date.now()); // Time from system

  const { id } = useParams();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  async function fetchData() {
    try {
      let response = await getUserProfile(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  // Sorting DOB by positive/negative where we subtract the current date from an upcoming date
  const upcomingDateCalc = (dob) => {
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

  const todayDateCard = (currentDate) => {
    // ---------------------------------------Date for card
    let currentDateDayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      }), // Full Day name from time
      currentDateDayNum = currentDate.toLocaleDateString("en-US", {
        day: "numeric",
      }), // Numeric day from time
      currentDateMonth = currentDate.toLocaleDateString("en-US", {
        month: "long",
      }), // Full Month name from time
      currentDateYear = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
      }); // Full Year from time

      
    return (
      <div className="dashboard-container">
      <div class="card">
        <div class="card__content">
          <div className="dashboard-date-container">
          <div className="display-date">
                <p className="todays-date-heading">Today's Date</p>
                <hr className="dashboard-hr" />
                <span id="daynum">{currentDateDayNum}</span>
                <div className="bottom-date-card">
                  <div id="day">{currentDateDayName}</div>
                  {"  "}
                  <div className="month-and-year">
                    <div id="month">{currentDateMonth}</div>
                    <div id="year">{currentDateYear}</div>
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
  };

  user?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
  });
  let sortedfriendList = user?.friendsOrderedByDOB?.sort(
    (a, b) => a.dobInMili - b.dobInMili
  );

  let friendsList = sortedfriendList?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} id={id} />;
  });

  return (
    <div>
      {todayDateCard(currentDate)}
    </div>
  );
}

function Friend({ friendDetails, id }) {
  let { first_name, last_name, wishlist, dobInMili } = friendDetails;
  let wishlistItem = wishlist.map((item, index) => (
    <li key={index}>
      <img id="giftune-wishlist-item-logo" src={Giftune} alt="Giftune" />
      <a href={item.link}>{item.item_name}</a>
    </li>
  ));

  let dayNumOfUpcomingBirthDay = new Date(dobInMili).toLocaleDateString(
    "en-US",
    { day: "numeric" }
  );

  let fullMonthOfUpcomingBirthday = new Date(dobInMili).toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  );

  return (
    <div className="dashboard-friend-card-container">
      <Link
        to={`/dashboard/${id}/friends/${wishlist[0].user_id}`}
        className="friend-list-link"
      >
        <div className="dashboard-friend-card-top">
          <div className="dashboard-friend-card-left">
            <div className="dashboard-img-placeholder"></div>
            <p className="dashboard-card-name">
              {first_name} {last_name}{" "}
            </p>
          </div>
          <p className="dashboard-card-text">
            {fullMonthOfUpcomingBirthday} {dayNumOfUpcomingBirthDay}
          </p>
          <CalculateZodiacSign dobInMili={dobInMili} />
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;