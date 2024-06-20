import { Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import { useSelector } from "react-redux";
import { selectDetailedUser } from "../redux/reducers/userReducer";
const BuyPremiumButton = () => {
  const user = useSelector(selectDetailedUser);
  const navigate = useNavigate();

  return (
    <div>
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
    </div>
  );
};

export default BuyPremiumButton;
