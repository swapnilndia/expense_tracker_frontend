import { Link, useParams } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const PaymentFailed = () => {
  const { razorpay_order_id } = useParams();

  return (
    <Grid container padding="4rem" spacing={4}>
      <Grid item width="100%" justifyContent="center" alignContent="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <CheckBoxIcon color="error" fontSize="large" />
        </Box>
      </Grid>
      <Grid item width="100%">
        <Typography color="error" variant="h4" align="center">
          Payment Failed
        </Typography>
        <Typography color="error" variant="h4" align="center">
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

export default PaymentFailed;
