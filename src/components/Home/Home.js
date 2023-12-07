import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import GiftsAmico from "../../Assets/Gifts-amico.png";
import couch from "../../Assets/couch.png";
import calender from "../../Assets/calender.png";

function Home() {
  return (
    <div className="home">
      <div className="hero-image">
        {/* <img className="hero-image" src={torn} alt="gift pic" /> */}
        <div className="hero-text">
          <h1>Welcome to Giftune!</h1>
          <p>
            An app designed to keep you on top of your loved ones upcoming
            birthdays, where you can effortlessly select the perfect gift from a
            diverse array of options.
          </p>
          <Link to={`/signup`}>
            <button>Sign Me Up</button>
          </Link>
        </div>
      </div>

      <div className="blockquote">
        <p>"Where heartfelt gifting meets perfect harmony"</p>
      </div>

      <div className="content">
        <div className="">
          <p className="text-content">
          Never miss your loved one's special day. Easily keep track of upcoming birthdays and pick out the perfect gift hassle-free.
          </p>
        </div>
        <div className="image-container">
          <img className="image" src={calender} alt="gift pic" />
        </div>
      </div>
      <div className="content">
      <div className="image-container">
          <img className="image" src={couch} alt="gift pic" />
        </div>
        <div className="">
          <p className="text-content">
            No more unwanted gifts that keep piling up. Giftune relieves the tension within families and relationships.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;
