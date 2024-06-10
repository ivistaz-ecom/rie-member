import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = Cookies.get('token');
  const sessionToken = sessionStorage.getItem('r_TokenMember_Session');
  const sessionInfo = sessionStorage.getItem('r_TokenMember_Info');

  if (token && sessionToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;