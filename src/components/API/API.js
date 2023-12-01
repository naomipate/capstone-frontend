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

async function getFriendsAndTheirWishlists(id, friendId) {
  try {
    let result = await Axios.get(
      `/dashboard/${id}/friends/${friendId}`,
      id,
      friendId
    );
    return result;
  } catch (e) {
    return e;
  }
}
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
    return result.data;
  } catch (error) {
    return error;
  }
}
async function deleteFriend(id, friendId) {
  try {
    let result = await Axios.delete(`/dashboard/${id}/friends/${friendId}`);
    return result.data;
  } catch (error) {
    return error;
  }
}
async function updateItemBoughtByItemId( itemId, is_bought) {
  console.log("is bought on api call", is_bought);
  try {
    let result = await Axios.put(`/dashboard/item-details`, {id:itemId, is_bought:is_bought} );
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
}

export {
  createUser,
  getUserData,
  getAllUsersAPI,
  getAllFriendsFromUser,
  getFriendsAndTheirWishlists,
  getUserProfile,
  getNotificationById,
  newNotification,
  deleteNotification,
  deleteFriend,
  updateItemBoughtByItemId
};
