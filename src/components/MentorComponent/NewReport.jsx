import React from 'react';
import { Typography, Form, Input, Layout, Select, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const NewReport = () => {
  const [form] = Form.useForm();
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const onFinish = async () => {
    const values = form.getFieldsValue();

    const newReport = {
      ...values,
      id: uuidv4(),
    };

    console.log(newReport); // You can handle the newReport object as needed here
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Create New Report to User</Title>
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Form
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: 800, margin: '0 auto' }}
            layout="vertical"
          >
            <Form.Item
              name="user"
              label="Intern Name"
              rules={[{ required: true, message: 'Please select the intern name' }]}
            >
              <Select placeholder="Select User Name" allowClear>
                <Select.Option value="1">Minh</Select.Option>
                <Select.Option value="2">Tâm</Select.Option>
                <Select.Option value="3">Trí</Select.Option>
                <Select.Option value="4">Hiệp</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="logicalthinking"
              label="Logical Thinking"
              rules={[{ required: true, message: 'Please select a logical thinking grade' }]}
            >
              <Select placeholder="Select Grade" allowClear>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="skill"
              label="Skill"
              rules={[{ required: true, message: 'Please select a skill grade' }]}
            >
              <Select placeholder="Select Grade" allowClear>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="attitude"
              label="Attitude"
              rules={[{ required: true, message: 'Please select an attitude grade' }]}
            >
              <Select placeholder="Select Grade" allowClear>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="total"
              label="total"
              rules={[{ required: true, message: 'Please select an attitude grade' }]}
            >
              <Select placeholder="Select Grade" allowClear>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Report
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default NewReport;
