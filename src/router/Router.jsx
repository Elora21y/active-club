
import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Court from "../pages/court/Court";
import AddCourt from "../pages/court/AddCourt";
import PrivateRoute from "../routes/PrivateRoute";
import Loading from "../shared/Loading";


export const router = createBrowserRouter([
 {
  path : '/',
  Component : RootLayout,
  hydrateFallbackElement : <Loading/>,
  children : [
    {
      index : true ,
      Component : Home
    },
    {
      path : '/court',
      Component : Court
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
 {
  path : '/dashboard',
  element : <PrivateRoute><DashboardLayout/></PrivateRoute>,
  hydrateFallbackElement: <Loading/>,
  children : [
    {
      path : 'add-court',
      Component : AddCourt
    }
  ]
 }
 
]);
