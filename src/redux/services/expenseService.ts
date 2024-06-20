import { toast } from "react-toastify";
import { apiHelper } from "../../utils/apiHelperFunctions";
import { AxiosResponse } from "axios";
import { expenseData, updateExpenseData } from "../../utils/types";

class expenseService {
  static getInstance() {
    return new expenseService();
  }
  getExpenseList = async ({
    page,
    rowsPerPage,
  }: {
    page: number;
    rowsPerPage: number;
  }) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }
      const offset = page * rowsPerPage;

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${
          import.meta.env.VITE_API_URL
        }/expenses?offset=${offset}&limit=${rowsPerPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Expense list fetched successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Error fetching expense list:");
      console.error("Error fetching expense list:", error);
    }
  };
  getWeeklyExpenseList = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/expenses-weekly`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Weekly Expenses fetched successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Error fetching expense list:");
      console.error("Error fetching expense list:", error);
    }
  };
  getMonthlyExpenseList = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/expenses-monthly`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Monthly Expenses fetched successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Error fetching expense list:");
      console.error("Error fetching expense list:", error);
    }
  };
  getLeaderboard = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/leaderboard`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Leaderboard fetched successfully");
        return response.data.allExpenses;
      }
    } catch (error) {
      toast.error("Error fetching Leaderboard");
      console.error("Error fetching Leaderboard", error);
    }
  };

  downloadExpense = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/download`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Expenses downloaded Successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Error downloading expenses");
      console.error("Error downloading Expenses", error);
    }
  };

  getDownloadsList = async () => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/downloads`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Download List fetched successfully");
        return response.data.listOfDownload;
      }
    } catch (error) {
      toast.error("Error fetching Download List ");
      console.error("Error fetching Download List ", error);
    }
  };

  deleteExpense = async (expenseId: number) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/expenses/${expenseId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Expense deleted Successfully");
        return response;
      }
    } catch (error) {
      toast.error("Error deleting expense");
      console.error("Error fetching expense list:", error);
    }
  };

  addExpense = async ({ price, category, description }: expenseData) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;
      const data = { price, category, description };

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/expense`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      if (response.status === 201) {
        toast.success("Expense Created Successfully");
        return response;
      }
    } catch (error) {
      toast.error("Error creating expense");
      console.error("Error fetching expense list:", error);
    }
  };

  updateExpense = async ({
    price,
    category,
    description,
    expenseId,
  }: updateExpenseData) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;
      const data = { price, category, description };

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "PUT",
        url: `${import.meta.env.VITE_API_URL}/expenses/${expenseId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      if (response.status === 200) {
        toast.success("Expense Updated Successfully");
        return response;
      }
    } catch (error) {
      toast.error("Error Updating expense");
      console.error("Error fetching expense list:", error);
    }
  };

  getSpecificExpense = async (expenseId: number) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/expenses/${expenseId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Specific Expense Fetched Successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Error Fetching expense");
      console.error("Error fetching expense list:", error);
    }
  };

  searchExpense = async ({
    description,
    category,
  }: {
    description: string;
    category: string;
  }) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }

      const response: AxiosResponse = await apiHelper({
        method: "GET",
        url: `${
          import.meta.env.VITE_API_URL
        }/search/expenses?description=${description}&category=${category}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Retrived expenses with same description");
        return response.data;
      }
    } catch (error) {
      toast.error("Error Fetching expense");
      console.error("Error fetching expenses", error);
    }
  };
}

export const ExpenseService = expenseService.getInstance();
