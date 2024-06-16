import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { resetPasswordType } from "../utils/types";
import { resetPasswordSchema } from "../utils/schema";
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "../redux/asyncAction/userAsyncAction";
import { AppDispatch } from "../redux/appStore";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tokenValue = queryParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const resetPassword = async (data: resetPasswordType) => {
    const { password } = data;
    const response = await dispatch(
      resetPasswordAction({ token: tokenValue ?? "", password })
    );
    const responseType = response?.type.split("/")[1];
    if (responseType === "fulfilled") {
      navigate("/login");
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
        <form noValidate onSubmit={handleSubmit(resetPassword)}>
          <Typography variant="h5" align="center">
            Reset Password
          </Typography>
          <TextField
            margin="normal"
            autoFocus
            required
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            helperText={errors.password?.message}
          />{" "}
          <TextField
            margin="normal"
            autoFocus
            required
            {...register("confirmPassword")}
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            helperText={errors.confirmPassword?.message}
          />{" "}
          <Button variant="contained" type="submit" fullWidth>
            Reset Password
          </Button>
        </form>{" "}
      </CardContent>{" "}
    </Card>
  );
};

export default ResetPassword;

// http://localhost:5173/reset-password?token=$2b$10$KSo21/GkVKq4DOQjmrbua..jycch4BXJrC0HKUVURIToBqaWS.OQi
