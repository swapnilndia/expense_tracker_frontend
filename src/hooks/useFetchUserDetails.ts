import { useEffect, useState } from "react";
import { UserService } from "../redux/services/userServices";
type userInfoType = {
  email: string;
  id: number;
  isPrimary: boolean;
  isVerified: boolean;
  name: string;
};
const useFetchUserDetails = () => {
  const [user, setUser] = useState<userInfoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const response = await UserService.getUserDetails();
      if (response) {
        setUser(response);
      }
    } catch (err) {
      setError("Failed to fetch user details"), err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === null) {
      fetchUser();
    }
  }, []);

  return { user, loading, error };
};

export default useFetchUserDetails;
