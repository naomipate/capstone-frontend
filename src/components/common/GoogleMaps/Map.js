import React, { useState, useCallback } from "react";
import "./Map.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

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
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ null);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={containerStyle}
          mapContainerClassName="mapContainer"
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {/* <Marker position={centerAlt} />  You can map through an array of marker components*/}

          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default Map;
