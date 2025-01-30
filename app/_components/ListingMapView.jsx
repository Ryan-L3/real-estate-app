"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchAddress] = useState();
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
    const { data, error } = await supabase
      .from("Listing")
      .select(`*, ListingImages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .like("address", "%" + searchTerm + "%")
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchAddress={(v) => setSearchAddress(v)}
        />
      </div>
      <div>Map</div>
    </div>
  );
}

export default ListingMapView;
