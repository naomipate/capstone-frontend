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
      console.log(response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div>Dashboard{console.log(user, user.connections)}</div>
      <Friends connections={user.connections} />
      <Sidebar />
    </div>
  );
}

function UserDetails({ userDetails }) {
  return (
    <div>
      <div>
        <h3>{userDetails.user_name}</h3>
        <p>{userDetails.dob}</p>
      </div>
      <Avatar />
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

function Friends() {
  return (
    <div>
      <div>Friends</div>
      <Friend />
      <Friend />
      <Friend />
    </div>
  );
}

function Friend() {
  return (
    <div>
      <div>Friend</div>
      <List />
    </div>
  );
}

function List() {
  return (
    <div>
      <div>List</div>
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  );
}
function ListItem() {
  return <div>List Item</div>;
}

export default Dashboard;
