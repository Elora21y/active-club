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
import Courts from "../pages/courts/Courts";
import MyBooking from "../pages/dashboard/user/MyBooking";
import MyProfile from "../pages/dashboard/user/MyProfile";
import ApproveBooking from "../pages/dashboard/member/ApproveBooking";
import ApprovalBookings from "../pages/dashboard/admin/ApprovalBookings";
import Payment from "../pages/dashboard/member/Payment";
import PaymentHistory from "../pages/dashboard/member/PaymentHistory";
import ConfirmedBookings from "../pages/dashboard/member/ConfirmedBookings";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import ManageMember from "../pages/dashboard/admin/ManageMember";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import ManageCoupons from "../pages/dashboard/admin/ManageCoupons";
import Announcement from "../pages/dashboard/admin/Announcement";
import AdminRoute from "../routes/AdminRoute";
import Unauthorized from "../pages/error/Unauthorized";
import Page404 from "../pages/error/Page404";
import DashHome from "../pages/dashboard/DashboardHome/DashHome";
import OurTeam from "../pages/OurTeam/OurTeam";
import Blog from "../pages/Blog/Blog";
import FeedbackForm from "../pages/feedback/FeedbackForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/courts",
        Component: Courts,
      },
      {
        path: "/our-team",
        Component: OurTeam,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/give-feedback",
        Component: FeedbackForm,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <Loading />,
    children: [
      {
        index: true,
        Component: DashHome,
      },
      {
        path: "add-court",
        // Component : AddCourt
        element: (
          <AdminRoute>
            <AddCourt />
          </AdminRoute>
        ),
      },
      {
        path: "court",
        // Component : Court
        element: (
          <AdminRoute>
            <Court />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        // Component : AllUsers
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        // Component : ManageCoupons,
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        // Component : ManageMember
        element: (
          <AdminRoute>
            <ManageMember />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "announcements",
        Component: Announcement,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-pending-bookings",
        Component: MyBooking,
      },
      {
        path: "approve-bookings",
        Component: ApproveBooking,
      },
      {
        path: "approval-bookings",
        Component: ApprovalBookings,
      },
      {
        path: "payment/:bookings_id",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "confirmed-bookings",
        Component: ConfirmedBookings,
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
  {
    path: "*",
    Component: Page404,
  },
]);
