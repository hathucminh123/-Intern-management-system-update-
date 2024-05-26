import React from 'react';
import Dashboard from '../../components/MentorComponent/Dashboard';
import Schedule from '../../components/MentorComponent/Schedule';
import TaskPerformance from '../../components/MentorComponent/TaskPerformance';
import Sidebar from '../../components/MentorComponent/ChatRoom/SideBar';
import ChatWindow from '../../components/MentorComponent/ChatRoom/ChatWindow';
import { useLocation } from 'react-router-dom';
import CustomMenu from '../../components/CustomMenu/CustomMenu';

const MentorPage = () => {
  const location = useLocation();

  

  return (
    <CustomMenu>
      {renderPage(location.pathname)}
    </CustomMenu>
  );
};

export default MentorPage;
