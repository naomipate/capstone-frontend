import React, { useEffect, useState } from "react";
import Axios from "../API/Axios";
import { useParams, useNavigate } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";

function Sidebar() {
  return (
    <div>
      <div>Sidebar</div>
      {/* <UserDetails /> */}
      <SidebarNav />
    </div>
  );
}

export default Sidebar;
