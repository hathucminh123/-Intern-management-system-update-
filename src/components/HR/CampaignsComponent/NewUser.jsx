import React, { useState } from 'react';
import { Typography, Form, Input, Layout, Row, Col, Select, message, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as User from "../../../service/authService";

const { Title } = Typography;
const { Header, Content } = Layout;

const userRoles = {
  Intern: 0,
  hrmanager: 3,
  internshipcoordinators: 2,
  mentor: 1,
  admin: 4
};

const roleOptions = [
  { label: 'Intern', value: userRoles.Intern },
  { label: 'HR Manager', value: userRoles.hrmanager },
  { label: 'Internship Coordinators', value: userRoles.internshipcoordinators },
  { label: 'Mentor', value: userRoles.mentor },
  { label: 'Admin', value: userRoles.admin },
];

const NewUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newUser = {
        ...values,
        id: uuidv4(),
      };
      await User.registerUser(newUser);
      message.success('User created successfully');
      navigate('/hrmanager/UserList');
    } catch (error) {
      message.error('Create user failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Create New User</Title>
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '40px 20px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="userName"
                  label="User Name"
                  rules={[{ required: true, message: 'Please enter the user name' }]}
                >
                  <Input placeholder="Enter user name" />
                </Form.Item>
                <Form.Item
                  name="fistName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter the first name' }]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter the last name' }]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
                <Form.Item
                  name="role"
                  label="User Role"
                  rules={[{ required: true, message: 'Please select the user role' }]}
                >
                  <Select placeholder="Select User Role" options={roleOptions} allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter the email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please enter the password' }]}
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm the password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" block disabled={loading}>
                {loading ? <Spin /> : "Create User"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default NewUser;
