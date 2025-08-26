import App from "@/App";
import Home from "@/pages/Public/Home";
import Login from "@/pages/Public/Login";
import Register from "@/pages/Public/Register";
import Unauthorized from "@/pages/Public/Unauthorized";
import Verify from "@/pages/Public/Verify";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/public/home" />,
  },
  {
    Component: App,
    path: "/public",
    children: [
      {
        index: true,
        element: <Navigate to="/public/home" />,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "verify",
        Component: Verify,
      },
      {
        path: "unauthorized",
        Component: Unauthorized,
      },
    ],
  },
]);
