/* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../API/API";
import Giftune from "../../Assets/GituneLogoImage.png";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});

  const { id } = useParams();
  useEffect(() => {
    fetchData();
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

  function calculateZodiacSign(dob) {
    let zodiacLookUp = {
      capricorn: { start: "12-22", end: "01-19" },
      aquarius: { start: "01-20", end: "02-18" },
      pisces: { start: "02-19", end: "03-20" },
      aries: { start: "03-21", end: "04-19" },
      taurus: { start: "04-20", end: "05-20" },
      gemini: { start: "05-21", end: "06-20" },
      cancer: { start: "06-21", end: "07-22" },
      leo: { start: "07-23", end: "08-22" },
      virgo: { start: "08-23", end: "09-22" },
      libra: { start: "09-23", end: "10-22" },
      scorpio: { start: "10-23", end: "11-21" },
      sagittarius: { start: "11-22", end: "12-21" },
    };

    // Convert the dob to the current year for comparison
    let dobDate = new Date(dob);
    let currentDate = new Date();
    dobDate.setFullYear(currentDate.getFullYear());
    let dobInMili = dobDate.getTime();

    for (let zodiac in zodiacLookUp) {
      let { start, end } = zodiacLookUp[zodiac];

      if (dobInMili >= start && dobInMili <= end) {
        return zodiac;
      }
    }

    return "Unknown zodiac sign";
  }

  user?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
    console.log(calculateZodiacSign(friend.dobInMili));
  });

  let friendsList = user?.friendsOrderedByDOB?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} id={id} />;
  });

  return <div className="dashboard-container">{friendsList}</div>;
}

function Friend({ friendDetails, id }) {
  console.log(friendDetails);
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
            <p className="dashboard-card-name">
              {first_name} {last_name}{" "}
            </p>
          </div>
          <p className="dashboard-card-text">{upcomingDate}</p>
        </div>
      </Link>
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

export default Dashboard;
