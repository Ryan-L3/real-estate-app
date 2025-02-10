import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function GoogleMapSection() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    libraries,
    version: "weekly",
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen rounded-lg">
      <GoogleMap
        mapContainerClassName="w-full h-full rounded-lg"
        center={{ lat: 49.8954, lng: -97.1385 }}
        zoom={10}
        onLoad={onMapLoad}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
        }}
      />
    </div>
  );
}

export default GoogleMapSection;
