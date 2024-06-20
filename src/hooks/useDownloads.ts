import { useEffect, useState } from "react";
import { ExpenseService } from "../redux/services/expenseService";
type DownloadType = {
  id: number;
  fileName: string;
  downloadURL: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  userId: 1;
};
const useFetchDownloads = () => {
  const [downloadList, setDownloadList] = useState<DownloadType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      const response = await ExpenseService.getDownloadsList();
      if (response) {
        setDownloadList(response);
      }
    } catch (err) {
      setError("Failed to fetch Leaderboard"), err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (downloadList === null) {
      fetchLeaderboard();
    }
  }, []);

  return { downloadList, loading, error };
};

export default useFetchDownloads;
