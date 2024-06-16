import { Container, Box, Typography, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const SentMailForgotPassword = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 10,
        py: 4,
        px: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <EmailIcon sx={{ fontSize: 80, color: "primary.main" }} />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Check Your Email
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        We've sent an email to your inbox for reset password. Please check your
        email and click on the reset password link to proceed.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary">
          <Link to="/login"> Go to Login</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default SentMailForgotPassword;
