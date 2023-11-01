import Axios from "./Axios";

async function createUser(data) {
  try {
    let result = await Axios.post("/user", data);
    return result;
  } catch (error) {
    return error;
  }
}

export { createUser };
