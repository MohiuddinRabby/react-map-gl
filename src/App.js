import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import * as parkData from "./data.json";
import icon from "./img/icon.svg";
import key from "./key";
function App() {
  const [viewPort, setViewport] = useState({
    width: "90vw",
    height: "80vh",
    latitude: 23.7639342,
    longitude: 90.3987141,
    zoom: 10,
  });
  const [parkName, setParkName] = useState(null);
  return (
    <div>
      <h1>map</h1>
      <ReactMapGL
        {...viewPort}
        mapStyle="mapbox://styles/xosef/ckevgnysoaztk19p9v7f39opj"
        mapboxApiAccessToken={key}
        onViewportChange={(viewPort) => setViewport(viewPort)}
      >
        {parkData.features.map((park) => (
          <Marker
            latitude={park.geometry.coordinates[0]}
            longitude={park.geometry.coordinates[1]}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setParkName(park);
              }}
            >
              <img
                src={icon}
                alt="icons"
                style={{ width: "10px", height: "10px" }}
              />
            </button>
          </Marker>
        ))}
        {parkName ? (
          <Popup
            latitude={parkName.geometry.coordinates[0]}
            longitude={parkName.geometry.coordinates[1]}
            onClose={() => {
              setParkName(null);
            }}
          >
            <div>
              <h5>{parkName.properties.NAME}</h5>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
