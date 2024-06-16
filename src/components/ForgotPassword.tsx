import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordType } from "../utils/types";
import { forgotPasswordSchema } from "../utils/schema";
import { UserService } from "../redux/services/userServices";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const forgotPasswordHandler = async (data: forgotPasswordType) => {
    const { email } = data;
    const response = await UserService.userForgotPassword({ email });
    if (response?.status === 200) {
      navigate("/sent-mail-forgot-password");
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 750,
        margin: "20px auto auto auto",
        border: "1px solid black",
      }}
    >
      <CardContent>
        <form noValidate onSubmit={handleSubmit(forgotPasswordHandler)}>
          <Typography variant="h5" align="center">
            Forgot Password
          </Typography>
          <TextField
            margin="normal"
            autoFocus
            required
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email")}
            helperText={errors.email?.message}
          />

          <Button variant="contained" type="submit" fullWidth>
            Send Email with Reset Password Link
          </Button>
        </form>{" "}
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="span">Back to Login?</Typography>
          <Link to={"/login"}>login</Link>
        </Box>
      </CardContent>{" "}
    </Card>
  );
};

export default ForgotPassword;
