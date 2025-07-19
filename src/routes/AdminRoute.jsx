import React from 'react';
import Loading from '../shared/Loading';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loading />;

  if (role !== "admin" || !user) return <Navigate to="/unauthorized" replace />;

   return children;

};

export default AdminRoute;