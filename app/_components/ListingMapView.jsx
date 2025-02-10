"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const GoogleMapSection = dynamic(() => import("./GoogleMapSection"), {
  ssr: false,
  loading: () => <div className="h-screen bg-slate-200 animate-pulse"></div>,
});

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchAddress] = useState();
  const [bedCount, setBedCount] = React.useState(0);
  const [bathCount, setBathCount] = React.useState(0);
  const [parkingCount, setParkingCount] = React.useState(0);
  const [homeType, setHomeType] = React.useState();

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select(`*, ListingImages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)

      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server side error");
    }
  };

  const handleSearchClick = async () => {
    const searchTerm = searchedAddress?.value?.structured_formatting.main_text;
    let query = supabase
      .from("Listing")
      .select(`*, ListingImages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      .like("address", "%" + searchTerm + "%")
      .order("id", { ascending: false });

    if (homeType) {
      query = query.eq("propertyType", homeType);
    }
    const { data, error } = await query;

    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,900px] gap-10">
      <div className="overflow-y-auto">
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchAddress={(v) => setSearchAddress(v)}
          setBedCount={setBedCount}
          setBathCount={setBathCount}
          setParkingCount={setParkingCount}
          setHomeType={setHomeType}
        />
      </div>
      <div>
        <GoogleMapSection className="hidden md:block sticky top-0 h-screen" />
      </div>
    </div>
  );
}

export default ListingMapView;
