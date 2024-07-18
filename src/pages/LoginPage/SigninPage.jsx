import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import './SigninPage.css';
import { login } from '../../service/authService';
import {jwtDecode} from 'jwt-decode';
import { message, Spin } from 'antd';

const SigninPage = () => {
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

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
      navigate(`/${userRole}`, { replace: true });
    } catch (error) {
      message.error("Login failed, please check your account", 3);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #ffffff 0%, #ffffff 50%, #ADD8E6 50%, #ADD8E6 100%)', height: '100vh' }}>
      <div style={{ width: '90vh', height: '500px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <div className='WrapperContainerLeft'>
       
          <p>Đăng nhập vào hệ thống </p>
          <InputFormComponent style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsPasswordShow(!isPasswordShow)}
              style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
            >
              {isPasswordShow ? (
                <EyeFilled />
              ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputFormComponent
              placeholder="Mật khẩu"
              type={isPasswordShow ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <ButtonComponent
            size={40}
            onClick={handleSignIn}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textbutton={'Đăng nhập'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          />
          {/* <p><span className='WrapperTextLight'>Quên mật khẩu?</span></p>
          <p>Chưa có tài khoản? <span className='WrapperTextLight' onClick={handleNavigateSignUp}> Tạo tài khoản</span></p> */}
        </div>
        <div className='WrapperContainerRight'>
          <h1 style={{ fontSize: '3em', color: '#333', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Intern</h1>
          <h4>Chào mừng đến với Intern management system</h4>
        </div>
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

export default SigninPage;
