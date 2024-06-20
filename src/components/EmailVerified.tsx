import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { AppDispatch } from "../redux/appStore";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserAction,
  verifyUserFinalizeAction,
} from "../redux/asyncAction/userAsyncAction";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EmailVerified = () => {
  const dispatch: AppDispatch = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const tokenValue = queryParams.get("token");

  const verifyEmail = async (tokenValue: string) => {
    const response = await dispatch(
      verifyUserFinalizeAction({ token: tokenValue ?? "" })
    );
    const responseType = response?.type.split("/")[1];
    if (responseType === "fulfilled") {
      setVerificationStatus(true);
      dispatch(getUserAction());
    }
  };

  useEffect(() => {
    if (tokenValue) {
      verifyEmail(tokenValue);
    }
  }, [tokenValue]);

  return (
    <Card
      sx={{
        maxWidth: 750,
        margin: "50px auto 20px auto",
        border: "1px solid black",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        {!verificationStatus ? (
          <Box
            padding={4}
            display="flex"
            flexDirection="column"
            gap={6}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={100} />
            <Typography>Fetching info</Typography>
            <Button variant="contained" color="primary">
              <Link to="/"> Go to Home page</Link>
            </Button>
          </Box>
        ) : (
          <Box
            padding={4}
            display="flex"
            flexDirection="column"
            gap={6}
            justifyContent="center"
            alignItems="center"
          >
            <CheckCircleOutlineIcon
              sx={{ width: 100, height: "auto" }}
            ></CheckCircleOutlineIcon>
            <Typography>Verified</Typography>
            <Button variant="contained" color="primary">
              <Link to="/"> Go to Home page</Link>
            </Button>
          </Box>
        )}
      </CardContent>{" "}
    </Card>
  );
};

export default EmailVerified;
