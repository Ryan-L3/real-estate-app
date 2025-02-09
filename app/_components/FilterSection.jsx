import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function FilterSection({
  setBedCount,
  setBathCount,
  setParkingCount,
  setHomeType: setParentHomeType, // Rename the prop to avoid conflict
}) {
  const [bedroom, setBedroom] = React.useState("");
  const [bathroom, setBath] = React.useState("");
  const [parking, setParking] = React.useState("");
  const [type, setType] = React.useState(""); // Rename local state variable

  return (
    <div className="px-3 py-4 grid grid-cols-2 md:grid-cols-4">
      <FormControl>
        <InputLabel className="flex items-center gap-2">Beds</InputLabel>
        <Select
          className="w-[150px]"
          value={bedroom}
          label="Beds"
          onChange={(e) => {
            setBedroom(e.target.value);
            setBedCount(e.target.value);
          }}
        >
          <MenuItem value={2}>2+</MenuItem>
          <MenuItem value={3}>3+</MenuItem>
          <MenuItem value={4}>4+</MenuItem>
          <MenuItem value={5}>5+</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel className="flex items-center gap-2">Bath</InputLabel>
        <Select
          className="w-[150px]"
          value={bathroom}
          label="Bathrooms"
          onChange={(e) => {
            setBath(e.target.value);
            setBathCount(e.target.value);
          }}
        >
          <MenuItem value={2}>2+</MenuItem>
          <MenuItem value={3}>3+</MenuItem>
          <MenuItem value={4}>4+</MenuItem>
          <MenuItem value={5}>5+</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel className="flex items-center gap-2">Parking</InputLabel>
        <Select
          className="w-[150px]"
          value={parking}
          label="Parking"
          onChange={(e) => {
            setParking(e.target.value);
            setParkingCount(e.target.value);
          }}
        >
          <MenuItem value={2}>2+</MenuItem>
          <MenuItem value={3}>3+</MenuItem>
          <MenuItem value={4}>4+</MenuItem>
          <MenuItem value={5}>5+</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel className="flex items-center gap-2">Home Type</InputLabel>
        <Select
          className="w-[150px]"
          value={type}
          label="Home Type"
          onChange={(e) => {
            setType(e.target.value);
            setParentHomeType(e.target.value);
          }}
        >
          <MenuItem value={"Single Family House"}>Single Family House</MenuItem>
          <MenuItem value={"Town House"}>Town House</MenuItem>
          <MenuItem value={"Condo"}>Condo</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterSection;
