import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "react-toastify";
import { decodeJWT, isTokenExpired } from "./helperFunctions";

interface ApiHelperOptions {
  method: Method;
  url: string;
  headers?: Record<string, string>;
  data?: unknown; // Axios uses `data` for the request body
}

const refreshAccessToken = async () => {
  const userData = localStorage.getItem("userData");
  if (!userData) return null;
  const userDetails = JSON.parse(userData);
  const access_token = userDetails?.access_token;
  const refresh_token = userDetails?.refresh_token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/refresh`,
      {
        refreshToken: refresh_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200) {
      const newUserData = response.data.data;
      localStorage.setItem("userData", JSON.stringify(newUserData));
      toast.success("Access token is Refreshed");
      return newUserData.access_token;
    } else {
      localStorage.removeItem("userData");
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    localStorage.removeItem("userData");
    console.error("Failed to refresh access token:", error);

    // Handle token refresh failure (e.g., log out the user or prompt to re-login)
    return null;
  }
};

export const apiHelper = async <T>(options: ApiHelperOptions): Promise<T> => {
  const { method, url, headers, data } = options;

  const requestOptions: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDetails = JSON.parse(userData);
      const access_token = userDetails?.access_token;
      if (access_token) {
        const decodedAccessToken = decodeJWT();
        const isAccessTokenExpired = isTokenExpired(
          decodedAccessToken?.exp || 0
        );
        if (isAccessTokenExpired) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            requestOptions.headers = {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
          } else {
            throw new Error("Failed to refresh access token");
          }
        } else {
          requestOptions.headers = {
            ...headers,
            Authorization: `Bearer ${access_token}`,
          };
        }
      }
    }

    const response = await axios(requestOptions);

    if (response.status !== 204) {
      return response.data as T;
    } else {
      // For 204 No Content, return an empty object or null as per your requirement
      return null as T;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Something went wrong");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
