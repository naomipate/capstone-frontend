/* eslint-disable padded-blocks */
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../API/API";
import CalculateZodiacSign from "../common/Zodiac/CalculateZodiacSign";
import { FriendsContext } from "../common/context/context";
import "./Dashboard.css";

function Dashboard({ user }) {
  let navigate = useNavigate();
  const [dashboardId, setDashboardId] = useState(user.id);
  const [dashboardUser, setDashboardUser] = useState({});
  let currentDate = new Date(Date.now()); // Time from system
  const { setFriendsData } = useContext(FriendsContext);
  const currentMonthNum = currentDate.getMonth() + 1;
  const currentDayNum = currentDate.getDate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else {
    }
    fetchData();
    // eslint-disable-next-line
  }, [dashboardId]);

  async function fetchData() {
    try {
      setDashboardId(user?.id);
      let response = await getUserProfile(dashboardId);
      setDashboardUser(response.data);
      let dataShorthand = response.data.friendsOrderedByDOB;
      let formatFriends = dataShorthand.map(
        ({ id, user_name, first_name, last_name, dob, email }) => {
          return {
            id: id,
            user_name: user_name,
            first_name: first_name,
            last_name: last_name,
            dob: dob,
            email: email,
          };
        }
      );
      setFriendsData(formatFriends);
    } catch (error) {
      console.log(error);
    }
  }


  // Sorting DOB by positive/negative where we subtract the current date from an upcoming date
  const upcomingDateCalc = (dob) => {
    // DOB date
    let date = new Date(dob);
    let upcomingDateESTTimeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
    // UpcomingDOBDate: calc dates with current year attached.
    let upcomingDateWithCurrentYear = new Date(
      date.setFullYear(currentDate.getFullYear())
    );
    // UpcomingDate - now = Time before each date.
    let oneMiliBeforeTwentyFourHrs = 86399999;
    let upcomingDateDiff = upcomingDateWithCurrentYear - currentDate;
    // Sort by this ^^^^^
    if (upcomingDateDiff > 0) {
      // positive is in the current year
      upcomingDateWithCurrentYear.setTime(
        upcomingDateWithCurrentYear.getTime() +
          oneMiliBeforeTwentyFourHrs +
          upcomingDateESTTimeZoneOffset
      );
      console.log(upcomingDateWithCurrentYear);
      return upcomingDateWithCurrentYear;
      // return upcomingDateWithCurrentYear.setTime(
      //   upcomingDateWithCurrentYear.getTime() +
      //     oneMiliBeforeTwentyFourHrs +
      //     upcomingDateESTTimeZoneOffset
      // );
    } else {
      // negative is next year
      let upcomingDateWithNextYear = new Date(
        date.setFullYear(currentDate.getFullYear() + 1)
      );
      upcomingDateWithNextYear.setTime(
        upcomingDateWithNextYear.getTime() +
          oneMiliBeforeTwentyFourHrs +
          upcomingDateESTTimeZoneOffset
      );
      console.log(upcomingDateWithNextYear);
      return upcomingDateWithNextYear;
    }
  };

  const todayDateCard = () => {
    return (
        <div className="dashboard-container">
          <p className="dashboard-heading">Upcoming Birthdays</p>
          {friendsList}
        </div>
    );
  };

  dashboardUser?.friendsOrderedByDOB?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
  });
  let sortedfriendList = dashboardUser?.friendsOrderedByDOB?.sort(
    (a, b) => a.dobInMili - b.dobInMili
  );

  let friendsList = sortedfriendList?.map((friendDetails, index) => {
    return (
      <Friend
        key={index}
        friendDetails={friendDetails}
        dashboardUserId={dashboardId}
        currentMonthNum={currentMonthNum}
        currentDayNum={currentDayNum}
      />
    );
  });

  return <>{todayDateCard(currentDate)}</>;
}

function Friend({ friendDetails, dashboardUserId, currentMonthNum, currentDayNum}) {
  let { first_name, last_name, wishlist, dobInMili } = friendDetails;
  // let wishlistItem = wishlist.map((item, index) => (
  //   <li key={index}>
  //     <img id="giftune-wishlist-item-logo" src={Giftune} alt="Giftune" />
  //     <a href={item.link}>{item.item_name}</a>
  //   </li>
  // ));
  let dayNumOfUpcomingBirthDay = new Date(dobInMili).toLocaleDateString(
    "en-US",
    { day: "numeric" }
  );
  let fullMonthOfUpcomingBirthday = new Date(dobInMili).toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  );
  let fullMonthOfUpcomingBirthdayNum = new Date(dobInMili).toLocaleDateString(
    "en-US",
    {
      month: "numeric",
    }
  );


  function friendContentClassNames(){
    if(parseInt(fullMonthOfUpcomingBirthdayNum) === currentMonthNum && dayNumOfUpcomingBirthDay == currentDayNum){
      return "dashboard-friend-card-container-today"
    } else if (parseInt(fullMonthOfUpcomingBirthdayNum) === currentMonthNum){
      return "dashboard-friend-card-container-this-month"
    }else{
      return "dashboard-friend-card-container"
    }
  }


  return (
    <div className={friendContentClassNames()}>
      <Link
        to={`/dashboard/${dashboardUserId}/friends/${wishlist[0].user_id}`}
        className="friend-list-link"
      >
    <div className={ parseInt(fullMonthOfUpcomingBirthdayNum) === currentMonthNum 
      ? "dashboard-friend-card-content-this-month" : "dashboard-friend-card-content"}>
          <div className="dashboard-friend-card-left">
            <div className="dashboard-img-placeholder"></div>
            <p className="dashboard-card-name">
              {first_name} {last_name}{" "}
            </p>
          </div>
          <p className="dashboard-card-text">
            {fullMonthOfUpcomingBirthday} {dayNumOfUpcomingBirthDay}{" "}
          </p>
          <p className="dashboard-card-text-zodiac">
            Zodiac: <CalculateZodiacSign dobInMili={dobInMili} />
          </p>
        </div>
      </Link>
      </div>
  );
}

export default Dashboard;
