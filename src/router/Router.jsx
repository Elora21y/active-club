
import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


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
 },
 {
  path : '/auth',
  Component : AuthLayout,
  children : [
    {
      path : 'login' ,
      Component : Login
    },
    {
      path : 'register',
      Component : Register,
    }
  ]
 },
 
]);
