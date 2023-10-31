// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const Url = "http://localhost:8080";

// function FriendsWishlist() {
//   const { id } = useParams();

//   const [wishlist, setWishlist] = useState([]);

//   const navigate = useNavigate;

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     try {
//       let result = await axios.get(Url / example);

//       console.log(result);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }
// export default FriendsWishlist;
