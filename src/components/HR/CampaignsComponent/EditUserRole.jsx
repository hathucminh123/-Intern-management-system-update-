import React, { useEffect, useState } from 'react';
import { Typography, Form, Input, Layout, Row, Col, Select, message, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as User from "../../../service/User";

const { Title } = Typography;
const { Header, Content } = Layout;

const userRoles = {
  intern: "Intern",
  hrmanager: 3,
  internshipcoordinators: 2,
  mentor: 1,
};

const userRoless = {
  0: 'Intern',
  3: 'HR Manager',
  2: 'Internship Coordinators',
  1: 'Mentor',
  4:'Admin'
};
const roleOptions = [
  { label: 'Intern', value: userRoles.intern },
  { label: 'HR Manager', value: userRoles.hrmanager },
  { label: 'Internship Coordinators', value: userRoles.internshipcoordinators },
  { label: 'Mentor', value: userRoles.mentor },
];

const EditUserRole = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const userAccount = state?.item;

  useEffect(() => {
    if (userAccount) {
      form.setFieldsValue({
        ...userAccount,
        role: userRoless[userAccount.role],
      });
    }
  }, [userAccount, form]);

  const onFinish = async (values) => {
    try {
      const updatedUser = {
        ...values,
        id: userAccount.id,
        role: Object.keys(userRoles).find(key => userRoles[key] === values.role),
      };
      await User.editNewUser(updatedUser);

      message.success('User updated successfully');
      navigate('/hrmanager/UserList'); // Navigate to user list after successful update
    } catch (error) {
      message.error('Update user failed');
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Edit User Role</Title>
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter the first name' }]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter the last name' }]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="userName"
                  label="User Name"
                  rules={[{ required: true, message: 'Please enter the user name' }]}
                >
                  <Input placeholder="Enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter the phone number' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="role"
                  label="User Role"
                  rules={[{ required: true, message: 'Please select the user role' }]}
                >
                  <Select placeholder="Select User Role" options={roleOptions} allowClear />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter the User Email' }]}
                >
                  <Input placeholder="Enter user Email" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default EditUserRole;
