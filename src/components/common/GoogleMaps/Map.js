import React, { useState, useCallback, useRef } from "react";
import "./Map.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

//Icons imports
import { FaLocationArrow } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const containerStyle = {
  width: "70%",
  height: "400px",
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};
// const centerAlt = {
//   lat: 42.748817,
//   lng: -74.985428,
// };
function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [Distance, setDistance] = useState("");
  const [Duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRed = useRef();

  return (
    <>
      {isLoaded ? (
        <>
          <div className="mapContainer">
            <div className="__controls">
              <form className="__userInput">
                <label>Distance</label>
                <Autocomplete>
                  <input className="__inputs" type="text" />
                </Autocomplete>
                <label>Duration</label>
                <Autocomplete>
                  <input className="__inputs" type="text" />
                </Autocomplete>
                <button className="__submit" type="submit">
                  Calculate Route
                </button>
                <button className="__clear" type="button">
                  <ImCross />
                </button>
              </form>
              <button className="__recenter" onClick={() => map.panTo(center)}>
                <FaLocationArrow />
              </button>
            </div>
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={containerStyle}
              mapContainerClassName="mapComp"
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {/* <Marker position={centerAlt} />  You can map through an array of marker components*/}

              <></>
            </GoogleMap>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Map;
