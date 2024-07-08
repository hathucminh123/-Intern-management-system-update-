import React, { useState, useEffect, useRef } from "react";
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
  ProjectOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Layout,
  List,
  Menu,
  Row,
  Space,
  Typography,
  Popover,
} from "antd";
import { MdClass } from "react-icons/md";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./CustomMenu.css";
import { MdOutlineCampaign, MdEngineering } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { getComment } from "../../api/index";
import Logo from "../Logo/Logo";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaUsers,FaChevronRight } from "react-icons/fa";
import { FaSquarePollVertical } from "react-icons/fa6";


const { Header, Sider, Content } = Layout;

const CustomMenu = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    if (localStorage.getItem("role").toLowerCase() !== userRole.toLowerCase()) {
      navigate(`/${localStorage.getItem("role").toLowerCase()}`, { replace: true });
    }
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const items = {
    mentor: [
      { key: "/mentor/schedule", icon: <AreaChartOutlined />, label: "Meeting" },
      // { key: "/mentor/taskboard", icon: <AppstoreOutlined />, label: "Task Board" },
      { key: "/mentor/task", icon: <AppstoreOutlined />, label: "Task" },
      { key: "/mentor/chat", icon: <WechatWorkOutlined />, label: "Chat" },
      { key: "/mentor/class", icon: <FaUsers/>, label: "student list" },
      { key: "/mentor/Report", icon: <FaSquarePollVertical />, label: "Manage Report",

        children:[
          { key: "/mentor/NewReport", icon: <FaChevronRight />, label: "Make Report" },
          { key: "/mentor/UserListReport", icon: <FaChevronRight />, label: "List Report User" },

        ]
       },
    ],
    hrmanager: [
      { key: "/hrmanager/home", icon: <HomeOutlined />, label: "Home" },
      { key: "/hrmanager/jobs", icon: <MdEngineering />, label: "Jobs" },
      { key: "/hrmanager/campaigns", icon: <MdOutlineCampaign />, label: "Campaigns" },
      { key: "/hrmanager/schedule", icon: <AreaChartOutlined />, label: "Meeting" },
      { key: "/hrmanager/User", 
        icon:<FaUsers/>, 
        label: "User",
        children:[
          { key: "/hrmanager/NewUser", icon: <FaChevronRight />, label: "New" },
          { key: "/hrmanager/UserList", icon: <FaChevronRight />, label: "List User" },

        ] },

    ],
    internshipcoordinators: [
      { key: "/internshipcoordinators/schedule", icon: <AreaChartOutlined />, label: "Meeting" },
      {
        key: "/internshipcoordinators/training-program",
        icon: <ProjectOutlined />,
        label: "Training Program",
        children: [
          { key: "/internshipcoordinators/NewTrainingProgram", icon: <PlusSquareOutlined />, label: "Create" },
          { key: "/internshipcoordinators/ViewTrainingProgram", icon: <ProjectOutlined />, label: "View" },
        ],
      },
      { key: "/internshipcoordinators/class", icon: < MdClass />, label: "Class jobs" },
      { key: "/internshipcoordinators/ResourceList", icon: <GrResources />, label: "Resource" },
      { key: "/internshipcoordinators/KPIList", icon: <GrResources />, label: "KPIList" },
      { key: "/internshipcoordinators/MentorList", icon: <LiaChalkboardTeacherSolid />, label: "MentorList" },
    ],
    intern: [
      // { key: "/intern/home", icon: <HomeOutlined />, label: "Home" },
      { key: "/intern/schedule", icon: <AreaChartOutlined />, label: "Meeting" },
      { key: "/intern/Trainingprogram", icon: <ProjectOutlined />, label: "Training Program" },
      { key: "/intern/taskboard", icon: <AppstoreOutlined />, label: "Task" },
      { key: "/intern/chat", icon: <WechatWorkOutlined />, label: "Chat" },
      { key: "/intern/internReport", icon: <FaSquarePollVertical />, label: "Intern Report" },
      
    ],
  };
