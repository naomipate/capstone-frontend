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
    let result = await Axios.get(`/users/find-email?email=${email}`);
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

export { createUser, getUserData, getAllUsersAPI };
