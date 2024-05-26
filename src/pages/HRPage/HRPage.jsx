import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  ContactsOutlined,
  ProjectOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Campaings from "../../components/HR/CampaignsComponent/Campaings";
import HRCampaignsDetails from "../../components/HR/CampaignsComponent/HRCampaignsDetails";

const { Header, Sider, Content } = Layout;

const HRPage = () => {


 

  

  // useEffect(() => {
  //   handleGetDetailsUser();
  // }, []);

  // const handleGetDetailsUser = () => {
  //   try {
  //     const isLoggined = localStorage.getItem("Auth");
  //     if (!isLoggined) {
  //       navigate('/sign-in')
  //     } else {
  //       setIsLoading(false);
  //       navigate('/mentor')
  //     }
  //   } catch {
  //     navigate("/sign-in");
  //   }
  // };
  return (
    <CustomMenu>
      {renderPage(location.pathname)}
    </CustomMenu>
  );
};

export default HRPage;
