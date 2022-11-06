import { Typography, Box, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortBySelectProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

function SortBySelect({ sortBy, setSortBy }: SortBySelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedSortMetric = event.target.value;
    setSortBy(selectedSortMetric);
  };

  const sortByMenuOptions = [
    {
      value: "total_score",
      label: "Total Score",
    },
    {
      value: "active_stake",
      label: "Active Stake",
    },
    {
      value: "apy",
      label: "APY",
    },
    {
      value: "commission",
      label: "Commission",
    },
    {
      value: "name",
      label: "Name",
    },
    {
      value: "autonomous_system_number",
      label: "ASN",
    },
    {
      value: "epoch_credits",
      label: "Epoch Credits",
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
      <Typography sx={{ pr: 1, fontSize: "0.8rem" }}>Sort by</Typography>
      <Select
        id="sort-validators-by-select"
        sx={{
          borderRadius: "50px",
          fontSize: "0.8rem",
          backgroundColor: "#e3e3e3",
        }}
        value={sortBy}
        onChange={handleChange}
        variant="outlined"
        autoWidth
      >
        {sortByMenuOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default SortBySelect;
