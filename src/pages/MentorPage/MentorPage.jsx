import React, { useState,useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined, AppstoreOutlined, AreaChartOutlined, ContactsOutlined, ProjectOutlined, WechatWorkOutlined,
  MailOutlined,
  BellFilled
} from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Drawer, Layout, List, Menu, Row, Space, Typography, theme } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Dashboard from '../../components/MentorComponent/Dashboard';
import "./MentorPage.css"
import { getComment } from '../../api';

import Schedule from '../../components/MentorComponent/Schedule';
import TaskCompleted from '../../components/MentorComponent/TaskCompleted';
import Chat from '../../components/MentorComponent/Chat';
import Sidebar from '../../components/MentorComponent/ChatRoom/SideBar';
import ChatWindow from '../../components/MentorComponent/ChatRoom/ChatWindow';
import TaskPerformance from '../../components/MentorComponent/TaskPerformance';

const { Header, Sider, Content } = Layout;

const MentorPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location =useLocation()
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState(' ');
  const [commentsopen,setCommentopen]=useState(false)
  const [notificationopen,setNotificationopen]=useState(false)


  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };
  
const [comments,setComment]=useState([])
useEffect(()=>{
  getComment().then((res)=>{
   setComment(res.comments)
  })
},[])
   


useEffect(()=>{
        const pathname=location.pathname
        setSelectedKey(pathname)
   },[location.pathname])
  
const renderPage = (key) => {
    switch (key) {
      case 'home':
        return <Dashboard/>;
     
      case 'task':
            return <TaskPerformance/>;
      case 'chat':
        return <>
        <Sidebar/>
        <ChatWindow/>
        </>
        
      case 'schedule':
        return <Schedule/>;
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
      label: 'Quản lý Task',
    
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
    <Layout className='Header'>
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
          <Row>
            <Col md={21} >
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
             <Space size={15}> 
                 <Avatar size="default" icon={<UserOutlined/>}></Avatar>Ha Thuc Minh
                 <Badge count={comments.length} dot>
                 <MailOutlined style={{fontSize:24}} onClick={()=>{setCommentopen(true)}}/>
                 </Badge>
                 <Badge count={comments.length}>
                 <BellFilled style={{fontSize:24}} onClick={()=>{setNotificationopen(true)}}/>
                 </Badge>
                 <Drawer title="Thông báo" onClick={()=>{setNotificationopen(false)}} open={notificationopen} maskClosable>
                 <List dataSource={comments} renderItem={(item)=>(
                  <List.Item> {item.body}</List.Item>
                 )}>
                  
                 </List>

                 </Drawer>
                 <Drawer title="Tin nhắn" onClick={()=>{setCommentopen(false)}} open={commentsopen} maskClosable>
                 <List dataSource={comments} renderItem={(item)=>(
                  <List.Item> <Typography.Text strong > {item.body}</Typography.Text>asdasd</List.Item>
                 )}></List>
                 </Drawer>

             </Space>
            
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            display:'flex',
            height:'100vh',
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            // backgroundColor:'rgba(0,0,0,0.015)'
       
          
          }}
        >
         { renderPage(selectedKey) }     
        </Content>
      </Layout>
    </Layout>
  );
};

export default MentorPage;
