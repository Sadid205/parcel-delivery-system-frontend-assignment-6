import App from "@/App";
import Home from "@/pages/Public/Home";
import Login from "@/pages/Public/Login";
import Me from "@/pages/Public/Me";
import Register from "@/pages/Public/Register";
import Unauthorized from "@/pages/Public/Unauthorized";
import Verify from "@/pages/Public/Verify";
import CancelParcel from "@/pages/User/CancelParcel";
import CreateParcel from "@/pages/User/CreateParcel";
import History from "@/pages/User/History";
import TrackParcel from "@/pages/User/TrackParcel";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { deliveryManSidebarItems } from "./deliveryManSidebarItems";
import { adminSidebarItems } from "./adminSidebaritems";
import { userSidebarItems } from "./userSidebarItems";

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
  {
    Component: App,
    path: "/user",

    children: [
      {
        index: true,
        element: <Navigate to="/user/me" />,
      },
      {
        path: "me",
        Component: Me,
      },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: App,
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/get-all-parcel" />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: App,
    path: "/delivery-man",
    children: [
      {
        index: true,
        element: <Navigate to="/delivery-man/assigned-parcels" />,
      },
      ...generateRoutes(deliveryManSidebarItems),
    ],
  },
]);
