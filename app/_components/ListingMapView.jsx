"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const GoogleMapSection = dynamic(() => import("./GoogleMapSection"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
  ),
});

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
    let query = supabase
      .from("Listing")
      .select(`*, ListingImages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .like("address", "%" + searchTerm + "%")
      .order("id", { ascending: false });

    const { data, error } = await query;
    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[1fr,900px]">
      <div className="order-2 md:order-none overflow-y-auto">
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchAddress={(v) => setSearchAddress(v)}
        />
      </div>
      <div className="order-1 md:order-none">
        <div className="sticky top-0">
          <GoogleMapSection className="w-full h-full md:h-30 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default ListingMapView;
