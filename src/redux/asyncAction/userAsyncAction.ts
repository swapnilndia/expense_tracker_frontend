import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../services/userServices";
import { loginData, signupData, updatePasswordType } from "../../utils/types";

export const signupAction = createAsyncThunk(
  "signupAction",
  async ({ name, email, password }: signupData) => {
    const response = await UserService.userSignup({ name, email, password });
    return response;
  }
);

export const resetPasswordAction = createAsyncThunk(
  "resetPasswordAction",
  async ({ password, token }: updatePasswordType) => {
    const response = await UserService.resetForgotPassword({ password, token });
    return response;
  }
);
export const verifyUserFinalizeAction = createAsyncThunk(
  "verifyUserFinalizeAction",
  async ({ token }: { token: string }) => {
    const response = await UserService.verifyUserFinalize({ token });
    return response;
  }
);

export const loginAction = createAsyncThunk(
  "loginAction",
  async ({ email, password }: loginData) => {
    const response = await UserService.userLogin({ email, password });
    return response;
  }
);

export const getUserAction = createAsyncThunk("getUserAction", async () => {
  const response = await UserService.getUserDetails();
  return response;
});

export const logoutAction = createAsyncThunk("logoutAction", async () => {
  const response = await UserService.userLogout();
  return response;
});
