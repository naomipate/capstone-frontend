import React from "react";
import "./DateCard.css";

function DateCard() {
  let currentDate = new Date(Date.now()); // Time from system

  let currentDateDayName = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    }), // Full Day name from time
    currentDateDayNum = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
    }), // Numeric day from time
    currentDateMonth = currentDate.toLocaleDateString("en-US", {
      month: "long",
    }), // Full Month name from time
    currentDateYear = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
    }); // Full Year from time

  return (
    <div className="card">
      <div className="card__content">
        <div className="dashboard-date-container">
          <div className="display-date">
            <p className="todays-date-heading">Today's Date</p>
            <hr className="dashboard-hr" />
            <span id="daynum">{currentDateDayNum}</span>
            <div className="bottom-date-card">
              <div id="day">{currentDateDayName}</div>
              <div className="month-and-year">
                <div id="month">{currentDateMonth}</div>
                <div id="year">{currentDateYear}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blob"></div>
      <div className="blob"></div>
      <div className="blob"></div>
      <div className="blob"></div>
    </div>
  );
}

export default DateCard;
