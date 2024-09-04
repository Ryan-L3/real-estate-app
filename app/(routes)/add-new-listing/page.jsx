"use client";
import React, { useState } from "react";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@mui/material";
import SnackbarNotification from "@/app/_components/SnackbarNotification";
import { supabase } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const nextHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("Listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: "Ryan Le",
        },
      ])
      .select();

    if (data) {
      setLoader(false);
      console.log("New data added", data);
      setSnackbarMessage("Listing added successfully!");
      setSnackbarSeverity("success");
      router.replace("/edit-listing/" + data[0].id);

      if (error) {
        setLoader(false);
        console.log(error);
        setSnackbarMessage("Failed to add listing.");
        setSnackbarSeverity("error");
      }
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-10 w-full rounded-lg border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500">
            Enter Address which you want to list
          </h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            variant="contained"
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nextHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
      <SnackbarNotification
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
}

export default AddNewListing;
