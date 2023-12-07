/* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../API/API";
import Giftune from "../../Assets/GituneLogoImage.png";
import "./Dashboard.css";

function Dashboard() {
  
  const [user, setUser] = useState({});
  const [time, setTime] = useState(null);
  const [dayNameVisual, setDayName] = useState(null);
  const [dayNumVisual, setDayNum] = useState(null);
  const [monthVisual, setMonth] = useState(null);
  const [yearVisual, setYear] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  async function fetchData() {
    try {
      let response = await getUserProfile(id);
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
      console.log(calculateZodiacSign(upcomingDateWithNextYear));

      return upcomingDateWithNextYear.getTime();
    }
  };
  user?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
  });

  let friendsList = user?.friendsOrderedByDOB?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} id={id} />;
  });

  return <div className="dashboard-container">{friendsList}</div>;
}

function calculateZodiacSign(dob) {
  let zodiacLookUp = {
    capricorn: { start: "2022-12-22", end: "2023-01-19" },
    aquarius: { start: "2023-01-20", end: "2023-02-18" },
    pisces: { start: "2023-02-19", end: "2023-03-20" },
    aries: { start: "2023-03-21", end: "2023-04-19" },
    taurus: { start: "2023-04-20", end: "2023-05-20" },
    gemini: { start: "2023-05-21", end: "2023-06-20" },
    cancer: { start: "2023-06-21", end: "2023-07-22" },
    leo: { start: "2023-07-23", end: "2023-08-22" },
    virgo: { start: "2023-08-23", end: "2023-09-22" },
    libra: { start: "2023-09-23", end: "2023-10-22" },
    scorpio: { start: "2023-10-23", end: "2023-11-21" },
    sagittarius: { start: "2023-11-22", end: "2023-12-21" },
  };

  let dobInMili = new Date(dob).getTime();
  console.log(dobInMili);

  for (let zodiac in zodiacLookUp) {
    let start = new Date(zodiacLookUp[zodiac].start).getTime();
    let end = new Date(zodiacLookUp[zodiac].end).getTime();

    if (dobInMili >= start && dobInMili <= end) {
      return zodiac;
    }
  }

  // Handles the case where the date falls outside the provided ranges
  return "Unknown zodiac sign";
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

export default Dashboard;
