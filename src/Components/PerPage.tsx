import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PerPageProps {
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function PerPage({ perPage, setPerPage }: PerPageProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedPerPage = parseInt(event.target.value, 10);
    setPerPage(selectedPerPage);
  };

  const perPageMenuOptions = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 200,
      label: "200",
    },
  ];

  return (
    <Box sx={{ width: 70, backgroundColor: "white", textAlign: "center" }}>
      <FormControl fullWidth>
        <Select
          id="sort-validators-by-select"
          value={perPage.toString()}
          onChange={handleChange}
          variant="filled"
          IconComponent="span"
        >
          {perPageMenuOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default PerPage;
