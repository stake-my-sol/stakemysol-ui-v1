import { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  page: number;
  pagesNum: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationCmp({ pagesNum, page, setPage }: PaginationProps) {
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Pagination count={pagesNum} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default PaginationCmp;
