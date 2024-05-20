import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import './SigninPage.css';

const SigninPage = () => {
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleSignIn = () => {
    console.log('logingloin');
    localStorage.setItem("Auth", 'true');
 
  }



  return (
  
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #ffffff 0%, #ffffff 50%, #ADD8E6 50%, #ADD8E6 100%)', height: '100vh' }}>
        <div style={{ width: '90vh', height: '500px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
          <div className='WrapperContainerLeft'>
            <h1>Xin chào</h1>
            <p>Đăng nhập hoặc tạo tài khoản mới</p>
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
            <p><span className='WrapperTextLight'>Quên mật khẩu?</span></p>
            <p>Chưa có tài khoản? <span className='WrapperTextLight' onClick={handleNavigateSignUp}> Tạo tài khoản</span></p>
          </div>
          <div className='WrapperContainerRight'>
            <h1 style={{ fontSize: '3em', color: '#333', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Intern</h1>
            <h4>Chào mừng đến với Intern management system</h4>
          </div>
        </div>
      </div>
    )
 
}

export default SigninPage;
