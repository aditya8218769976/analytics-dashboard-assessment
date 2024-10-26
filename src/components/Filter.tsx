import React from "react";
import { FormControl, Select, MenuItem, InputLabel, Box, Typography } from "@mui/material";

interface FilterProps {
  selectedCompany: string;
  onCompanyChange: (company: string) => void;
  companies: string[];
}

const Filter: React.FC<FilterProps> = ({ selectedCompany, onCompanyChange, companies }) => {
  return (
    <Box sx={{ margin: "20px 0", padding: "16px", borderRadius: "8px", boxShadow: 2, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h6" sx={{ marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
        Filter by Company
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="company-filter-label">Select Company</InputLabel>
        <Select
          labelId="company-filter-label"
          value={selectedCompany}
          onChange={(e) => onCompanyChange(e.target.value)}
          label="Select Company"
          sx={{
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#888",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#007bff",
            },
          }}
        >
          <MenuItem value="All">All Vehicles</MenuItem>
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
