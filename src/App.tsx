import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import MenuAppBar from "./components/MenuAppBar";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import AddExpense from "./components/AddExpense";
import EditExpense from "./components/EditExpense";
import PremiumCheckout from "./components/PremiumCheckout";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import Leaderboard from "./components/Leaderboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import SentMailVerifyEmail from "./components/SentMailVerifyEmail";
import EmailVerified from "./components/EmailVerified";
import SentMailForgotPassword from "./components/SentMailForgotPassword";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import Downloads from "./components/Downloads";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <MenuAppBar setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/sent-mail-forgot-password"
              element={<SentMailForgotPassword />}
            />
          </Route>
          <Route />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/settings" element={<SettingsPage />}></Route>
            <Route path="/addExpense" element={<AddExpense />}></Route>
            <Route path="/premium" element={<PremiumCheckout />}></Route>
            <Route
              path="/editExpense/:expenseId"
              element={<EditExpense />}
            ></Route>
            <Route
              path="/payment-status-success/:razorpay_order_id"
              element={<PaymentSuccess />}
            ></Route>
            <Route
              path="/payment-status-failed/:razorpay_order_id"
              element={<PaymentFailed />}
            ></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route
              path="/sent-mail-verify"
              element={<SentMailVerifyEmail />}
            ></Route>
            <Route path="/download-history" element={<Downloads />}></Route>
          </Route>
          <Route path="*" element={<Missing />}></Route>
          <Route path="/verify-email" element={<EmailVerified />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
