import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

const center = {
  lat: 49.8954,
  lng: -97.1385,
};

const libraries = ["places"];

function GoogleMapSection() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    ></GoogleMap>
  );
}

export default GoogleMapSection;
