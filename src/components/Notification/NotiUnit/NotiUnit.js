import React, { useState, useEffect } from "react";
import "./NotiUnit.css";

function NotiUnit({ data }) {
  const [formatDate, setFormatDate] = useState("");
  useEffect(() => {
    dateParser(data.date_stamp);
    // eslint-disable-next-line
  }, []);

  function dateParser(inputDate) {
    const dateObject = new Date(inputDate);
    const options = { month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    setFormatDate(formattedDate);
  }
  return (
    <div key={data.id} className="__noti">
      <input type="checkbox"></input>
      <p>{data.messages}</p>
      <p>{data.sender_name}</p>
      <p>{formatDate}</p>
    </div>
  );
}

export default NotiUnit;
