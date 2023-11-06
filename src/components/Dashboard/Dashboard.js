import React from "react";

function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
      <Sidebar />
      <Friends />
    </div>
  );
}

function Sidebar() {
  return (
    <div>
      <div>Sidebar</div>
      <UserDetails />
      <SidebarNav />
    </div>
  );
}

function UserDetails() {
  return (
    <div>
      <div>User Details</div>
      <Avatar />
    </div>
  );
}

function Avatar() {
  return <div>Avatar</div>;
}

function SidebarNav() {
  return <div>Sidebar Nav</div>;
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
