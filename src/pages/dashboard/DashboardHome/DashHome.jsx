import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../shared/Loading";
import DashboardUser from "./DashboardUser";
import DashboardMember from "./DashboardMember";
import DashboardAdmin from "./DasboardAdmin";
import Unauthorized from "../../error/Unauthorized";

const DashHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) return <Loading />;
  if (role === "user") {
    return <DashboardUser />;
  } else if (role === "member") {
    return <DashboardMember />;
  } else if (role === "admin") {
    return <DashboardAdmin />;
  } else {
    return <Unauthorized />;
  }
};

export default DashHome;
