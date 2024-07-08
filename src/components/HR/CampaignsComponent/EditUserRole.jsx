import React, { useState } from 'react';
import { Typography, Form, Input, Layout, Row, Col, Select, message, Upload, Button } from 'antd';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from '../../../firebase/config';
import { v4 as uuidv4 } from 'uuid';

const EditUserRole = () => {
  const { Text, Title } = Typography;
  const { Header, Content } = Layout;
  const [form] = Form.useForm();
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();

  const onFinish = async () => {
    const values = form.getFieldsValue();
    try {
      if (!cvFile) {
        message.error('Please upload an image!');
        return;
      }

      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      const newUser = {
        ...values,
        id: uuidv4(),
        imagePath: fileUrl,
      };

      // Code to handle the newUser object, such as sending it to the backend

      message.success('User created successfully');
      navigate('/some-path'); // Navigate to some path after successful creation
    } catch (error) {
      message.error('Create user failed');
    }
  };

  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Create New User</Title>
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Form
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: 10000, margin: '0 auto' }}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter the user first name' }]}
               
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter the user last name' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="userName"
                  label="User Name"
                  rules={[{ required: true, message: 'Please enter the user user name' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="userRole"
                  label="User Role"
                  rules={[{ required: true, message: 'Please enter the user role' }]}
                >
                  <Select placeholder="Select User Role" allowClear>
                    <Select.Option value="hrmanager">HR Manager</Select.Option>
                    <Select.Option value="internshipcoordinators">Internship Coordinators</Select.Option>
                    <Select.Option value="mentor">Mentor</Select.Option>
                    <Select.Option value="intern">Intern</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="imagePath"
                  label={
                    <div>
                      <Text strong>Upload Image</Text>
                      <div>You can only upload one image</div>
                    </div>
                  }
                  rules={[{ required: true, message: 'Please upload an image!' }]}
                >
                  <Upload.Dragger
                    name="imagePath"
                    multiple={false}
                    accept=".jpg,.jpeg,.png"
                    beforeUpload={handleBeforeUpload}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Drag and drop an image here or click to upload</p>
                    <p className="ant-upload-hint">(JPG, JPEG, PNG)</p>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter the user email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please enter the user password' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm the user password' },
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
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
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
