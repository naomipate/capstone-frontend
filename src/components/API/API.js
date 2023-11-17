import Axios from "./Axios";

async function createUser(data) {
  try {
    let result = await Axios.post("/user", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function getUserData(email) {
  try {
    console.log(email);
    let result = await Axios.post(`/users/find-email`, { email: email });
    return result;
  } catch (error) {
    return error;
  }
}

async function getAllUsersAPI() {
  try {
    let result = await Axios.get("/users");
    return result;
  } catch (e) {
    return e;
  }
}
async function getUserProfile(id) {
  console.log(id, "API");
  try {
    let result = await Axios.get(`/dashboard/${id}`);
    return result;
  } catch (e) {
    return e;
  }
}

async function getAllFriendsFromUser(id) {
  try {
    let result = await Axios.get(`/dashboard/${id}/friends`);
    return result;
  } catch (e) {
    return e;
  }
}

//Queries need to be thought out
// async function getFriendsWishlist(id) {
//   try {
//     let result = await Axios.get(`/dashboard/${id}/friends/`, id);
//     return result;
//   } catch (e) {
//     return e;
//   }
// }

async function getNotificationById(id) {
  try {
    let result = await Axios.get(`/notification/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
}
async function newNotification(data) {
  try {
    let result = await Axios.post(`/notification/new-notification`, data);
    return result.data;
  } catch (error) {
    return error;
  }
}
async function deleteNotification(id) {
  try {
    let result = await Axios.delete(`/notification/${id}`);
    return result;
  } catch (error) {
    return error;
  }
}

export {
  createUser,
  getUserData,
  getAllUsersAPI,
  getAllFriendsFromUser,
  // getFriendsWishlist,
  getUserProfile,
  getNotificationById,
  newNotification,
  deleteNotification,
};
