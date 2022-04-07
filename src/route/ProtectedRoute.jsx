import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // const { isAuth } = useAuth();
  const isAuth = localStorage.getItem("isAuth");
  console.log(isAuth);

  return isAuth ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export { ProtectedRoute };