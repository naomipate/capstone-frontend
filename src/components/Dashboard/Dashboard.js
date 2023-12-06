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
      console.log(upcomingDateWithCurrentYear);
      return upcomingDateWithCurrentYear.getTime();
    } else {
      // negative is next year
      let upcomingDateWithNextYear = new Date(
        date.setFullYear(currentDate.getFullYear() + 1)
      );

      return upcomingDateWithNextYear.getTime();
    }
  };

  function calculateZodiacSign(dobInMili) {
    let dobDate = new Date(dobInMili);
    const days = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const signs = [
      "Aquarius",
      "Pisces",
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
    ];
    let month = dobDate.getMonth();
    let day = dobDate.getDate();
    if (month == 0 && day <= 19) {
      month = 11;
    } else if (day < days[month]) {
      month--;
    }
    return signs[month];
  }

  user?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
    friend.zodiac = calculateZodiacSign(friend.dobInMili);
  });

  let friendsList = user?.friendsOrderedByDOB?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} id={id} />;
  });

  return <div className="dashboard-container">{friendsList}</div>;
}

function Friend({ friendDetails, id }) {
  console.log(friendDetails);
  let { first_name, last_name, wishlist, dobInMili, zodiac } = friendDetails;
  let wishlistItem = wishlist.map((item, index) => (
    <li key={index}>
      <img id="giftune-wishlist-item-logo" src={Giftune} alt="Giftune" />
      <a href={item.link}>{item.item_name}</a>
    </li>
  ));

  let upcomingBirthDate = new Date(dobInMili)
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
          <p className="dashboard-card-text">{upcomingBirthDate}</p>
          <p>{zodiac}</p>
          {wishlistItem}
        </div>
      </Link>
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

export default Dashboard;
