import React, { useEffect, useState } from "react";
import Axios from "../API/Axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    fetchData(id);
  }, []);

  const fetchData = async () => {
    try {
      let response = await Axios.get(`/dashboard/${id}`);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  let friendsList = user?.friendsOrderedByDOB?.map((friendDetails, index) => {
    return <Friend key={index} friendDetails={friendDetails} />;
  });
  console.log(user, user.friendsOrderedByDOB);
  return (
    <div className="dashboard-container">
      <div>Dashboard</div>
      <UserDetails userDetails={user.userProfile} />
      {friendsList}
      <Sidebar />
    </div>
  );
}

function UserDetails({ userDetails }) {
  let { first_name, last_name, dob } = userDetails;
  let date = new Date(dob);
  return (
    <div>
      <div>
        <h3>
          {first_name} {last_name}
        </h3>
        <p>{date.toLocaleDateString()}</p>
      </div>
      <Avatar />
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

function Friend({ friendDetails }) {
  let { first_name, last_name, dob, wishlist } = friendDetails;
  let date = new Date(dob);
  let wishlistItem = wishlist.map((item, index) => (
    <li key={index}>{item.item_name}</li>
  ));
  return (
    <div className="friend-card">
      <div>
        {first_name} {last_name} {date.toLocaleDateString()}
      </div>
      <ul>{wishlistItem}</ul>
    </div>
  );
}

export default Dashboard;
