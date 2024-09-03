"use client";
import React from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

function EditListing() {
  return (
    <div className="px-10 md:px-20">
      <h2 className="font-bold text-2xl mb-6">
        Enter more details about your listing
      </h2>
      <div className="p-8 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rent or Sell */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
            <RadioGroup
              aria-labelledby="rent-or-sale"
              defaultValue="Sale"
              name="rent-or-sale"
            >
              <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
              <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
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
            <TextField size="small" label="Ex. 2" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Bathroom</h2>
            <TextField size="small" label="Ex. 2" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Built In</h2>
            <TextField size="small" label="Ex. 1900" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Parking</h2>
            <TextField size="small" label="Ex. 2" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
            <TextField size="small" label="Ex. 1900" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Area (Sq.Ft)</h2>
            <TextField size="small" label="Ex. 1500 Sq.ft" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Selling Price ($)</h2>
            <TextField size="small" label="400,000" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
            <TextField size="small" label="100" />
          </div>
        </div>

        {/* Description Box */}
        <div className="mt-8">
          <h2 className="text-lg text-slate-500">Description</h2>
          <TextField
            id="description"
            label="Provide a detailed description of the property"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default EditListing;
