/* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../API/API";
import CalculateZodiacSign from "../common/Zodiac/CalculateZodiacSign";
import "./Dashboard.css";

function Dashboard({ user }) {
  let navigate = useNavigate();
  const [dashboardId, setDashboardId] = useState(user.id);
  const [dashboardUser, setDashboardUser] = useState({});
  let currentDate = new Date(Date.now()); // Time from system

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else {
    }
    fetchData();
    // eslint-disable-next-line
  }, [dashboardId]);

  async function fetchData() {
    try {
      setDashboardId(user.id);
      let response = await getUserProfile(dashboardId);
      setDashboardUser(response.data);
      console.log(dashboardUser.dob);
    } catch (error) {
      console.log(error);
    }
  }

  // Sorting DOB by positive/negative where we subtract the current date from an upcoming date
  const upcomingDateCalc = (dob) => {
    // DOB date
    let date = new Date(dob);
    let upcomingDateESTTimeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
    // UpcomingDOBDate: calc dates with current year attached.
    let upcomingDateWithCurrentYear = new Date(
      date.setFullYear(currentDate.getFullYear())
    );
    // UpcomingDate - now = Time before each date.
    let upcomingDateDiff = upcomingDateWithCurrentYear - currentDate;
    // Sort by this ^^^^^
    if (upcomingDateDiff > 0) {
      // positive is in the current year
      return upcomingDateWithCurrentYear.setTime(
        upcomingDateWithCurrentYear.getTime() + upcomingDateESTTimeZoneOffset
      );
    } else {
      // negative is next year
      let upcomingDateWithNextYear = new Date(
        date.setFullYear(currentDate.getFullYear() + 1)
      );
      return upcomingDateWithNextYear.setTime(
        upcomingDateWithNextYear.getTime() + upcomingDateESTTimeZoneOffset
      );
    }
  };

  const todayDateCard = () => {
    return (
        <div className="dashboard-container">
          <p className="dashboard-heading">Upcoming Birthdays</p>
          {friendsList}
        </div>
    );
  };

  dashboardUser?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
  });
  let sortedfriendList = dashboardUser?.friendsOrderedByDOB?.sort(
    (a, b) => a.dobInMili - b.dobInMili
  );

  let friendsList = sortedfriendList?.map((friendDetails, index) => {
    return (
      <Friend
        key={index}
        friendDetails={friendDetails}
        dashboardUserId={dashboardUser.id}
      />
    );
  });

  return <>{todayDateCard(currentDate)}</>;
}

function Friend({ friendDetails, dashboardUserId }) {
  let { first_name, last_name, wishlist, dobInMili } = friendDetails;
  // let wishlistItem = wishlist.map((item, index) => (
  //   <li key={index}>
  //     <img id="giftune-wishlist-item-logo" src={Giftune} alt="Giftune" />
  //     <a href={item.link}>{item.item_name}</a>
  //   </li>
  // ));
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
        to={`/dashboard/${dashboardUserId}/friends/${wishlist[0].user_id}`}
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
            {fullMonthOfUpcomingBirthday} {dayNumOfUpcomingBirthDay}{" "}
          </p>
          <p className="dashboard-card-text-zodiac">
            Zodiac: <CalculateZodiacSign dobInMili={dobInMili} />
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
