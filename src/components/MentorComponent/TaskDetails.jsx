import React, { useState, useRef } from 'react';
import {
  Card, Row, Col, Typography, Layout, Space, Tag, Table, Button,
  Dropdown, Menu, Form, Modal, Input, Upload, Popover, Checkbox, Avatar,
  DatePicker,Divider
} from "antd";
import "tailwindcss/tailwind.css";
import { useLocation } from "react-router-dom";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { DownOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;

const TaskDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [check, setCheck] = useState(false);
  const [form] = Form.useForm();
  const { state } = useLocation();
  const taskDetail = state?.task;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const popoverRef = useRef(null);

  console.log("asdasd",taskDetail);
  const userRole =localStorage.getItem('role')

  const handleDescription = (value) => {
    setDescription(value);
  };

  const handleComment = (value) => {
    setComment(value);
  };

  const handleCheck = (value) => {
    setCheck(value.target.checked);
  };

  const ColorStatus = taskDetail.status.toUpperCase() === "DONE"
    ? (<Tag color='green'>{taskDetail.status.toUpperCase()}</Tag>)
    : taskDetail.status.toUpperCase() === "ON-PROGRESS"
      ? (<Tag color='geekblue'>{taskDetail.status.toUpperCase()}</Tag>)
      : (<Tag color='blue'>{taskDetail.status.toUpperCase()}</Tag>);

  const taskData = [
    { key: 1, filePath: "Tải file bài", description: "minhhtse150913@fpt.edu.vn", when: "yesterday" },
    { key: 2, filePath: "Tải file bài", description: "minhhtse150913@fpt.edu.vn", when: "yesterday" },
    { key: 3, filePath: "Tải file bài", description: "minhhtse150913@fpt.edu.vn", when: "JUL7" },
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
  };

  const columns = [
    {
      title: ' Name',
      dataIndex: 'filePath',
      key: 'filePath',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Tải file bài</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'When',
      dataIndex: 'when',
      key: 'when',
    },
    // {
    //   title: 'File Bài',
    //   dataIndex: 'cvPath',
    //   key: 'cvPath',
    //   render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Tải file bài</a>,
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (text, record) => (
    //     <span>
    //       {record.status.toUpperCase() === "DONE" && (
    //         <Tag color='green'>{record.status.toUpperCase()}</Tag>
    //       )}
    //       {record.status.toUpperCase() === "ON-PROGRESS" && (
    //         <Tag color='geekblue'>{record.status.toUpperCase()}</Tag>
    //       )}
    //       {record.status.toUpperCase() === "TODOS" && (
    //         <Tag color='blue'>{record.status.toUpperCase()}</Tag>
    //       )}
    //     </span>
    //   ),
    // },
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

  const handleClickNavigate = (type) => {
    if (type === "logout") {
      localStorage.clear();
      navigate("/sign-in");
    }
  };

  const content = (
    <div>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Finish your review
        </Title>
      </Header>

      <Form form={form} layout="vertical" style={{ maxWidth: 600, margin: "0 auto" }}>
        <Form.Item label="Comment" name="comment">
          <ReactQuill
            style={{ width: "100%", height: '200px' }}
            value={comment}
            onChange={handleComment}
            placeholder="Enter the Comment"
          />
        </Form.Item>
        <Form.Item style={{ marginTop: "50px" }} label="Check" name="check">
          <Checkbox onChange={handleCheck} checked={check}>Approve</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
          {/* <div className="WrapperContentPopup" onClick={() => handleClickNavigate("profile")}>
        User Information
      </div>
      <div className="WrapperContentPopup" onClick={() => handleClickNavigate("logout")}>
        Logout
      </div> */}
    </div>
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Task Details
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Space direction='vertical' style={{ width: '100%' }}>
          <Card
      style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
      hoverable
      className="shadow-lg"
    >
      <Row justify="space-between" align="top">
        <Col span={14}>
          <Space direction="vertical" size="large">
            <div>
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Task name:
              </Title>
              <p><strong>{taskDetail.name}</strong></p>
            </div>
            <div>
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Description:
              </Title>
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                <div dangerouslySetInnerHTML={{ __html: taskDetail.description }} />
              </Paragraph>
            </div>
            <Card
  hoverable
  className="shadow-lg"
  style={{ borderRadius: '8px', height: '230px', width: '500px' }}
>
  <div style={{ padding: '20px' }}>
    <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      Owner
    </Title>
    <Divider />
    <Title level={5} style={{ margin: 0 }}>
      userName:
    </Title>
    <Text>{taskDetail.owner.userName}</Text>
    <Title level={5} style={{ margin: 0 }}>
      Email:
    </Title>
    <Text>{taskDetail.owner.email}</Text>
  </div>
</Card>
          </Space>
        </Col>
        <Col span={8}>
          <Space direction="vertical" size="large">
            <div>
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Start Date
              </Title>
              <p><strong>{moment(taskDetail.startDate).format("DD-MM-YYYY HH:mm")}</strong></p>
            </div>
            <div>
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                End Date
              </Title>
              <p><strong>{moment(taskDetail.endDate).format("DD-MM-YYYY HH:mm")}</strong></p>
            </div>
            <div>
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Status
              </Title>
              <p><strong>{ColorStatus}</strong></p>
            </div>
            <div>
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Mentor
              </Title>
              <p><strong>Thúc Minh</strong></p>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>

            <Row gutter={16} justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
              {/* <Col span={12}>
                <Card hoverable className="shadow-lg" style={{ height: "100%" }}>
                  <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                    <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Owner
                    </Title>
                  </Header>
                  <div style={{ padding: '20px' }}>
                    <Title level={5} style={{ margin: 0 }}>
                      userName:
                    </Title>
                    <Text>{taskDetail.owner.userName}</Text>
                    <Title level={5} style={{ margin: 0 }}>
                      Email:
                    </Title>
                    <Text>{taskDetail.owner.email}</Text>
                  </div>
                </Card>
              </Col> */}
              <Col span={24}>
                <Card hoverable className="shadow-lg">
                  <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Task submits list
                        </Title>
                      </Col>
                      <Col>
                        <Space direction='horizontal'>
                          {userRole ==='intern' &&(
                                <ButtonComponent
                                styleButton={{ background: "#06701c", border: "none" }}
                                styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                                size="middle"
                                textbutton="Post Task"
                                onClick={handlePostTask}
                              />
                          )}
                      
                      {userRole ==="mentor" && (
                         <Popover
                         content={content}
                         trigger="click"
                         open={isOpenPopup}
                         onOpenChange={(newOpen) => setIsOpenPopup(newOpen)}
                         getPopupContainer={() => popoverRef.current}
                       >
                         <div
                           ref={popoverRef}
                           onClick={() => setIsOpenPopup(!isOpenPopup)}
                           style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                         >
                           <ButtonComponent
                             styleButton={{ background: "#06701c", border: "none" }}
                             styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                             size="middle"
                             textbutton="Review"
                           />
                         </div>
                       </Popover>
                      )}
                         
                        </Space>
                      </Col>
                    </Row>
                  </Header>
                  <div style={{ padding: '20px' }}>
                    <Table dataSource={taskData} columns={columns} pagination={false} />
                  </div>
                </Card>
              </Col>
            </Row>

            <Card hoverable className="shadow-lg" style={{ marginBottom: '20px' }}>
              <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Evidence
                </Title>
              </Header>
              <Form form={form} layout="vertical" style={{ padding: '20px' }}>
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
                    style={{ height: '200px', width: "100%" }}
                    value={description}
                    onChange={handleDescription}
                    placeholder="Enter the Description"
                  />
                </Form.Item>
                <Form.Item>
                  <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>

      <Card style={{ maxWidth: 800, backgroundColor: '#f0f8ff', borderRadius: 8 }} className="shadow-lg">
      <Row align="middle" gutter={16}>
        <Col>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col flex="auto">
          <Space direction="vertical">
            <Space>
              <Text strong>hathucminh123</Text>
              <Text type="secondary">commented 12 hours ago</Text>
            </Space>
            <Card style={{ backgroundColor: '#e6f7ff', borderRadius: 8 }}>
              <Space direction="vertical">
                <Text strong>hathucminh123 left a comment</Text>
                <Text>sadasdasdasdasd</Text>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </Card>
          </Space>

        </div>

        <Modal
      title="Nộp task"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      style={{ minWidth: '600px', maxWidth: '90%', top: '20px' }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="cvUrl"
          label={
            <div>
              <Text strong>Nộp file đính kèm</Text>
              <div>Bạn chỉ có thể upload 1 file</div>
            </div>
          }
          rules={[{ required: true, message: 'Vui lòng tải lên file của bạn!' }]}
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
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Ngày"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
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
