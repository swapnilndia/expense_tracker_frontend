import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Chip, Typography } from "@mui/material";
import { formattedCurrency } from "../utils/helperFunctions";
import useFetchLeaderboard from "../hooks/useFetchLeaderboard";
import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";

interface Column {
  id: "userId" | "name" | "email" | "isPrimary" | "total_expenses";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "userId", label: "User Id", align: "left" },
  { id: "name", label: "Username", align: "right" },
  {
    id: "email",
    label: "Email",
    align: "right",
  },
  {
    id: "isPrimary",
    label: "Status",
    align: "right",
  },
  {
    id: "total_expenses",
    label: "Total Expenses",
    align: "right",
  },
];

export default function Leaderboard() {
  const { leaderboard } = useFetchLeaderboard();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        overflow: "hidden",
        margin: "2rem auto auto auto",
        border: "1px solid black",
        width: {
          sx: "90%",
          md: "70%",
        },
      }}
    >
      <Box padding={2}>
        <Typography align="center" variant="h4">
          Leaderboard
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
            <TableBody>
              {leaderboard
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((leader) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={leader.id}
                    >
                      <TableCell align="left">{leader.id}</TableCell>
                      <TableCell align="right">{leader.name}</TableCell>
                      <TableCell align="right">{leader.email}</TableCell>

                      {leader.isPrimary ? (
                        <TableCell align="right">
                          {" "}
                          <Chip
                            icon={<PaidIcon />}
                            label="Premium"
                            color="success"
                          />
                        </TableCell>
                      ) : (
                        <TableCell align="right">
                          {" "}
                          <Chip
                            icon={<MoneyOffCsredIcon />}
                            label="Free"
                            color="warning"
                          />
                        </TableCell>
                      )}

                      <TableCell align="right">
                        {formattedCurrency(leader.total_expenses)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography align="center" variant="h5">
                  Expense list is Empty
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={leaderboard?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
