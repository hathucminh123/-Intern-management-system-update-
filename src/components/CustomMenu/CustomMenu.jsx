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
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./CustomMenu.css";
import { MdOutlineCampaign } from "react-icons/md";
import { getComment } from "../../api/index";
import Logo from "../Logo/Logo";

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
    if(localStorage.getItem('role').toLocaleLowerCase()!== userRole.toLowerCase()) 
      navigate(`/${localStorage.getItem('role').toLocaleLowerCase()}`, { replace: true });
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const items = {
    mentor: [
      { key: `/mentor/home`, icon: <HomeOutlined />, label: "Trang chủ" },
      { key: "/mentor/task", icon: <AppstoreOutlined />, label: "Quản lý Task" },
      { key: "/mentor/chat", icon: <WechatWorkOutlined />, label: "Chat" },
      { key: "/mentor/schedule", icon: <AreaChartOutlined />, label: "Lịch trình" },
      { key: "/mentor/taskboard", icon: <AreaChartOutlined />, label: "Task Board" },
    ],
    hrmanager: [
      { key: "/hrmanager/home", icon: <HomeOutlined />, label: "Trang chủ" },
      { key: "/hrmanager/campaigns", icon: <MdOutlineCampaign />, label: "Campaigns" },
      { key: "/hrmanager/schedule", icon: <AreaChartOutlined />, label: "Lịch trình" },
      { key: "/hrmanager/jobs", icon: <HomeOutlined />, label: "Jobs" },
    ],
    internshipcoordinators: [
      { key: "/internshipcoordinators/schedule", icon: <AreaChartOutlined />, label: "Lịch trình" },
      {
        key: "/internshipcoordinators/training-program",
        icon: <AreaChartOutlined />,
        label: "Training Program",
        children: [
          { key: "/internshipcoordinators/NewTrainingProgram", icon: <AreaChartOutlined />, label: "Create" },
          { key: "/internshipcoordinators/ViewTrainingProgram", icon: <AreaChartOutlined />, label: "View" },
        ],
      },
    ],
    intern: [
      { key: "/intern/home", icon: <HomeOutlined />, label: "Trang chủ" },
      { key: "/intern/schedule", icon: <AreaChartOutlined />, label: "Lịch trình" },
      { key: "/intern/Trainingprogram", icon: <AreaChartOutlined />, label: "Training program" },
      { key: "/intern/taskboard", icon: <AreaChartOutlined />, label: "Task" },
      { key: "/intern/chat", icon: <WechatWorkOutlined />, label: "Chat" },
    ],
  };
  const userRolle = localStorage.getItem("role");

  const userItems = items[userRole] || [];

  const handleClickNavigate = (type) => {
    if (type === "logout") {
      localStorage.clear();
      navigate("/sign-in");
      // window.location.reload();
    }
  };

  const content = (
    <div>
      <div className="WrapperContentPopup" onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </div>
      <div className="WrapperContentPopup" onClick={() => handleClickNavigate("logout")}>
        Đăng xuất
      </div>
    </div>
  );

  return (
    <Layout className="Header sidebar">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh", position: "fixed", left: 0 }}
      >
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "calc(100% - 64px)", marginTop: "64px", fontSize: "1rem" }}
          onClick={handleMenuClick}
          items={userItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? "80px" : "200px", transition: "all 0.2s" }}>
        {userRolle === "internshipcoordinators" && (
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
                      <Typography.Text>Tâm</Typography.Text>
                    </div>
                  </Popover>
                  <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
                  </Badge>
                  <Badge count={comments.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
                  </Badge>
                </Space>
              </Col>
            </Row>
          </Header>
        )}
          {userRolle === "hrmanager" && (
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
                      <Typography.Text>Hà Thúc Minh</Typography.Text>
                    </div>
                  </Popover>
                  <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
                  </Badge>
                  <Badge count={comments.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
                  </Badge>
                </Space>
              </Col>
            </Row>
          </Header>
        )}
         {userRolle === "mentor" && (
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
                      <Typography.Text>Hiệp</Typography.Text>
                    </div>
                  </Popover>
                  <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
                  </Badge>
                  <Badge count={comments.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
                  </Badge>
                </Space>
              </Col>
            </Row>
          </Header>
        )}
         {userRolle === "intern" && (
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
                      <Typography.Text>Trí</Typography.Text>
                    </div>
                  </Popover>
                  <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => setCommentsOpen(true)} />
                  </Badge>
                  <Badge count={comments.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => setNotificationOpen(true)} />
                  </Badge>
                </Space>
              </Col>
            </Row>
          </Header>
        )}
        <Content
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
            paddingTop: "80px",
            transition: "all 0.2s",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Drawer title="Thông báo" onClose={() => setNotificationOpen(false)} open={notificationOpen} maskClosable>
        <List dataSource={comments} renderItem={(item) => <List.Item>{item.body}</List.Item>} />
      </Drawer>
      <Drawer title="Tin nhắn" onClose={() => setCommentsOpen(false)} open={commentsOpen} maskClosable>
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
