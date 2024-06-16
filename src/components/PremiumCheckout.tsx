import { Button, CardContent, Grid, Paper, Typography } from "@mui/material";
import { checkoutHandler } from "../config/razorpay";
import useAccessToken from "../hooks/useAccessToken";

const PremiumCheckout = () => {
  const decodedToken = useAccessToken();
  const buyPrimiumHandler = async () => {
    const data = {
      price: 10,
      currency: "INR",
    };
    await checkoutHandler(data);
  };

  return (
    <Paper>
      <Grid container padding={2} gap={3}>
        <Grid
          item
          md={5}
          sm={12}
          width="100%"
          border="1px solid black"
          borderRadius={2}
          margin="auto"
        >
          <CardContent style={{ width: "100%", height: "100%" }}>
            <Typography variant="h4" align="center">
              Plan: Free {!decodedToken?.isPrimary && "(Current)"}
            </Typography>

            <Typography variant="body1" mt={2}>
              - Track unlimited expenses
            </Typography>
            <Typography variant="body1">- Basic reporting</Typography>
            <Typography variant="body1">- Manual data entry</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          md={5}
          sm={12}
          width="100%"
          border="1px solid black"
          borderRadius={2}
        >
          <CardContent>
            <Typography align="center" variant="h4">
              Plan: Paid {decodedToken?.isPrimary && "(Current)"}
            </Typography>
            <Typography variant="body1" mt={2}>
              - All Free Plan features
            </Typography>
            <Typography variant="body1">
              - Advanced reporting and analytics
            </Typography>
            <Typography variant="body1">
              - Automated data entry with receipt scanning
            </Typography>
            <Typography variant="body1">
              - Multi-device synchronization
            </Typography>
            <Typography variant="body1">- Priority customer support</Typography>
            <Button
              variant="contained"
              // disabled={decodedToken?.isPrimary}
              fullWidth
              onClick={buyPrimiumHandler}
            >
              Buy Premium
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PremiumCheckout;
