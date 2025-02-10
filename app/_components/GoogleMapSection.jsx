import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.GoogleMap),
  { ssr: false }
);

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function GoogleMapSection() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
  });

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
