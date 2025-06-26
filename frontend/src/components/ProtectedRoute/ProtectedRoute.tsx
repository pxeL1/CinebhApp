import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User } from "models/User";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");

  useEffect(() => {
    if (!userString) {
      navigate("/");
      return;
    }

    const user: User = JSON.parse(userString);
    const isAdmin =
      user.roles
        .map((userRole) => userRole.role)
        .find((role) => role.name === "ADMIN") !== undefined;

    if (!isAdmin) navigate("/");
  }, [navigate, userString]);

  return <Outlet />;
}
