import { jwtDecode } from "jwt-decode";

export interface decodedTokenType {
  email: string;
  exp: number;
  iat: number;
  isPrimary: boolean;
  isVerified: boolean;
  userId: number;
}

export const formattedDate = (dateString: string): string => {
  const utcDate = new Date(dateString);
  const istDate = new Date(utcDate.getTime());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = istDate.toLocaleDateString("en-IN", options);
  return formattedDate;
};
export const formattedCurrency = (amount: number): string => {
  const options = {
    style: "currency",
    currency: "INR",
  };
  const newAmount = Intl.NumberFormat("en-IN", options).format(amount);
  return newAmount;
};

export const decodeJWT = (): decodedTokenType | null => {
  try {
    const userData = localStorage.getItem("userData");
    if (!userData) return null;
    const userDetails = JSON.parse(userData);
    const token = userDetails?.access_token;
    const decodedToken: decodedTokenType = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const isTokenExpired = (expiryTime: number) => {
  const currentTime = Math.ceil(new Date().getTime() / 1000);
  if (currentTime > expiryTime) {
    return true;
  } else {
    return false;
  }
};
