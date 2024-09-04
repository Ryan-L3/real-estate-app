"use client";
import React, { useEffect } from "react";
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

function EditListing() {
  const params = usePathname();

  useEffect(() => {
    console.log(params.split("/")[2]);
  });

  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from("Listing")
      .update(formValue)
      .eq("id", params.split("/")[2])
      .select();

    if (data) {
      console.log(data);
      toast("Listing updated and published!");
    }
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="font-bold text-2xl mb-6">
        Enter more details about your listing
      </h2>

      <Formik
        initialValues={{ type: "Sale", propertyType: "Single Family House" }}
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Rent or Sell */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    aria-labelledby="rent-or-sale"
                    defaultValue="Sale"
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
                      defaultValue={"Single Family House"}
                      onChange={(e) => (values.propertyType = e.target.value)}
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
                    type="number"
                    size="small"
                    label="Ex. 2"
                    name="bedroom"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="Ex. 2"
                    name="bathroom"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Built In</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="Ex. 1900"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Parking</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="Ex. 2"
                    name="parking"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="Ex. 1900"
                    name="lotSize"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="Ex. 1500 Sq.ft"
                    name="area"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Selling Price ($)</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="400,000"
                    name="price"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                  <TextField
                    type="number"
                    size="small"
                    label="100"
                    name="hoa"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description Box */}
              <div className="mt-8">
                <h2 className="text-lg text-slate-500">Description</h2>
                <TextField
                  id="description"
                  label="Provide a detailed description of the property"
                  name="description"
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
