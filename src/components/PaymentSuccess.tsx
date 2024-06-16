import { Link, useParams } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { apiHelper } from "../utils/apiHelperFunctions";
import { AxiosResponse } from "axios";

const PaymentSuccess = () => {
  const { razorpay_order_id } = useParams();

  const updateTransaction = async (razorpayOrderId: string) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("userData") || ""
      ).access_token;

      if (!token) {
        throw new Error("No access token found");
      }
      const response: AxiosResponse = await apiHelper({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/update-transaction`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          razorpay_order_id: razorpayOrderId,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (razorpay_order_id) {
      updateTransaction(razorpay_order_id);
    }
  }, [razorpay_order_id]);

  return (
    <Grid container padding="4rem" spacing={4}>
      <Grid item width="100%" justifyContent="center" alignContent="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <CheckBoxIcon color="success" fontSize="large" />
        </Box>
      </Grid>
      <Grid item width="100%">
        <Typography color="green" variant="h4" align="center">
          Payment Successful
        </Typography>
        <Typography color="green" variant="h4" align="center">
          Transaction id: {razorpay_order_id}
        </Typography>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary">
          <Link to="/"> Go to Home page</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default PaymentSuccess;
