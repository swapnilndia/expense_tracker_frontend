import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../redux/reducers/userReducer";

const RequireAuth = () => {
  const userDetails = useSelector(selectUser);
  const location = useLocation();

  return userDetails ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
