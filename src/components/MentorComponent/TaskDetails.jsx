import React, { useState } from 'react';
import { Card, Row, Col, Typography, Layout, Space, Tag, Table, Button, Dropdown, Menu, Form, Modal, Input, Upload } from "antd";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import { useLocation } from "react-router-dom";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;

const TaskDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const { state } = useLocation();
  const taskDetail = state?.task;
  console.log("Task Detail", taskDetail);

  const handleDescription = value => {
    setDescription(value);
  };

  const ColorStatus = taskDetail.status.toUpperCase() === "DONE"
    ? (<Tag color='green'>{taskDetail.status.toUpperCase()}</Tag>)
    : taskDetail.status.toUpperCase() === "ON-PROGRESS"
      ? (<Tag color='geekblue'>{taskDetail.status.toUpperCase()}</Tag>)
      : (<Tag color='blue'>{taskDetail.status.toUpperCase()}</Tag>);

  const taskData = [
    { key: 1, firstName: "Minh", email: "minhhtse150913@fpt.edu.vn", status: "ON-PROGRESS" },
    { key: 1, firstName: "Minh", email: "minhhtse150913@fpt.edu.vn", status: "DONE" },
    { key: 1, firstName: "Minh", email: "minhhtse150913@fpt.edu.vn", status: "TODOS" },
   
    // Add more data if needed
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleDetails(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteTask(record.key)}>Delete</Button>
      </Menu.Item>
      {record.completed && (
        <Menu.Item key="3">
          <Button onClick={() => handleOpenReviewModal(record)}>Review</Button>
        </Menu.Item>
      )}
    </Menu>
  );

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    // Add upload logic here
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'File Bài',
      dataIndex: 'cvPath',
      key: 'cvPath',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Tải file bài</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          {record.status.toUpperCase() === "DONE" && (
            <Tag color='green'>{record.status.toUpperCase()}</Tag>
          )}
          {record.status.toUpperCase() === "ON-PROGRESS" && (
            <Tag color='geekblue'>{record.status.toUpperCase()}</Tag>
          )}
          {record.status.toUpperCase() === "TODOS" && (
            <Tag color='blue'>{record.status.toUpperCase()}</Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handlePostTask = () => {
    setIsModalVisible(true);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Task Details
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Space direction='vertical'>
            <Card
              style={{ width: "1500px" }}
              hoverable
              className="shadow-lg"
            >
              <Row justify="space-between" align="middle">
                <Col span={12}>
                  <Space direction='vertical'>
                    <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Task name:
                    </Title>
                    <p><strong>{taskDetail.taskName}</strong></p>
                    <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Description:
                    </Title>
                    <Paragraph>
                      <div dangerouslySetInnerHTML={{ __html: taskDetail.description }} />
                    </Paragraph>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction='vertical'>
                    <div>
                      <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Start Date
                      </Title>
                      <p><strong>{taskDetail.startDate}</strong></p>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        End Date
                      </Title>
                      <p><strong>{taskDetail.endDate}</strong></p>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Status
                      </Title>
                      <p><strong>{ColorStatus}</strong></p>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Mentor
                      </Title>
                      <p><strong>Thúc Minh</strong></p>
                    </div>
                  </Space>
                </Col>
              </Row>
            </Card>

            <Row style={{ marginTop: '10px' }} justify="space-between" align="middle">
              <Col span={12}>
                <Card
                  style={{ width: "650px",height:"450px" }}
                  hoverable
                  className="shadow-lg"
                >
                  <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                    <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Member
                    </Title>
                  </Header>
                  <div style={{ display: 'flex', gap: "20px", marginLeft: '50px', padding: '20px' }}>
                    <Title level={5} style={{ margin: 0 }}>
                      Người làm:
                    </Title>
                    <Text>{taskDetail.assignedTo}</Text>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  style={{ width: "fit-content" }}
                  hoverable
                  className="shadow-lg"
                >
                  <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                    <Row>
                      <Col span={10}>
                        <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Task submits list
                        </Title>
                      </Col>
                      <Col span={14}>
                        <ButtonComponent
                          styleButton={{ background: "#06701c", border: "none" }}
                          styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                          size="middle"
                          textbutton="Post Task"
                          onClick={handlePostTask}
                        />
                      </Col>
                    </Row>
                  </Header>
                  <div style={{ padding: '20px' }}>
                    <Table dataSource={taskData} columns={columns} />
                  </div>
                </Card>
              </Col>
            </Row>

            <Card 
              style={{ width: "fit-content", marginTop:'30px' }}
              hoverable
              className="shadow-lg"
            >
              <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>

              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Evidence
                        </Title>
              </Header>
              <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: 10000, margin: "0 auto" }}
              >
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the description of the work',
                    },
                  ]}
                >
                  <ReactQuill
                    style={{ height: '1000px' ,width:"1200px"}}
                    value={description}
                    onChange={handleDescription}
                    placeholder="Enter the Description"
                  />
                </Form.Item>
                <Form.Item>
                  <Button style={{marginTop:"50px"}} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </div>

        <Modal
          title="Nộp task"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <Form form={form}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Nhập tên " />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input placeholder="Enter the Email" />
            </Form.Item>
            <Form.Item
              name="cvUrl"
              label={
                <div>
                  <Text strong>CV đính kèm</Text>
                  <div>Bạn chỉ có thể upload 1 file</div>
                </div>
              }
              rules={[{ required: true, message: 'Please upload your CV!' }]}
            >
              <Upload.Dragger
                name="files"
                multiple={false}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                beforeUpload={handleUpload}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Kéo thả file vào đây hoặc tải lên</p>
                <p className="ant-upload-hint">(PDF, DOC, PNG, JPEG)</p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default TaskDetails;
