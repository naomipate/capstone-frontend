import React, { useEffect } from "react";
// import Axios from "../API/Axios";
// import { useParams, useNavigate } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";

function Sidebar() {
  return (
    <>
      <SidebarNav />
    </>
  );
}

// function UserDetails({ userDetails }) {
//   console.log(userDetails);
//   let { first_name, last_name, dob } = userDetails;
//   let date = new Date(dob).toDateString().split(" ").splice(1, 2).join(" ");
//   return (
//     <div>
//       <div>
//         <h3>
//           {first_name} {last_name}
//         </h3>
//         <p>{date}</p>
//       </div>
//     </div>
//   );
// }

export default Sidebar;
