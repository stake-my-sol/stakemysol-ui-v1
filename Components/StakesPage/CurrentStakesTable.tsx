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
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { motion } from "framer-motion";
import { sortFormattedNumber } from "../../utils/sortFormattedNumber";
import { IUIStakeAccount } from "../../@types";
import smartNumber from "../../utils/smartNumber";
import _ from "lodash";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import pubkeyShortener from "../../utils/pubkeyShortener";

interface TableData {
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
): TableData {
  return {
    address,
    value,
    profit,
    state,
    actions,
  };
}

function descendingComparator(
  a: TableData,
  b: TableData,
  orderBy: "value" | "profit",
) {
  if (orderBy === "value") {
    return sortFormattedNumber(a.value, b.value);
  }

  return sortFormattedNumber(a.profit, b.profit);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
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

interface EnhancedTableProps {}

function EnhancedTableHead(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center" padding="normal">
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface CurrentStakesTableProps {
  uiStakeAccounts: IUIStakeAccount[];
}

export default function CurrentStakesTable({
  uiStakeAccounts,
}: CurrentStakesTableProps) {
  let noStakeAccount = _.isEmpty(uiStakeAccounts);
  const noStakeAccountMessage = "You haven't staked any SOL yet.";

  const rows = uiStakeAccounts.map(({ publicKey, profit, value, status }) =>
    createData(
      pubkeyShortener(publicKey.toBase58()),
      `${smartNumber(value, LAMPORTS_PER_SOL)} SOL`,
      `${smartNumber(profit, LAMPORTS_PER_SOL)} SOL`,
      status,
      "Close,Transfer",
    ),
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {noStakeAccount && (
          <Box sx={{ p: 2, textAlign: "center" }}>{noStakeAccountMessage}</Box>
        )}
        {!noStakeAccount && (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {rows
                  // .sort((a, b) => descendingComparator(a, b, "value"))
                  .map((row, index) => {
                    return (
                      <StyledTableRow hover tabIndex={-1} key={row.address}>
                        <StyledTableCell align="center">
                          {row.address}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.value}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.profit}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.state}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {row.actions.split(",").map((action) => {
                            return (
                              <Button
                                component={motion.button}
                                whileTap={{ scale: 1.1 }}
                                color={action === "Close" ? "error" : "warning"}
                                sx={{
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                key={action}
                              >
                                {action}
                              </Button>
                            );
                          })}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
