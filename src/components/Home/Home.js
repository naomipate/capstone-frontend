import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import GiftsAmico from "../../Assets/Gifts-amico.png";

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


      <div className="blockquote">
        <p>"Where heartfelt gifting meets perfect harmony"</p>
      </div>

      <div className="content">
        <div className="">
          <p className="text-content">
            Why do we use it?
            It is a long established fact that a reader will be distracted by 
            the readable content of a page when looking at its layout. 
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
            as opposed to using 'Content here, content here', making it look like readable English. 
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
            and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>

        <div className="image-container">
          <img className="image" src={GiftsAmico} alt="gift pic"/>
        </div>
      </div>

    </div>
  );
}

export default Home;
