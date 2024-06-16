import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { formattedCurrency, formattedDate } from "../utils/helperFunctions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { AppDispatch } from "../redux/appStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExpenseAction } from "../redux/asyncAction/expenseAsyncAction";
import { ExpenseDataType } from "../utils/types";
import { SetNumberType } from "./HomePage";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
interface Column {
  id: "date" | "price" | "category" | "description" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", align: "left" },
  { id: "price", label: "Money", align: "right" },
  {
    id: "category",
    label: "Category",
    align: "right",
  },
  {
    id: "description",
    label: "Description",
    align: "right",
  },

  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

const ExpensesTable = ({
  page,
  rowsPerPage,
  expenseList,
  setPage,
  setRowsPerPage,
}: {
  page: number;
  rowsPerPage: number;
  expenseList: ExpenseDataType;
  setPage: SetNumberType;
  setRowsPerPage: SetNumberType;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleDownload = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/download`);
  };
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

  const handleDelete = (expenseId: number) => {
    dispatch(deleteExpenseAction(expenseId));
  };
  const handleEdit = (expenseId: number) => {
    navigate(`/editExpense/${expenseId}`);
  };
  return (
    <div>
      {" "}
      <Box
        padding={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">
            View Expense
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="View Expense"
            defaultValue={10}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Daily Basis</MenuItem>
            <MenuItem value={20}>Weekly Basis</MenuItem>
            <MenuItem value={30}>Monthly Basis</MenuItem>
          </Select>
        </FormControl>
        <Typography align="center" variant="h4">
          Expense List
        </Typography>{" "}
        <IconButton onClick={handleDownload}>
          <FileDownloadIcon fontSize="large" />
        </IconButton>
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
          {expenseList && expenseList?.listOfExpense?.length > 0 ? (
            <TableBody>
              {expenseList?.listOfExpense
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((expense) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={expense.id}
                    >
                      <TableCell align="left">
                        {formattedDate(expense.createdAt)}
                      </TableCell>
                      <TableCell align="right">
                        {formattedCurrency(expense.price)}
                      </TableCell>
                      <TableCell align="right">{expense.category}</TableCell>
                      <TableCell align="right">{expense.description}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(expense.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEdit(expense.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography align="center" variant="h5">
                    Expense list is Empty
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={expenseList?.count ?? 10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ExpensesTable;
