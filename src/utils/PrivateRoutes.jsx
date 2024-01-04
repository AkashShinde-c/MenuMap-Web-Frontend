import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  return localStorage.getItem("isTutorialComplete") ? (
    <Outlet />
  ) : (
    <Navigate to="/get-started" />
  );
};

export default PrivateRoutes;
