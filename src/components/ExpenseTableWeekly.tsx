import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectWeeklyListOfExpense } from "../redux/reducers/expenseReducer";
import { formattedCurrency } from "../utils/helperFunctions";
const ExpenseTableWeekly = () => {
  const weeklyExpenses = useSelector(selectWeeklyListOfExpense);
  console.log(weeklyExpenses);
  return (
    <>
      {weeklyExpenses && weeklyExpenses.length > 0 ? (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Year</TableCell>
                <TableCell align="right">Week</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Transactions Count</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {weeklyExpenses.map((expense) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={expense.week}
                >
                  <TableCell align="left">{expense.year}</TableCell>
                  <TableCell align="right"> {expense.week}</TableCell>
                  <TableCell align="right">
                    {formattedCurrency(expense.total_amount)}
                  </TableCell>
                  <TableCell align="right">
                    {expense.transaction_count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    </>
  );
};

export default ExpenseTableWeekly;
