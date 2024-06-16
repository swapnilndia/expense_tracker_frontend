import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../redux/reducers/userReducer";

const RedirectIfAuthenticated = () => {
  const userDetails = useSelector(selectUser);
  return userDetails ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;
