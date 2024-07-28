import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Typography, Image, Row, Col, message, Spin } from 'antd';
import image1 from '../../../assets/minhwap.jpg';
import * as UserService from '../../../service/User';
import * as Profile from '../../../service/authService';

const GuessProfile = () => {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('userProfile')) || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem('userProfile')) || {});
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const profile = await Profile.fetchUserProfile(userProfile.events.id); 
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
      message.success('Thông tin cá nhân đã được cập nhật thành công');
    } catch (error) {
      message.error('Không thể tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updateUser = {
        ...values,
        id: userProfile.events.id,
      };

      await UserService.editNewUser(updateUser);
      await fetchUserProfile();
      location.reload();
    } catch (error) {
      message.error('Cập nhật thông tin cá nhân thất bại');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', background: '#f0f2f5', padding: '20px', gap: '40px' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ width: '100%', maxWidth: '900px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Title style={{ color: '#00b14f' }}>Cài đặt thông tin cá nhân</Title>
              <div>
                <span style={{ color: 'red' }}>(*)</span>
                <Text style={{ marginLeft: '10px' }}>Các thông tin bắt buộc</Text>
              </div>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{
                  userName: userProfile?.events.userName,
                  firstName: userProfile?.events.firstName,
                  lastName: userProfile?.events.lastName,
                  email: userProfile?.events.email,
                  phoneNumber: userProfile?.events.phoneNumber,
                }}
                onFinish={onFinish}
                form={form}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Tên đăng nhập"
                  name="userName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Họ"
                  name="firstName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Tên"
                  name="lastName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b14f', borderColor: '#00b14f' }}>
                    Lưu
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </div>
          <div style={{ width: '100%', maxWidth: '350px', height: '300px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="large">
              <Row gutter={10} align="middle">
                <Col span={8}>
                  <Image preview={false} src={image1} width="100%" style={{ borderRadius: '50%' }} />
                </Col>
                <Col span={16}>
                  <Space direction="vertical">
                    <Text style={{ color: '#8c8c8c' }}>Chào mừng bạn trở lại</Text>
                    <Title level={3}>{userProfile?.events.userName}</Title>
                    <Button type="primary">Xem thông tin tài khoản</Button>
                  </Space>
                </Col>
              </Row>
            </Space>
          </div>
        </>
      )}
    </div>
  );
};

export default GuessProfile;
