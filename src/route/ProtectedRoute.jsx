import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("isAuth");

  return isAuth ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export { ProtectedRoute };