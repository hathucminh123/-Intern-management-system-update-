import React from 'react';
import { Form, Input, Button, Space, Typography, Image, Row, Col } from 'antd';
import image1 from '../../../assets/minhwap.jpg';

const GuessProfile = () => {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();

  const userProfile = JSON.parse(sessionStorage.getItem('userProfile')) || {};

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', background: '#f0f2f5', padding: '20px', gap: '40px' }}>
      <div style={{ width: '100%', maxWidth: '900px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title style={{ color: '#00b14f' }}>Cài đặt thông tin cá nhân</Title>
          <div>
          <span style={{color:'red'}}>(*)</span> 
          <Text style={{marginLeft:'10px'}}>Các thông tin bắt buộc</Text>
          </div>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
            >
              <Input defaultValue={userProfile?.userName} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
            >
              <Input defaultValue={userProfile?.email} disabled />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b14f', borderColor: '#00b14f' }}>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
      <div style={{ width: '100%', maxWidth: '350px',height:'300px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large">
          <Row gutter={10} align='middle'>
            <Col span={8}>
              <Image preview={false} src={image1} width='100%' style={{ borderRadius: '50%' }} />
            </Col>
            <Col span={16}>
              <Space direction='vertical'>
                <Text style={{ color: '#8c8c8c' }}>Chào mừng bạn trở lại</Text>
                <Title level={3}>{userProfile?.userName}</Title>
                <Button type='primary'>Xem thông tin tài khoản</Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default GuessProfile;
