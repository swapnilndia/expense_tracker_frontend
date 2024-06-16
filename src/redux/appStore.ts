import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/userReducer";
import ExpenseSlice from "./reducers/expenseReducer";

const appStore = configureStore({
  reducer: {
    user: UserSlice,
    expense: ExpenseSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
