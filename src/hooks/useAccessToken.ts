import { useEffect, useState } from "react";
import { decodedTokenType } from "../utils/helperFunctions";
import { jwtDecode } from "jwt-decode";

const useAccessToken = () => {
  const [decodedToken, setDecodedToken] = useState<decodedTokenType | null>(
    null
  );

  const decodeJWT = () => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setDecodedToken(null);
        return null;
      }
      const userDetails = JSON.parse(userData);
      const token = userDetails?.access_token;
      if (token) {
        const decodedToken: decodedTokenType = jwtDecode(token);
        setDecodedToken(decodedToken);
      } else {
        setDecodedToken(null);
      }
    } catch (error) {
      setDecodedToken(null);
    }
  };
  useEffect(() => {
    decodeJWT();
  }, []);

  return decodedToken;
};

export default useAccessToken;
