import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { toast } from "react-toastify";
import * as PATH from "../constant/path";
import { logout, reset } from "../features/auth/authSlice";

export const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  let user_type = data?.data.profile_type;

  useEffect(() => {
    if (user_type !== "BillerGroupAdmin") {
      // toast.error("Invalid User Type");
      dispatch(reset());
      dispatch(logout());
      <Navigate to={PATH.LOGIN} />;
    }
  }, [dispatch, user_type]);

  if (data === undefined) {
    return null;
  }

  return data ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
