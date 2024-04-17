import { authRoutes, unAuthRoutes, adminRoutes } from "./routes";
import { RouterProvider } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../App/Context/UserInfoContext/UserInfoContext.jsx";

export default function RouterWrapper() {
  const { userData, setUserData } = useContext(UserInfoContext);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("userData"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
      if (userData.role === "admin") {
        setIsAdmin(true);
        setIsAuth(false);
        return;
      }
      setIsAuth(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (userData.role === "admin") {
      setIsAdmin(true);
      setIsAuth(false);
      return;
    }
    const isAuth = !Object.values(userData).some((value) => value === "");
    setIsAuth(isAuth);
  }, [userData]);

  const routes = isAdmin ? adminRoutes : isAuth ? authRoutes : unAuthRoutes;

  return <RouterProvider router={routes} />;
}
