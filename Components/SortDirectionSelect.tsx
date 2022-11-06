import { Typography, Box, MenuItem } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortDirectionProps {
  sortDir: number;
  setSortDir: React.Dispatch<React.SetStateAction<number>>;
}

function SortDirectionSelect({ sortDir, setSortDir }: SortDirectionProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedDirection = parseInt(event.target.value, 10);
    setSortDir(selectedDirection);
  };

  const sortDirMenuOptions = [
    {
      value: 1,
      label: "Ascending",
    },
    {
      value: -1,
      label: "Descending",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ pr: 1, fontSize: "0.8rem" }}>Direction</Typography>

      <Select
        id="sort-direction-select"
        sx={{
          borderRadius: "50px",
          fontSize: "0.8rem",
          backgroundColor: "#e3e3e3",
        }}
        value={sortDir.toString()}
        onChange={handleChange}
        variant="outlined"
        autoWidth
      >
        {sortDirMenuOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default SortDirectionSelect;
