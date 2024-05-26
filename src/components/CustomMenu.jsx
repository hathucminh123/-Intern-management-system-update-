import React, { useState, useEffect, useRef } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MailOutlined,
  BellFilled,
  HomeOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  WechatWorkOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Drawer, Layout, List, Menu, Row, Space, Typography, theme, Popover } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './CustomMenu.css';
import { getComment } from '../api/index';
import Logo from '../components/Logo/Logo';

const { Header, Sider, Content } = Layout;

const CustomMenu = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const popoverRef = useRef(null);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComment().then((res) => {
      setComments(res.comments);
    });
  }, []);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const items = {
    mentor: [
      {
        key: '/mentor/home',
        icon: <HomeOutlined />,
        label: 'Trang chủ',
      },
      {
        key: '/mentor/task',
        icon: <AppstoreOutlined />,
        label: 'Quản lý Task',
      },
      {
        key: '/mentor/chat',
        icon: <WechatWorkOutlined />,
        label: 'Chat',
      },
      {
        key: '/mentor/schedule',
        icon: <AreaChartOutlined />,
        label: 'Lịch trình',
      },
    ],
    hr: [
      {
        key: '/hr/home',
        icon: <HomeOutlined />,
        label: 'Trang chủ',
      },
    ],
  };

  const userItems = items[userRole] || [];

  const handleClickNavigate = (type) => {
    if (type === 'logout') {
      navigate('/sign-in');
    }
  };

  const content = (
    <div>
      <div className='WrapperContentPopup' onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</div>
      <div className='WrapperContentPopup' onClick={() => handleClickNavigate('logout')}>Đăng xuất</div>
    </div>
  );

  return (
    <Layout className='Header'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            height: '100vh',
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            fontSize: '1rem',
            position: 'relative',
          }}
          onClick={handleMenuClick}
          items={userItems} // Use items instead of children
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col md={21}>
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
            </Col>
            <Col md={3}>
              <Space size={10}>
                <Avatar size="default" icon={<UserOutlined />} />
                <Popover
                  content={content}
                  trigger="click"
                  open={isOpenPopup}
                  onOpenChange={(newOpen) => setIsOpenPopup(newOpen)}
                  getPopupContainer={() => popoverRef.current}
                  
              
                >
                  <div ref={popoverRef} className='nameaccount' onClick={() => setIsOpenPopup(!isOpenPopup)}>Hà Thúc Minh</div>
                </Popover>
                <Badge count={comments.length} dot>
                  <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
                </Badge>
                <Badge count={comments.length}>
                  <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
                </Badge>
                <Drawer title="Thông báo" onClose={() => setNotificationOpen(false)} open={notificationOpen} maskClosable>
                  <List
                    dataSource={comments}
                    renderItem={(item) => (
                      <List.Item>{item.body}</List.Item>
                    )}
                  />
                </Drawer>
                <Drawer title="Tin nhắn" onClose={() => setCommentsOpen(false)} open={commentsOpen} maskClosable>
                  <List
                    dataSource={comments}
                    renderItem={(item) => (
                      <List.Item><Typography.Text strong>{item.body}</Typography.Text></List.Item>
                    )}
                  />
                </Drawer>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'auto',
            minWidth: 'auto',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomMenu;
