export type loginData = {
  email: string;
  password: string;
};
export type resetPasswordType = {
  password: string;
  confirmPassword: string;
};
export type updatePasswordType = {
  password: string;
  token: string;
};

export type forgotPasswordType = {
  email: string;
};

export type signupData = {
  name: string;
  email: string;
  password: string;
};

export type expenseData = {
  price: number;
  category: string;
  description: string;
};

export type updateExpenseData = {
  expenseId: number;
  price: number;
  category: string;
  description: string;
};

export type logoutData = {
  email: string;
};

export type ExpenseObjectType = {
  category: string;
  createdAt: string;
  deletedAt: null;
  description: string;
  id: number;
  price: number;
  updatedAt: string;
  userId: number;
};
export type listOfExpenseType = ExpenseObjectType[] | [];
export type ExpenseDataType = {
  listOfExpense: listOfExpenseType;
  limit: number;
  offset: number;
  count: number;
};

export type MonthlyExpenseListType =
  | [
      {
        month: string;
        total_amount: number;
        transaction_count: number;
      }
    ]
  | [];

export type WeeklyExpenseListType =
  | [
      {
        year: 2024;
        week: 25;
        total_amount: 738;
        transaction_count: 6;
      }
    ]
  | [];
