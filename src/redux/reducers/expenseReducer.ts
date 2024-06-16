import { createSlice } from "@reduxjs/toolkit";
import {
  getExpenseListAction,
  getSpecificExpenseAction,
  searchExpenseAction,
} from "../asyncAction/expenseAsyncAction";
import { ExpenseObjectType, ExpenseDataType } from "../../utils/types";

type initialStateType = {
  listOfExpense: ExpenseDataType | null;
  specificExpense: ExpenseObjectType | null;
};

const initialState: initialStateType = {
  listOfExpense: null,
  specificExpense: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenseListAction.fulfilled, (state, action) => {
      state.listOfExpense = action.payload;
    });
    builder.addCase(searchExpenseAction.fulfilled, (state, action) => {
      state.listOfExpense = action.payload;
    });
    builder.addCase(getSpecificExpenseAction.fulfilled, (state, action) => {
      state.specificExpense = action.payload;
    });
  },
});

export const selectListOfExpense = (state: {
  expense: { listOfExpense: ExpenseDataType };
}) => state.expense.listOfExpense;
export const selectSpecificExpense = (state: {
  expense: { specificExpense: ExpenseObjectType };
}) => state.expense.specificExpense;
export default expenseSlice.reducer;
