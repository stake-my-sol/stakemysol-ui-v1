import { Stack, Divider } from "@mui/material";
import SortBySelect from "./SortBySelect";
import PerPageSelect from "./PerPageSelect";
import SortDirectionSelect from "./SortDirectionSelect";
import SearchByName from "./SearchByName";

interface RankingBarProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortDir: number;
  setSortDir: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function RankingBar({
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  perPage,
  setPerPage,
}: RankingBarProps) {
  return (
    <Stack
      sx={{ p: 2 }}
      spacing={1}
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />

      <PerPageSelect perPage={perPage} setPerPage={setPerPage} />

      <SortDirectionSelect sortDir={sortDir} setSortDir={setSortDir} />

      <SearchByName />
    </Stack>
  );
}

export default RankingBar;
