import React, { useState } from "react";
import "./Search.css";
// import { getUserByName } from "../API/API";
// import { SearchList } from "./SearchList"
import SearchList from "./SearchList";

function Search() {

  // const API_URL = process.env.REACT_APP_API_URL;
  // const[ input, setInput] = useState("")
  // const[ results, setResults] = useState("")

  // console.log(API_URL);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   try {
  //     let result = await getUserByName();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handleChange = (value) => {
  //   setInput(value)
  //   fetchData(value)
  // }

  return (
    <div className="search-page">
      <div className="search-page-container">
        <div className="search-page-content">
          <div className="search-page-title">
            <p> Find Your Friend</p>
          </div>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              // value={input}
              // onChange={(e) => handleChange(e.target.value)}
            ></input>

            <button className="search-button">
              <img
                class="search-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                src="./images/search-icon.png"
                alt="Magnifying glass"
              />
            </button>
            <div></div>
          </div>
          <div className="search-page-results">
            <SearchList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
