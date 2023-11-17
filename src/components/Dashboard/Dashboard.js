   /* eslint-disable padded-blocks */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      console.log(id, "Dashboard");
      let response = await getUserProfile(id);
      console.log(response.data);
      setUser(response.data);
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

  let sortedFriends = user?.friendsOrderedByDOB?.sort((a, b) => {
    return a.dobInMili - b.dobInMili;
  });

  console.log("Sorted Friends: ", sortedFriends);

  let friendsList = sortedFriends?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} />;
  });

  return (
    <div className="dashboard-container">
      <div>Dashboard</div>
      {friendsList}
    </div>
  );
}

function Friend({ friendDetails }) {
  let { first_name, last_name, dob, wishlist } = friendDetails;
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
    <div className="friend-card">
      <div className="friend-details">
        <div className="friend-avatar-name">
          <Avatar />
          <div className="friend-name">
            {first_name} {last_name}{" "}
          </div>
        </div>

        <div className="friend-dob">{upcomingDate}</div>
      </div>
      <ul className="wishlist-items">{wishlistItem}</ul>
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

export default Dashboard;
