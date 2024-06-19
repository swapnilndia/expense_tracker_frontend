// import { apiHelper } from "../utils/apiHelperFunctions";

// interface CheckoutHandlerProps {
//   price: number;
//   currency: string;
// }
// interface GetApiResponse {
//   apiKey: string;
// }

// interface CreateOrderDataResponse {
//   createdAt: string;
//   id: number;
//   isSuccess: boolean;
//   order_amount: number;
//   order_created_at: bigint;
//   order_currency: string;
//   razorpay_order_id: string;
//   updatedAt: string;
//   userId: number;
// }

// interface CreateOrderResponse {
//   data: CreateOrderDataResponse;
//   message: string;
//   metaData: null;
//   status: number;
// }

// export const checkoutHandler = async ({
//   price,
//   currency,
// }: CheckoutHandlerProps) => {
//   const token = JSON.parse(localStorage.getItem("userData") || "").access_token;

//   if (!token) {
//     throw new Error("No access token found");
//   }
//   // Get Razorpay Api from Backend
//   const { apiKey }: GetApiResponse = await apiHelper({
//     method: "GET",
//     url: `${import.meta.env.VITE_API_URL}/get-api`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const response: CreateOrderResponse = await apiHelper({
//     method: "POST",
//     url: `${import.meta.env.VITE_API_URL}/create-order`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data: {
//       amount: price,
//       currency,
//     },
//   });
//   const data: CreateOrderDataResponse = response.data;

//   const options = {
//     key: apiKey,
//     amount: data.order_amount,
//     currency: data.order_currency,
//     name: "Swapnilndia Expense Tracker",
//     description: "Expense Premium Membership",
//     image:
//       "https://lh3.googleusercontent.com/a/AEdFTp5CY_5Y9T5NWd9SspuLKufbILqIIQ2qkA8udfiU=s96-c",
//     order_id: data.razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//     callback_url: `${import.meta.env.VITE_API_URL}/verify-payment`,
//     prefill: {
//       name: "Swapnil Katiyar",
//       email: "Swapnilktr@gmail.com",
//       contact: 9988776655,
//     },
//     notes: {
//       address: "Razorpay Corporate Office",
//     },
//     theme: {
//       color: "#3399cc",
//     },
//     modal: {
//       ondismiss: function () {
//         alert("Transaction cancelled.");
//         window.location.href = `http://localhost:5173/payment-status-failed/${data.razorpay_order_id}`;
//         // Handle actions to take when the payment modal is closed or dismissed
//       },
//     },
//   };

//   const razor = new window.Razorpay(options);

//   razor.open();
// };

import { apiHelper } from "../utils/apiHelperFunctions";
import { RazorpayOptions } from "./razorpay.types";

interface CheckoutHandlerProps {
  price: number;
  currency: string;
}

interface GetApiResponse {
  apiKey: string;
}

interface CreateOrderDataResponse {
  createdAt: string;
  id: number;
  isSuccess: boolean;
  order_amount: number;
  order_created_at: bigint;
  order_currency: string;
  razorpay_order_id: string;
  updatedAt: string;
  userId: number;
}

interface CreateOrderResponse {
  data: CreateOrderDataResponse;
  message: string;
  metaData: null;
  status: number;
}

export const checkoutHandler = async ({
  price,
  currency,
}: CheckoutHandlerProps) => {
  const userData = localStorage.getItem("userData");
  const token = userData ? JSON.parse(userData).access_token : null;

  if (!token) {
    throw new Error("No access token found");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // Get Razorpay Api from Backend
    const { apiKey }: GetApiResponse = await apiHelper({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/get-api`,
      headers,
    });

    // Create Order
    const response: CreateOrderResponse = await apiHelper({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/create-order`,
      headers,
      data: {
        amount: price,
        currency,
      },
    });

    const data: CreateOrderDataResponse = response.data;

    const options: RazorpayOptions = {
      key: apiKey,
      amount: data.order_amount,
      currency: data.order_currency,
      name: "Swapnilndia Expense Tracker",
      description: "Expense Premium Membership",
      image:
        "https://lh3.googleusercontent.com/a/AEdFTp5CY_5Y9T5NWd9SspuLKufbILqIIQ2qkA8udfiU=s96-c",
      order_id: data.razorpay_order_id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${import.meta.env.VITE_API_URL}/verify-payment`,
      prefill: {
        name: "Swapnil Katiyar",
        email: "Swapnilktr@gmail.com",
        contact: "9988776655",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          alert("Transaction cancelled.");
          window.location.href = `${
            import.meta.env.VITE_FRONTEND_URL
          }/payment-status-failed/${data.razorpay_order_id}`;
          // Handle actions to take when the payment modal is closed or dismissed
        },
      },
    };
    // @ts-ignore
    const razor = new window.Razorpay(options);

    razor.open();
  } catch (error) {
    console.error("Error during checkout process:", error);
    throw new Error("Checkout process failed. Please try again.");
  }
};
