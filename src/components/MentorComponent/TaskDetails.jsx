import React, { useState, useRef, useEffect } from 'react';
import {
  Card, Row, Col, Typography, Layout, Space, Tag, Table, Button,
  Dropdown, Menu, Form, Modal, Input, Upload, Popover, Checkbox, Avatar,
  DatePicker, Divider, message
} from "antd";
import "tailwindcss/tailwind.css";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { DownOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';
import ReactQuill from 'react-quill';
import moment from 'moment';
import * as Assessment from '../../service/Assessment'


const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;

const TaskDetails = ({ fetchAssessment }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [check, setCheck] = useState(false);
  const [form] = Form.useForm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const taskDetail = state?.task;
  const fetch =state?.fetch
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const popoverRef = useRef(null);
  const [cvFile, setCvFile] = useState(null);
  const [submissions, setSubmissions] = useState(taskDetail?.assessmentSubmitions || []);
  
  const userRole = localStorage.getItem('role');

  // useEffect(() => {
  
  //     fetchAssessmentSubmissions(taskDetail.id);
    
  // }, []);

  // const fetchAssessmentSubmissions = async (taskId) => {
  //   try {
  //     const res = await Assessment.GetAssessmentSubmissions(taskId);
  //     setSubmissions(res.events);
  //   } catch (error) {
  //     message.error('Failed to fetch assessment submissions');
  //   }
  // };


  
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

  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  const handleFormSubmit = async (values) => {
    try {
      if (!cvFile) {
        message.error('Please upload your file');
        return;
      }

      // Upload file to Firebase Storage
      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      // Create a new assessment submission
      const submission = {
        name: values.name,
        description: values.description,
        submitDate: values.submitDate.toISOString(),
        filePath: fileUrl,
        assessmentId: taskDetail.id
      };

      await Assessment.InternAddAssessment(submission);

      message.success('Form submitted successfully!');
      setSubmissions(prev => [...prev, submission]);
      form.resetFields();
      setCvFile(null);
      setIsModalVisible(false);
      // fetchAssessmentSubmissions(taskDetail.id);
      navigate('/intern/taskboard')
    } catch (error) {
      message.error('Error submitting form. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await Assessment.InternDeleteAssessment(id);
      setSubmissions(submissions.filter(submission => submission.id !== id));
      message.success('Task deleted successfully');
      // fetchAssessmentSubmissions(taskDetail.id);
    } catch (error) {
      message.error({
        content: 'Failed to delete task: ' + error.message,
        duration: 3,
      });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'File',
      dataIndex: 'filePath',
      key: 'filePath',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Download File</a>,
    },
    {
      title: 'When',
      dataIndex: 'submitDate',
      key: 'submitDate',
      render: (text) => moment(text).format('DD-MM-YYYY HH:mm'),
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

  const menu = (record) => (
    <Menu>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteTask(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

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
                          {userRole === 'intern' && (
                            <ButtonComponent
                              styleButton={{ background: "#06701c", border: "none" }}
                              styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                              size="middle"
                              textbutton="Post Task"
                              onClick={handlePostTask}
                            />
                          )}
                          {userRole === "mentor" && (
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
                    <Table dataSource={submissions} columns={columns} pagination={false} />
                  </div>
                </Card>
              </Col>
            </Row>
          </Space>
        </div>

        <Modal
          title="Submit Task"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ minWidth: '600px', maxWidth: '90%', top: '20px' }}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="name"
              label="Task Name"
              rules={[{ required: true, message: 'Please enter the task name!' }]}
            >
              <Input placeholder="Enter task name" />
            </Form.Item>
            <Form.Item
              name="filePath"
              label={
                <div>
                  <Text strong>Attach File</Text>
                  <div>You can upload only one file</div>
                </div>
              }
              rules={[{ required: true, message: 'Please upload your file!' }]}
            >
              <Upload.Dragger
                name="filePath"
                multiple={false}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                beforeUpload={handleBeforeUpload}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Drag and drop file here or click to upload</p>
                <p className="ant-upload-hint">(PDF, DOC, PNG, JPEG)</p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter a description" }]}
            >
              <Input placeholder="Enter description" />
            </Form.Item>
            <Form.Item
              name="submitDate"
              label="Submit Date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default TaskDetails;
