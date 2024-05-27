import React from "react";
import { Outlet } from "react-router-dom";

const GuestPage = () => {
  return (
    <div>
      <h1>Welcome Guest infor</h1>
      <Outlet />
    </div>
  );
};
export default GuestPage;
