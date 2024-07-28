import { Image, Space, Typography, message, Spin } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Slider from "react-slick";
import { jwtDecode } from 'jwt-decode';
import InputFormComponent from '../../InputFormComponent/InputFormComponent';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';
import { loginGuest, fetchUserProfileGuest, fetchUserProfile, login } from '../../../service/authService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Title, Text } = Typography;

const StyledInput = styled(InputFormComponent)`
  width: 100%;
  padding-left: 40px;

  &::placeholder {
    margin-left: 10px;
  }
`;

const ForgotPasswordText = styled(Text)`
  color: #00b14f;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterText = styled.strong`
  color: #00b14f;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const GuestSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleOnChangeEmail = (value) => setEmail(value);
  const handleOnChangePassword = (value) => setPassword(value);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await login({ userName: email, password: password });
      message.success("Login successfully", 3);
      const userInfo = jwtDecode(result.result);
      const userRole = userInfo.Role.toLowerCase();
      const userId = userInfo.UserId.toLowerCase();

      localStorage.setItem("Auth", 'true');
      localStorage.setItem("role", userRole);
      localStorage.setItem("token", result.result);
      localStorage.setItem("userId", userId);
      const profile = await fetchUserProfile(userId);

      localStorage.setItem("userProfile", JSON.stringify(profile));

      navigate(`/${userRole}`, { replace: true });
    } catch (error) {
      message.error("Login failed, please check your account", 3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleNavigate = () => {
    navigate("/sign-up");
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f2f5', padding: '20px' }}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div style={{ width: '100%', maxWidth: '800px', padding: '40px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title style={{ color: '#00b14f' }}>Chào mừng bạn đã quay trở lại</Title>
          <Text style={{ fontSize: '16px', color: '#595959', textAlign: 'center' }}>
            Hãy đăng nhập để tiếp tục khám phá các cơ hội việc làm và trải nghiệm các tính năng tuyệt vời của chúng tôi.
          </Text>
          <div style={{ width: '100%' }}>
            <Text style={{ color: '#212f3f', fontWeight: '500', marginBottom: '1.5rem' }}>User Name</Text>
            <div style={{ position: 'relative', width: '100%' }}>
              <UserOutlined style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: 1, color: '#00b14f' }} />
              <StyledInput
                value={email}
                placeholder="User Name"
                onChange={handleOnChangeEmail}
              />
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <Text style={{ color: '#212f3f', fontWeight: '500', marginBottom: '1.5rem' }}>Password</Text>
            <div style={{ position: 'relative', width: '100%' }}>
              <RiLockPasswordFill style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: 1, color: '#00b14f' }} />
              <span
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
              >
                {isPasswordShow ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <StyledInput
                value={password}
                placeholder="Password"
                type={isPasswordShow ? "text" : "password"}
                onChange={handleOnChangePassword}
              />
            </div>
          </div>
          <div style={{ display: 'flex', width: '100%', alignItems: 'end', justifyContent: 'end' }}>
            <ForgotPasswordText>Quên mật khẩu?</ForgotPasswordText>
          </div>

          <ButtonComponent
            size={40}
            onClick={handleSignIn}
            styleButton={{
              background: '#00b14f',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textbutton={'Đăng nhập'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          />

          <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chưa có tài khoản? <RegisterText onClick={handleNavigate}>Đăng ký ngay</RegisterText></Text>
          </div>
        </Space>
      </div>
      <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1' }}>
        <Slider {...settings} style={{ width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <Image preview={false} src="https://tuyendung.topcv.vn/app/_nuxt/img/banner-03.6c4018d.png" style={{ width: '1500px', height: '600px' }} />
            <Title level={3} style={{ position: 'absolute', zIndex: 1, color: 'white', top: '25%', right: '8px', left: '100px' }}>Manage your Work with Campaign</Title>
          </div>
          <div style={{ position: 'relative' }}>
            <Image preview={false} src="https://tuyendung.topcv.vn/app/_nuxt/img/banner-02.3506b83.png" style={{ width: '1500px', height: '600px' }} />
            <Title level={3} style={{ position: 'absolute', zIndex: 1, color: 'white', top: '25%', right: '8px', left: '100px' }}>Apply Your Candidates</Title>
          </div>
        </Slider>
      </div>
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default GuestSignin;