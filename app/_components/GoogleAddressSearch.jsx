import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  return (
    <div className="flex items-center w-full">
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            console.log(place);
            selectedAddress(place);
            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                console.log(lat, lng);
                setCoordinates({ lat, lng });
              });
          },
        }}
        autocompletionRequest={{
          componentRestrictions: {
            country: "ca",
          },
          location: {
            lat: 49.8951,
            lng: -97.1384,
          },
          radius: 20000,
          types: ["address"],
          strictBounds: true,
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
