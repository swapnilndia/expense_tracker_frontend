import { createSlice } from "@reduxjs/toolkit";
import {
  getExpenseListAction,
  getMonthlyExpensesAction,
  getSpecificExpenseAction,
  getWeeklyExpensesAction,
  searchExpenseAction,
} from "../asyncAction/expenseAsyncAction";
import {
  ExpenseObjectType,
  ExpenseDataType,
  MonthlyExpenseListType,
  WeeklyExpenseListType,
} from "../../utils/types";

type ExpenseViewEnum = "10" | "20" | "30";

type initialStateType = {
  listOfExpense: ExpenseDataType | null;
  specificExpense: ExpenseObjectType | null;
  monthlyExpense: MonthlyExpenseListType | null;
  weeklyExpense: WeeklyExpenseListType | null;
  expenseView: ExpenseViewEnum;
};

const initialState: initialStateType = {
  listOfExpense: null,
  specificExpense: null,
  monthlyExpense: null,
  weeklyExpense: null,
  expenseView: "10",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.expenseView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenseListAction.fulfilled, (state, action) => {
      state.listOfExpense = action.payload;
    });
    builder.addCase(getWeeklyExpensesAction.fulfilled, (state, action) => {
      state.weeklyExpense = action.payload;
    });
    builder.addCase(getMonthlyExpensesAction.fulfilled, (state, action) => {
      state.monthlyExpense = action.payload;
    });
    builder.addCase(searchExpenseAction.fulfilled, (state, action) => {
      state.listOfExpense = action.payload;
    });
    builder.addCase(getSpecificExpenseAction.fulfilled, (state, action) => {
      state.specificExpense = action.payload;
    });
  },
});

export const selectExpenseTableView = (state: {
  expense: { expenseView: ExpenseViewEnum };
}) => state.expense.expenseView;

export const selectListOfExpense = (state: {
  expense: { listOfExpense: ExpenseDataType };
}) => state.expense.listOfExpense;

export const selectMonthlyListOfExpense = (state: {
  expense: { monthlyExpense: MonthlyExpenseListType };
}) => state.expense.monthlyExpense;

export const selectWeeklyListOfExpense = (state: {
  expense: { weeklyExpense: WeeklyExpenseListType };
}) => state.expense.weeklyExpense;

export const selectSpecificExpense = (state: {
  expense: { specificExpense: ExpenseObjectType };
}) => state.expense.specificExpense;
export const { changeView } = expenseSlice.actions;
export default expenseSlice.reducer;
