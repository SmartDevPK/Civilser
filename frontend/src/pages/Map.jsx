import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px", // Adjust height as needed
};

const center = {
  lat: 9.0579, // Replace with the actual latitude of the venue
  lng: 7.4951, // Replace with the actual longitude of the venue
};

export default function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDkJ4G-IAI3bERMbQB8k6WZz6vvUKwyiPA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
