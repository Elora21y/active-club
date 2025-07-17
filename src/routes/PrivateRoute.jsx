import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';

const PrivateRoute = ({children}) => {
   const {user , loading} = useAuth()
    const location = useLocation()
    if(loading) return <Loading/>

    if(!user) return <Navigate to='/auth/login' state={location?.pathname}/>
    return children
};

export default PrivateRoute;