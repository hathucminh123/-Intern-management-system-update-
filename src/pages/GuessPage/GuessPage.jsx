import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/GuessComponent/HeaderComponent/HeaderComponent";
import './GuessPage.css'

const GuestPage = () => {
  return (
    <div className="minh" >
     <HeaderComponent />
      <Outlet />
    </div>
  );
};
export default GuestPage;