import Alert from "../../common/AlertModal/Alert";
import React, { useState } from "react";

function EditableUserProfile({ user }) {
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  return <div className="user-profile"></div>;
}

export default EditableUserProfile;
