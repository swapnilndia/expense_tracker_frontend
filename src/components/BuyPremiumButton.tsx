import { Button, Chip, Typography } from "@mui/material";
import useFetchUserDetails from "../hooks/useFetchUserDetails";
import { useNavigate } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
const BuyPremiumButton = () => {
  const { user, loading } = useFetchUserDetails();
  const navigate = useNavigate();

  return (
    <div>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {user?.isPrimary ? (
            <Chip icon={<PaidIcon />} label="Premium" color="success" />
          ) : (
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate("/premium")}
            >
              Buy Premium
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default BuyPremiumButton;
