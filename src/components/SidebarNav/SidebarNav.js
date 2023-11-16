import React from "react";
// import Axios from "../API/Axios";
// import { useParams, useNavigate } from "react-router-dom";

function SidebarNav() {
  // const [user, setUser] = useState({});
  // const navigate = useNavigate();

  // const { id } = useParams();
  // useEffect(() => {
  //   fetchData(id);
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     let response = await Axios.get(`/dashboard/${id}`);
  //     console.log(response.data);
  //     setUser(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <div>Sidebar Nav</div>
      <div>Number of friends and link to friends list</div>
      <div>Notifications</div>
      <div>Wishlist</div>
    </div>
  );
}

export default SidebarNav;