const userRolle=localStorage.getItem('role');
  const userItems = items[userRole] || [];

  const handleClickNavigate = (type) => {
    if (type === "logout") {
      localStorage.clear();
      navigate("/sign-in");
    }
  };

  const content = (
    <div>
      <div className="WrapperContentPopup" onClick={() => handleClickNavigate("profile")}>
        User Information
      </div>
      <div className="WrapperContentPopup" onClick={() => handleClickNavigate("logout")}>
        Logout
      </div>
    </div>
  );

  return (
    <Layout className="Header sidebar">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh", position: "fixed", left: 0, backgroundColor: 'white' }}
      >
        <Logo />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "calc(100% - 64px)", marginTop: "64px", fontSize: "1rem", backgroundColor: 'white' }}
          onClick={handleMenuClick}
          items={userItems}
        />
      </Sider>


      <Layout style={{ marginLeft: collapsed ? "80px" : "200px", transition: "all 0.2s" }}>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            position: "fixed",
            width: `calc(100% - ${collapsed ? "80px" : "200px"})`,
            left: collapsed ? "80px" : "200px",
            zIndex: 10000,
            transition: "all 0.2s",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
            </Col>
            <Col>
            {userRolle =="internshipcoordinators" && (
               <Space size={10} align="center" style={{ marginRight: "30px" }}>
              
              
               <Popover
                 content={content}
                 trigger="click"
                 open={isOpenPopup}
                 onOpenChange={(newOpen) => setIsOpenPopup(newOpen)}
                 getPopupContainer={() => popoverRef.current}
               >
                 <div
                   ref={popoverRef}
                   onClick={() => setIsOpenPopup(!isOpenPopup)}
                   style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                 >
                   <Avatar size="default" icon={<UserOutlined />} />
                   <Typography.Text>internshipcoordinators</Typography.Text>
                 </div>
               </Popover>
               <Badge count={comments.length} dot>
                 <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
               </Badge>
               <Badge count={comments.length}>
                 <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
               </Badge>
             </Space>
            )}
               {userRolle =="hrmanager" && (
               <Space size={10} align="center" style={{ marginRight: "30px" }}>
              
              
               <Popover
                 content={content}
                 trigger="click"
                 open={isOpenPopup}
                 onOpenChange={(newOpen) => setIsOpenPopup(newOpen)}
                 getPopupContainer={() => popoverRef.current}
               >
                 <div
                   ref={popoverRef}
                   onClick={() => setIsOpenPopup(!isOpenPopup)}
                   style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                 >
                   <Avatar size="default" icon={<UserOutlined />} />
                   <Typography.Text>hrmanager </Typography.Text>
                 </div>
               </Popover>
               <Badge count={comments.length} dot>
                 <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
               </Badge>
               <Badge count={comments.length}>
                 <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
               </Badge>
             </Space>
            )}
               {userRolle =="mentor" && (
               <Space size={10} align="center" style={{ marginRight: "30px" }}>
              
              
               <Popover
                 content={content}
                 trigger="click"
                 open={isOpenPopup}
                 onOpenChange={(newOpen) => setIsOpenPopup(newOpen)}
                 getPopupContainer={() => popoverRef.current}
               >
                 <div
                   ref={popoverRef}
                   onClick={() => setIsOpenPopup(!isOpenPopup)}
                   style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                 >
                   <Avatar size="default" icon={<UserOutlined />} />
                   <Typography.Text>mentor</Typography.Text>
                 </div>
               </Popover>
               <Badge count={comments.length} dot>
                 <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
               </Badge>
               <Badge count={comments.length}>
                 <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
               </Badge>
             </Space>
            )}
               {userRolle =="intern" && (
               <Space size={10} align="center" style={{ marginRight: "30px" }}>
              
              
               <Popover
                 content={content}
                 trigger="click"
                 open={isOpenPopup}
                 onOpenChange={(newOpen) => setIsOpenPopup(newOpen)}
                 getPopupContainer={() => popoverRef.current}
               >
                 <div
                   ref={popoverRef}
                   onClick={() => setIsOpenPopup(!isOpenPopup)}
                   style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                 >
                   <Avatar size="default" icon={<UserOutlined />} />
                   <Typography.Text>intern</Typography.Text>
                 </div>
               </Popover>
               <Badge count={comments.length} dot>
                 <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
               </Badge>
               <Badge count={comments.length}>
                 <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
               </Badge>
             </Space>
            )}
             
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: 24,
            background: "#f0f2f5",
            borderRadius: "8px",
            paddingTop: "80px",
            transition: "all 0.2s",
            minHeight:"fit-content"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Drawer title="Notifications" onClose={() => setNotificationOpen(false)} open={notificationOpen} maskClosable>
        <List dataSource={comments} renderItem={(item) => <List.Item>{item.body}</List.Item>} />
      </Drawer>
      <Drawer title="Messages" onClose={() => setCommentsOpen(false)} open={commentsOpen} maskClosable>
        <List
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.body}</Typography.Text>
            </List.Item>
          )}
        />
      </Drawer>
    </Layout>
  );
};

export default CustomMenu;
