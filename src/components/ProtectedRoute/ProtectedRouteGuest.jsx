import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  // Kiểm tra xem người dùng có đăng nhập hay không
  const user = sessionStorage.getItem('Auth'); 
  return user ? true : false;
};

const ProtectedRouteGuest = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteGuest;
