import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExpenseService } from "../services/expenseService";
import { expenseData, updateExpenseData } from "../../utils/types";

export const getExpenseListAction = createAsyncThunk(
  "getExpenseListAction",
  async ({ page, rowsPerPage }: { page: number; rowsPerPage: number }) => {
    const response = await ExpenseService.getExpenseList({ page, rowsPerPage });
    return response;
  }
);
export const deleteExpenseAction = createAsyncThunk(
  "deleteExpenseAction",
  async (expenseId: number, thunkAPI) => {
    const response = await ExpenseService.deleteExpense(expenseId);
    if (response?.status === 200)
      thunkAPI.dispatch(getExpenseListAction({ page: 0, rowsPerPage: 10 }));
    return response;
  }
);
export const addExpenseAction = createAsyncThunk(
  "addExpenseAction",
  async ({ price, category, description }: expenseData, thunkAPI) => {
    const response = await ExpenseService.addExpense({
      price,
      category,
      description,
    });
    if (response?.status === 201)
      thunkAPI.dispatch(getExpenseListAction({ page: 0, rowsPerPage: 10 }));
    return response;
  }
);
export const updateExpenseAction = createAsyncThunk(
  "updateExpenseAction",
  async (
    { price, category, description, expenseId }: updateExpenseData,
    thunkAPI
  ) => {
    const response = await ExpenseService.updateExpense({
      price,
      category,
      description,
      expenseId,
    });
    if (response?.status === 200)
      thunkAPI.dispatch(getExpenseListAction({ page: 0, rowsPerPage: 10 }));
    return response;
  }
);
export const getSpecificExpenseAction = createAsyncThunk(
  "getSpecificExpenseAction",
  async (expenseId: number) => {
    const response = await ExpenseService.getSpecificExpense(expenseId);
    return response.expense;
  }
);
export const searchExpenseAction = createAsyncThunk(
  "searchExpenseAction",
  async ({
    description,
    category,
  }: {
    description: string;
    category: string;
  }) => {
    const response = await ExpenseService.searchExpense({
      description,
      category,
    });

    return response;
  }
);
