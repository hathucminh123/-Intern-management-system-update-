import React, { useRef, useState } from 'react';
import { Menu, Dropdown, Button, Typography, Popover, Avatar, Layout, Space } from 'antd';
import { EditOutlined, CarryOutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import './HeaderComponent.css';
import image1 from '../../../assets/download.png';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { Header, Content } = Layout;

const HeaderComponent = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const popoverRef = useRef(null);
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/login">Đăng nhập</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/register">Đăng ký</a>
      </Menu.Item>
    </Menu>
  );

  const profile = sessionStorage.getItem('userProfile');
  const mapUserProfile = profile ? JSON.parse(profile) : null;

  const wrapperContentStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    margin: '10px 0',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  };
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '10px 20px',
    margin: '10px 0',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    backgroundColor: '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const iconStyle = {
    marginRight: '10px',
  };
  const iconStyleDelete = {
    marginRight: '10px',
    color: 'red'
  };

  const handleNavigate = (type) => {
    if (type === "Profile") {
      navigate("/guest/profile");
    } else if (type === "logout") {
      sessionStorage.clear();
      navigate("/login");
    }else if(type ==="Apply"){
      navigate("/guest/JobApply")

    }
  };

  const content = (
    <div>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0', minHeight: '20vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '20px', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
              {mapUserProfile?.userName}
            </Text>
            <Text style={{ fontSize: '14px', color: '#888' }}>
              {mapUserProfile?.email}
            </Text>
          </div>
        </div>
      </Header>
      <Content>
        <Space direction="vertical" style={{ width: '100%', borderBottom: '1px solid #f0f0f0' }}>
          <Button style={buttonStyle} onClick={() => handleNavigate("Profile")}>
            <EditOutlined style={iconStyle} />
            Cài đặt thông tin cá nhân
          </Button>
          <Button style={buttonStyle} onClick={() => handleNavigate("Apply")}>
            <CarryOutOutlined style={iconStyle} />
            Việc làm đã ứng tuyển
          </Button>
        </Space>
        <Button style={buttonStyle} onClick={() => handleNavigate("logout")}>
          <CarryOutOutlined style={iconStyle} />
          <span style={{ color: 'red' }}>Đăng xuất</span>
        </Button>
      </Content>
    </div>
  );

  return (
    <div className="flex items-center justify-center bg-sub-header text-neutral-6 h-20 px-4">
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <div className="hidden md:flex">
          <a href="/guest">
            <img alt="Intern management" className="h-10 w-auto" src={image1} />
          </a>
        </div>
        <div className="hidden md:flex space-x-4 ml-auto">
          {mapUserProfile ? (
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
                <Typography.Text>{mapUserProfile.userName}</Typography.Text>
              </div>
            </Popover>
          ) : (
            <ButtonComponent
              size={40}
              onClick={()=>navigate('/login')}
              styleButton={{
                background: 'rgb(255 184 28)',
                height: '48px',
                width: 'auto',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              textbutton={'Đăng nhập'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          )}
        </div>
        <div className="md:hidden ml-auto">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
