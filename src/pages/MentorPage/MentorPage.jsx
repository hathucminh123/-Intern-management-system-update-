import React, { useState,useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined, AppstoreOutlined, AreaChartOutlined, ContactsOutlined, ProjectOutlined, WechatWorkOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

const { Header, Sider, Content } = Layout;

const MentorPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState(' ');

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case 'home':
        return <>home</>;
      case 'task-1':
        return <>Tạo task</>;
      case 'task-2':
            return <>task hoàn thành</>;
      case 'chat':
        return <>chat </>
        
      case 'schedule':
        return <div>lịch trình</div>;
      case 'setting':
        return <div>cai dat</div>;
      default:
        return <></>;
    }
  };

  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    
    },
    {
      key: 'task',
      icon: <AppstoreOutlined />,
      label: 'Task',
      children:[
        {
            key: 'task-1',
            label: ' Tạo Task ',
          },
        {
            key: 'task-2',
            label: 'Task hoàn thành',
          },
      ],
    },
    {
      key: 'chat',
      icon: <WechatWorkOutlined />,
      label: 'chat',
    },
    {
        key: 'schedule',
        icon: <AreaChartOutlined />,
        label: 'Lịch trình',
      },
  ];
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
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['sub1']} // Chỉ định mục được chọn mặc định
          style={{
            height: '100vh',
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            fontSize: '1rem',
            position: 'relative',
          }}
          items={items}
          onClick={handleMenuClick} // Sử dụng sự kiện onClick thay vì handleMenuClick
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         { renderPage(selectedKey) }     
        </Content>
      </Layout>
    </Layout>
  );
};

export default MentorPage;
