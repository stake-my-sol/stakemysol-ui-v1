import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  TableRow,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { visuallyHidden } from "@mui/utils";

interface Data {
  address: string;
  value: string;
  profit: string;
  state: string;
  actions: string;
}

function createData(
  address: string,
  value: string,
  profit: string,
  state: string,
  actions: string,
): Data {
  return {
    address,
    value,
    profit,
    state,
    actions,
  };
}

const rows = [
  createData(
    "Pst...fst",
    "305 SOL",
    "3.7 SOL",
    "Active",
    ["Claim", "Transfer"].join(","),
  ),
  createData(
    "h4x...bft",
    "3.5M SOL",
    "30k SOL",
    "Active",
    ["Claim", "Transfer"].join(","),
  ),

  // createData("Donut", 452, 25.0, 51, 4.9),
  // createData("Eclair", 262, 16.0, 24, 6.0),
  // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Honeycomb", 408, 3.2, 87, 6.5),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  // createData("Jelly Bean", 375, 0.0, 94, 0.0),
  // createData("KitKat", 518, 26.0, 65, 7.0),
  // createData("Lollipop", 392, 0.2, 98, 0.0),
  // createData("Marshmallow", 318, 0, 81, 2.0),
  // createData("Nougat", 360, 19.0, 9, 37.0),
  // createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "value",
    numeric: false,
    disablePadding: false,
    label: "Value",
  },
  {
    id: "profit",
    numeric: false,
    disablePadding: false,
    label: "Profit",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "State",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("value");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <StyledTableRow hover tabIndex={-1} key={row.address}>
                      <StyledTableCell align="left">
                        {row.address}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.value}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.profit}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.state}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.actions.split(",").map((action) => (
                          <Button variant="contained" key={action}>
                            {action}
                          </Button>
                        ))}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
