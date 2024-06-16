import { useEffect, useState } from "react";
import { ExpenseService } from "../redux/services/expenseService";
type LeaderboardType = {
  id: number;
  name: string;
  email: string;
  isPrimary: boolean;
  total_expenses: number;
};
const useFetchLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      const response = await ExpenseService.getLeaderboard();
      if (response) {
        setLeaderboard(response);
      }
    } catch (err) {
      setError("Failed to fetch Leaderboard"), err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leaderboard === null) {
      fetchLeaderboard();
    }
  }, []);

  return { leaderboard, loading, error };
};

export default useFetchLeaderboard;
