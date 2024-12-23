"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Formik, validateYupSchema } from "formik";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";
import { list } from "postcss";

function EditListing({ params }) {
  const [listing, setListing] = useState();
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select("*, ListingImages(*)")
      .eq("createdBy", "Ryan Le")
      .eq("id", params.id);

    if (data) {
      setListing(data[0]);
      console.log(data);
    }
  };

  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (data) {
      toast("Listing updated and published!");
    }

    for (const image of images) {
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split(".").pop();
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (error) {
        toast("Error while uploading images");
      } else {
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;

        const { data, error } = await supabase
          .from("ListingImages")
          .insert([{ url: imageUrl, listing_id: params?.id }])
          .select();
        if (error) {
          setLoading(false);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="font-bold text-2xl mb-6">
        Enter more details about your listing
      </h2>

      {listing ? (
        <Formik
          initialValues={{
            type: listing.type || "Sale",
            propertyType: listing.propertyType || "Single Family House",
            bedroom: listing.bedroom || "",
            bathroom: listing.bathroom || "",
            builtIn: listing.builtIn || "",
            parking: listing.parking || "",
            lotSize: listing.lotSize || "",
            area: listing.area || "",
            price: listing.price || "",
            hoa: listing.hoa || "",
            description: listing.description || "",
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="p-8 rounded shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Rent or Sell */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                    <RadioGroup
                      aria-labelledby="rent-or-sale"
                      value={values.type}
                      onChange={(v) => (values.type = v.target.value)}
                      name="rent-or-sale"
                    >
                      <FormControlLabel
                        value="Sale"
                        control={<Radio />}
                        label="Sale"
                      />
                      <FormControlLabel
                        value="Rent"
                        control={<Radio />}
                        label="Rent"
                      />
                    </RadioGroup>
                  </div>

                  {/* Property Type */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Property Type</h2>
                    <FormControl size="small">
                      <InputLabel id="property-type-label">
                        Select Property Type
                      </InputLabel>
                      <Select
                        labelId="property-type-label"
                        id="propertyType"
                        label="Select Property Type"
                        value={values.propertyType}
                        onChange={(e) =>
                          setFieldValue("propertyType", e.target.value)
                        }
                        autoWidth
                      >
                        <MenuItem value="Single Family House">
                          Single Family House
                        </MenuItem>
                        <MenuItem value="Town House">Town House</MenuItem>
                        <MenuItem value="Condo">Condo</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Bedroom</h2>
                    <TextField
                      defaultValue={listing?.bedroom}
                      type="number"
                      size="small"
                      label={listing?.bedroom ? "" : "Ex. 2"}
                      name="bedroom"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Bathroom</h2>
                    <TextField
                      defaultValue={listing?.bathroom}
                      type="number"
                      size="small"
                      label={listing?.bathroom ? "" : "Ex. 2"}
                      name="bathroom"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Built In</h2>
                    <TextField
                      defaultValue={listing?.builtIn}
                      type="number"
                      size="small"
                      label={listing?.builtIn ? "" : "Ex. 2"}
                      name="builtIn"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Parking</h2>
                    <TextField
                      defaultValue={listing?.parking}
                      type="number"
                      size="small"
                      label={listing?.builtIn ? "" : "Ex. 2"}
                      name="parking"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                    <TextField
                      defaultValue={listing?.lotSize}
                      type="number"
                      size="small"
                      label={listing?.lotSize ? "" : "Ex. 1900"}
                      name="lotSize"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                    <TextField
                      defaultValue={listing?.area}
                      type="number"
                      size="small"
                      label={listing?.area ? "" : "Ex. 1500 Sq.ft"}
                      name="area"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Selling Price ($)</h2>
                    <TextField
                      defaultValue={listing?.price}
                      type="number"
                      size="small"
                      label={listing?.price ? "" : "$400,000"}
                      name="price"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                    <TextField
                      defaultValue={listing?.hoa}
                      type="number"
                      size="small"
                      label={listing?.hoa ? "" : "100"}
                      name="hoa"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Description Box */}
                <div className="mt-8">
                  <h2 className="text-lg text-slate-500">Description</h2>
                  <TextField
                    defaultValue={listing?.description}
                    id="description"
                    label={
                      listing?.description
                        ? ""
                        : "Provide a detailed description of the property"
                    }
                    name="description"
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <div className="mt-5">
                  <h2 className="text-lg text-slate-500">
                    Upload Property Images
                  </h2>
                  <FileUpload
                    setImages={(value) => setImages(value)}
                    imageList={listing.ListingImages}
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-5">
                  <Button disable={loading} type="submit" variant="contained">
                    {loading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Save & Publish"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default EditListing;
