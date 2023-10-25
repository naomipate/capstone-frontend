import React, { useState, useEffect } from "react";
import axios from "axios";

function Example() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [exampleData, setExampleData] = useState([]);

  console.log(API_URL);

  useEffect(() => {
    //fetchData();
  }, []);

  //   async function fetchData() {
  //     // We reach out to our .env file to get the API URL
  //     // We use the "REACT_APP_" prefix to make sure that our variables are available in the frontend
  //     const response = await axios.get(`${API_URL}/example`);

  //     // We set the data from the response to our "exampleData" state
  //     setExampleData(response.data);
  //   }

  return (
    <div className="App">
      {exampleData.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Example;
