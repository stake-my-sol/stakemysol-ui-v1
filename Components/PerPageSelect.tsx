import { Typography, Box, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PerPageProps {
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function PerPageSelect({ perPage, setPerPage }: PerPageProps) {
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
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ pr: 1, fontSize: "0.8rem" }}>Per page</Typography>
      <Select
        id="sort-validators-by-select"
        sx={{
          borderRadius: "50px",
          fontSize: "0.8rem",
          backgroundColor: "#e3e3e3",
        }}
        value={perPage.toString()}
        onChange={handleChange}
        variant="outlined"
        autoWidth
      >
        {perPageMenuOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default PerPageSelect;
