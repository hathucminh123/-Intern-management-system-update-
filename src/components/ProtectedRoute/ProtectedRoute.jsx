import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  // Kiểm tra xem người dùng có đăng nhập hay không
  const user = localStorage.getItem('Auth'); // Giả sử bạn lưu thông tin đăng nhập trong localStorage
  return user ? true : false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
