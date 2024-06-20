import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import BuyPremiumButton from "./BuyPremiumButton";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { logoutAction } from "../redux/asyncAction/userAsyncAction";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import useFetchUserDetails from "../hooks/useFetchUserDetails";

const MenuIconButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useFetchUserDetails();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profilePageHandler = () => {
    navigate("/profile");
    handleClose();
  };
  const downloadsPageHandler = () => {
    navigate("/download-history");
    handleClose();
  };
  const LeaderboardPageHandler = () => {
    navigate("/leaderboard");
    handleClose();
  };

  const logoutHandler = async () => {
    const response = await dispatch(logoutAction());
    const responseType = response?.type.split("/")[1];
    if (responseType === "fulfilled") {
      navigate("/login");
      handleClose();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <BuyPremiumButton />
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {" "}
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={profilePageHandler}>View Profile</MenuItem>
        {user && user.isPrimary && (
          <MenuItem onClick={LeaderboardPageHandler}>Leaderboard</MenuItem>
        )}
        {user && user.isPrimary && (
          <MenuItem onClick={downloadsPageHandler}>Download History</MenuItem>
        )}

        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuIconButton;
