
import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/DashboardLayout";


export const router = createBrowserRouter([
 {
  path : '/',
  Component : RootLayout,
  children : [
    {
      index : true ,
      Component : Home
    }
  ]
 }
]);
