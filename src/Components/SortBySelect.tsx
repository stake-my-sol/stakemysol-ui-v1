import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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
    <Box sx={{ width: 130, backgroundColor: "white", textAlign: "center" }}>
      <FormControl fullWidth>
        <Select
          id="sort-validators-by-select"
          value={sortBy}
          onChange={handleChange}
          variant="filled"
          IconComponent="span"
        >
          {sortByMenuOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortBySelect;
