import React from 'react';
import Dashboard from '../../components/MentorComponent/Dashboard';
import Schedule from '../../components/MentorComponent/Schedule';
import TaskPerformance from '../../components/MentorComponent/TaskPerformance';
import Sidebar from '../../components/MentorComponent/ChatRoom/SideBar';
import ChatWindow from '../../components/MentorComponent/ChatRoom/ChatWindow';
import { useLocation } from 'react-router-dom';
import CustomMenu from '../../components/CustomMenu';

const InternPage = () => {
  const location = useLocation();

  const renderPage = (key) => {
    switch (key) {
      case '/intern/home':
        return <Dashboard />;
      case '/intern/task':
        return <TaskPerformance />;
      case '/intern/chat':
        return (
          <>
            <Sidebar />
            <ChatWindow />
          </>
        );
      case '/intern/schedule':
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

export default InternPage;
