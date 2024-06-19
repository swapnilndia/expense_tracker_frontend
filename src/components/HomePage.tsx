import * as React from "react";
import Paper from "@mui/material/Paper";

import { Card } from "@mui/material";
// import { AppDispatch } from "../redux/appStore";
import { useSelector } from "react-redux";
// import {
//   getExpenseListAction,
// } from "../redux/asyncAction/expenseAsyncAction";
import { selectListOfExpense } from "../redux/reducers/expenseReducer";

import ExpensesTable from "./ExpensesTable";
import HomepageSearchComponent from "./HomepageSearchComponent";

const defaultExpensePagination = JSON.parse(
  localStorage.getItem("expensePagination") ||
    JSON.stringify({ page: 0, rowsPerPage: 10 })
);
export type SetNumberType = React.Dispatch<React.SetStateAction<number>>;

export default function HomePage() {
  // const dispatch: AppDispatch = useDispatch();
  const expenseList = useSelector(selectListOfExpense);
  const [page, setPage] = React.useState<number>(defaultExpensePagination.page);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    defaultExpensePagination.rowsPerPage
  );

  React.useEffect(() => {
    localStorage.setItem(
      "expensePagination",
      JSON.stringify({ page, rowsPerPage })
    );

    // dispatch(getExpenseListAction({ page, rowsPerPage }));
  }, [page, rowsPerPage]);
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
      <Card>
        <HomepageSearchComponent />
      </Card>
      <ExpensesTable
        page={page}
        rowsPerPage={rowsPerPage}
        expenseList={expenseList}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Paper>
  );
}
