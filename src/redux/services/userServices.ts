import axios, { AxiosResponse } from "axios";
import {
  forgotPasswordType,
  loginData,
  signupData,
  updatePasswordType,
} from "../../utils/types";
import { toast } from "react-toastify";
import { apiHelper } from "../../utils/apiHelperFunctions";
type userInfoType = {
  email: string;
  id: number;
  isPrimary: boolean;
  isVerified: boolean;
  name: string;
};
class userService {
  static getInstance() {
    return new userService();
  }
  userSignup = async ({ name, email, password }: signupData) => {
    const data = JSON.stringify({ name, email, password });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("User Successfully Signed Up");
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };
  userLogin = async ({ email, password }: loginData) => {
    const data = JSON.stringify({ name, email, password });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Successfully Logged In");
        return response.data.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };

  userLogout = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.access_token}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("User Successfully Logged Out");
        return { userLoggedOut: "true" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };

  getUserDetails = async (): Promise<userInfoType | null> => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("No user data found in localStorage");
      }

      const parsedData = JSON.parse(userData);
      const token = parsedData.access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/get-user-details`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("User Details Fetched Successfully");
        const data = response?.data?.userData;

        const userJson: userInfoType = {
          id: data.id,
          name: data.name,
          email: data.email,
          isVerified: data.isVerified,
          isPrimary: data.isPrimary,
        };
        return userJson;
      }
      {
        toast.error(`Failed to fetch user details: ${response.status}`);
        return null;
      }
    } catch (error) {
      toast.error("Error fetching User Details");
      console.error("Error fetching User Details", error);
      return null;
    }
  };

  userForgotPassword = async ({ email }: forgotPasswordType) => {
    const data = JSON.stringify({ email });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Kindly check your mail");
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };

  resetForgotPassword = async ({ password, token }: updatePasswordType) => {
    const data = JSON.stringify({ password, token });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Password updated successfully");
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };
  verifyEmailInitialize = async ({ email }: forgotPasswordType) => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      throw new Error("No user data found in localStorage");
    }

    const parsedData = JSON.parse(userData);
    const token = parsedData.access_token;

    if (!token) {
      throw new Error("No access token found");
    }
    const data = JSON.stringify({ email });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-email-initialize`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Kindly check your mail");
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };

  verifyUserFinalize = async ({ token }: { token: string }) => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      throw new Error("No user data found in localStorage");
    }

    const parsedData = JSON.parse(userData);
    const access_token = parsedData.access_token;

    if (!access_token) {
      throw new Error("No access token found");
    }

    const data = JSON.stringify({ token });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-email-finalize`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Email verified successfully");
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        // If you want to rethrow the error, ensure it has the right type
        throw error;
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
        throw new Error("An unexpected error occurred");
      }
    }
  };
}

export const UserService = userService.getInstance();
