import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { selectLoggedInStatus } from "../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import MenuIconButton from "./MenuIconButton";
import { Dispatch, SetStateAction } from "react";

type SetDarkModeType = Dispatch<SetStateAction<boolean>>;
export default function MenuAppBar({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: SetDarkModeType;
}) {
  const userLoggedInStatus = useSelector(selectLoggedInStatus);

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {" "}
            <CurrencyRupeeIcon />
          </IconButton>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Expense Tracker
          </Typography>
          {darkMode ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDarkMode(false)}
            >
              {" "}
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDarkMode(true)}
            >
              {" "}
              <DarkModeIcon />
            </IconButton>
          )}
          {userLoggedInStatus ? (
            <MenuIconButton />
          ) : (
            <div>
              <Typography
                onClick={() => navigate("/login")}
                variant="h6"
                sx={{ flexGrow: 1 }}
                style={{ cursor: "pointer" }}
              >
                Login
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
