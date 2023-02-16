import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import * as PATH from "../constant/path";
import { logout, reset } from "../features/auth/authSlice";

export const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  let user_type = data?.data.profile_type;

  if (
    !(
      user_type === "Administrator" ||
      user_type === "ProfilePartner" ||
      user_type === "ProfileInstitution" ||
      user_type === "BillerGroupAdmin" ||
      user_type === "ProfileAccounting"
    )
  ) {
    toast.error("Unauthorized Access");
    dispatch(reset());
    dispatch(logout());
    <Navigate to={PATH.LOGIN} />;
  }

  if (data === undefined) {
    return null;
  }

  return data ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
