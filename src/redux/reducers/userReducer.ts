import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAction,
  loginAction,
  logoutAction,
} from "../asyncAction/userAsyncAction";

type userStateType = {
  access_token: string;
  email: string;
  refresh_token: string;
  userId: number;
};

type userDetailedInfoType = {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
  isPrimary: boolean;
};
type initialStateType = {
  userDetailedInfo: userDetailedInfoType | null;
  userDetails: userStateType | null;
  isLoggedIn: boolean;
};

// Retrieve userDetails data from localStorage
const userData: userStateType | null = (() => {
  const data = localStorage.getItem("userData");
  return data ? (JSON.parse(data) as userStateType) : null;
})();

const initialState: initialStateType = {
  userDetailedInfo: null,
  userDetails: userData,
  isLoggedIn: userData ? true : false,
};

const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      console.log(userData);
      localStorage.setItem("userData", JSON.stringify(action.payload));
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.userDetails = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
      window.location.href = "/login";
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.userDetailedInfo = action.payload;
    });
  },
});
export const selectDetailedUser = (state: { user: initialStateType }) =>
  state.user.userDetailedInfo;

export const selectUser = (state: { user: initialStateType }) =>
  state.user.userDetails;
export const selectLoggedInStatus = (state: { user: initialStateType }) =>
  state.user.isLoggedIn;
export default userSlice.reducer;
