import React from 'react';
import Dashboard from '../../components/MentorComponent/Dashboard';
import Schedule from '../../components/MentorComponent/Schedule';
import TaskPerformance from '../../components/MentorComponent/TaskPerformance';
import Sidebar from '../../components/MentorComponent/ChatRoom/SideBar';
import ChatWindow from '../../components/MentorComponent/ChatRoom/ChatWindow';
import { useLocation } from 'react-router-dom';
import CustomMenu from '../../components/CustomMenu';

const MentorPage = () => {
  const location = useLocation();

  const renderPage = (key) => {
    switch (key) {
      case '/mentor/home':
        return <Dashboard />;
      case '/mentor/task':
        return <TaskPerformance />;
      case '/mentor/chat':
        return (
          <>
            <Sidebar />
            <ChatWindow />
          </>
        );
      case '/mentor/schedule':
        return <Schedule />;
      default:
        return <div>Không tìm thấy trang</div>;
    }
  };

  return (
    <CustomMenu>
      {renderPage(location.pathname)}
    </CustomMenu>
  );
};

export default MentorPage;
