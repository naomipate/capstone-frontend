import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import MarketPageGifts from "../../Assets/MarketPageGifts.svg";
import GiftuneLogo from "../../Assets/GiftuneLogo.png";
function Home() {
  return (
    <div className="home">
      {/* <div className="hero">
        <img
          alt="heroLogo"
          src={GiftuneLogo}
          height={"200px"}
          width={"200px"}
        />
        <h2 className="hero-text">
          Where heartfelt gifting meets perfect harmony
        </h2>
      </div> */}

      <div class="hero-image">
        <div class="hero-text">
          <h1>Welcome to Giftune!</h1>
          <p>An app designed to keep you on top of your loved ones upcoming
          birthdays, where you can effortlessly select the perfect gift from a
          diverse array of options.</p>
          <Link><button>Take Me Somewhere!</button></Link>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
