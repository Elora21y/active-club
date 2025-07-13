import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/Dashboardlayout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
    //   { path: "about", Component: About },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      //   { path: "login", Component: Login },
      //   { path: "register", Component: Register },
    ],
  },
  {
    path: "dashboard",
    element : <DashboardLayout/>,
    children: [
     
    ],
  },
]);
