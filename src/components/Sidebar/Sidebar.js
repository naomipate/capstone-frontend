import React, { useEffect, useState } from "react";
import Axios from "../API/Axios";
import { useParams, useNavigate } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";

function Sidebar() {
  //   const [user, setUser] = useState({});
  //   const navigate = useNavigate();

  //   const { id } = useParams();
  //   useEffect(() => {
  //     fetchData(id);
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       let response = await Axios.get(`/dashboard/${id}`);
  //       console.log(response.data);
  //       setUser(response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div>
      <div>Sidebar</div>
      {/* {user.userProfile && <UserDetails userDetails={user?.userProfile} />} */}
      <SidebarNav />
    </div>
  );
}

// function UserDetails({ userDetails }) {
//   console.log(userDetails);
//   let { first_name, last_name, dob } = userDetails;
//   let date = new Date(dob);
//   return (
//     <div>
//       <div>
//         <h3>
//           {first_name} {last_name}
//         </h3>
//         <p>
//           {date.getMonth()} {date.getFullYear()}
//         </p>
//       </div>
//     </div>
//   );
// }

export default Sidebar;
