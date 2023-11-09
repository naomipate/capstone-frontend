import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../API/API";
import Sidebar from "../Sidebar/Sidebar";
// import Giftune from "../../Assets/GiftuneLogo2.png";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});

  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

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

  let friendsList = user?.friendsOrderedByDOB?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} />;
  });
  // console.log(user, user.friendsOrderedByDOB);
  return (
    <div className="dashboard-container">
      <div>Dashboard</div>
      {friendsList}
      <Sidebar />
    </div>
  );
}

function Friend({ friendDetails }) {
  let { first_name, last_name, dob, wishlist } = friendDetails;
  let date = new Date(dob);
  let upcomingDate = date.toDateString().split(" ").splice(1, 2).join(" ");
  let wishlistItem = wishlist.map((item, index) => (
    <li key={index}>
      <a href={item.link}>{item.item_name}</a>
    </li>
  ));
  return (
    <div className="friend-card">
      <Avatar />
      <div className="friend-name">
        {first_name} {last_name}{" "}
      </div>
      <div className="friend-dob">{upcomingDate}</div>
      <ul className="wishlist-items">
        <img />
        {wishlistItem}
      </ul>
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

export default Dashboard;
