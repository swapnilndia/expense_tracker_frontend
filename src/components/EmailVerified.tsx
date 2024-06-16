import { Card, CardContent } from "@mui/material";
import { AppDispatch } from "../redux/appStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyUserFinalizeAction } from "../redux/asyncAction/userAsyncAction";
// import { resetPasswordType } from "../utils/types";
// import { useDispatch } from "react-redux";
// import { resetPasswordAction } from "../redux/asyncAction/userAsyncAction";
// import { AppDispatch } from "../redux/appStore";
// import { useNavigate } from "react-router-dom";

const EmailVerified = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tokenValue = queryParams.get("token");

  //   const resetPassword = async (data: resetPasswordType) => {
  //     const { password } = data;
  //     const response = await dispatch(
  //       resetPasswordAction({ token: tokenValue ?? "", password })
  //     );
  //     const responseType = response?.type.split("/")[1];
  //     if (responseType === "fulfilled") {
  //       navigate("/login");
  //     }
  //   };

  const resetPassword = async (tokenValue: string) => {
    const response = await dispatch(
      verifyUserFinalizeAction({ token: tokenValue ?? "" })
    );
    const responseType = response?.type.split("/")[1];
    if (responseType === "fulfilled") {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (tokenValue) {
      resetPassword(tokenValue);
    }
  }, [tokenValue]);

  return (
    <Card
      sx={{
        maxWidth: 750,
        margin: "20px auto auto auto",
        border: "1px solid black",
      }}
    >
      <CardContent></CardContent>{" "}
    </Card>
  );
};

export default EmailVerified;
