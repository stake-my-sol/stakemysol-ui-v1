import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortDirectionProps {
  sortDir: number;
  setSortDir: React.Dispatch<React.SetStateAction<number>>;
}

function SortDirection({ sortDir, setSortDir }: SortDirectionProps) {
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
    <Box sx={{ width: 100, backgroundColor: "white", textAlign: "center" }}>
      <FormControl fullWidth>
        <Select
          id="sort-direction-select"
          value={sortDir.toString()}
          onChange={handleChange}
          variant="filled"
          IconComponent="span"
        >
          {sortDirMenuOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortDirection;
