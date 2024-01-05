function pullUserFromLocal() {
  let userFromStorage = localStorage.getItem("user");
  let storedUser = JSON.parse(userFromStorage);
  return storedUser;
}

function checkFriendsAgainstArr(targetId, friendsArr) {
  return !!friendsArr.find((element) => element.user_id === targetId);
}

function checkIfFriendRequest(id, targetArr) {
  let result = !!targetArr.find(
    (item) => item.sender_id === id && item.msg_type === "request"
  );

  return result;
}
export { pullUserFromLocal, checkFriendsAgainstArr, checkIfFriendRequest };
