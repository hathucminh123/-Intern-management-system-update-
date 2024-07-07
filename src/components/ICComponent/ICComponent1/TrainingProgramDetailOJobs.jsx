import React, { useState, useEffect } from "react";
import { Typography, Button, Tag, Tabs, Form, Input, Table, message, Upload, Layout, Space, Dropdown, Menu, Popconfirm, Card, Row, Col } from "antd";
import { UploadOutlined, DownOutlined } from '@ant-design/icons';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import * as Resource from "../../../service/Resource";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../../../firebase/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import DetailModall from './DetailModall';
import * as Training from "../../../service/TrainingPrograms";
import "tailwindcss/tailwind.css";
import '../../../index.css';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Header, Content } = Layout;

const TrainingProgramDetailOJobs = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const CampaignDetail = state?.item;
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [pageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [form] = Form.useForm();
  const navigate =useNavigate();

  useEffect(() => {
    if (CampaignDetail?.resources) {
      setResources(CampaignDetail.resources);
    }
  }, [CampaignDetail]);

  if (!CampaignDetail) {
    return <div>Training program detail not found</div>;
  }

  const fetchResources = async () => {
    const q = query(collection(firestore, 'resources'), where('trainingProgramIds', 'array-contains', CampaignDetail.id));
    const querySnapshot = await getDocs(q);
    const updatedResources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setResources(updatedResources);
  };

  const handleAddResource = async (values) => {
    setLoading(true);
    try {
      if (!cvFile) {
        message.error('Please upload your file!');
        return;
      }

      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      const resourceData = {
        ...values,
        filePath: fileUrl,
        trainingProgramIds: [CampaignDetail.id],
      };

      await addDoc(collection(firestore, 'resources'), resourceData);
      await Resource.createNewResource(resourceData);
      
      message.success('Resource added successfully!');
      form.resetFields();
      navigate('/internshipcoordinators/ViewTrainingProgram')
      
      setCvFile(null);

      await fetchResources();
    } catch (error) {
      message.error('Error submitting form. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateResource = async (updatedTask) => {
    setResources((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      const resourceDoc = {
        trainingProgramId: CampaignDetail.id,
        resourceId: resourceId
      };
      await Training.DeleteResourceNewTraining(resourceDoc);
      setResources((prev) => prev.filter(resource => resource.id !== resourceId));
      message.success('Resource deleted successfully!');
    } catch (error) {
      message.error('Error deleting resource. Please try again.');
      console.error('Error deleting resource:', error);
    }
  };

  const handleOpenDetailModal = (resource) => {
    setSelectedResource(resource);
    setOpenDetailModal(true);
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteResource(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

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
      render: (filePath) => <a href={filePath} target="_blank" rel="noopener noreferrer">View File</a>,
    },
    {
      title: 'Actions',
      key: 'actions',
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

  const userRole = localStorage.getItem('role').toLowerCase();

  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}> Training program details</Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <div className="container mx-auto bg-white p-8 shadow-lg rounded-lg">
          <Tabs defaultActiveKey="1" className="w-full">
            <TabPane tab="Training Details" key="1">
              <div className="mb-8">
                <Title level={2}>{CampaignDetail.name}</Title>
                <div className="flex items-center mt-3">
                  <div>Duration:</div>
                  <Tag className="ml-3" color="#87d068">
                    {CampaignDetail.duration} months
                  </Tag>
                </div>
                <hr className="my-8" />
                <Title level={3}>Course Description</Title>
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: CampaignDetail.courseObject }} />
                </Paragraph>
                <Title level={3}>Output Object</Title>
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: CampaignDetail.outputObject }} />
                </Paragraph>
                <Title level={3}>Application</Title>
                <Paragraph>
                  Interested candidates, please send your CV with the email subject:{" "}
                  <Text strong>[Fresher React Developer - Full Name]</Text> to the email address
                  <Text strong> FA.HCM@fpt.com</Text>
                </Paragraph>
                <Paragraph>
                  Email: <a href="mailto:FA.HCM@fpt.com">FA.HCM@fpt.com</a>
                </Paragraph>
                <Paragraph>
                  Fanpage:{" "}
                  <a
                    href="https://www.facebook.com/fsoft.academy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FPT Software Academy
                  </a>
                </Paragraph>
                <Paragraph>
                  Website:{" "}
                  <a
                    href="https://fsoft-academy.edu.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://fsoft-academy.edu.vn/
                  </a>
                </Paragraph>
              </div>
            </TabPane>
            {/* <TabPane tab="Resources" key="2">
              {userRole === "internshipcoordinators" && (
                <Form form={form} layout="vertical" onFinish={handleAddResource}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter the name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="filePath"
                    label="Upload File"
                    rules={[{ required: true, message: 'Please upload your file!' }]}
                  >
                    <Upload.Dragger
                      name="files"
                      multiple={false}
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      beforeUpload={handleBeforeUpload}
                    >
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">Drag and drop a file here or click to upload</p>
                      <p className="ant-upload-hint">(PDF, DOC, PNG, JPEG)</p>
                    </Upload.Dragger>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Add Resource
                    </Button>
                  </Form.Item>
                </Form>
              )}
              <Table
                columns={columns}
                dataSource={resources}
                rowKey="id"
                pagination={{ pageSize: pageSize, current: currentPage, onChange: setCurrentPage }}
              />
            </TabPane> */}
          </Tabs>
        </div>
      </Content>
      {selectedResource && (
        <DetailModall
          isVisible={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          task={selectedResource}
          onUpdateTask={handleUpdateResource}
        />
      )}
    </Layout>
  );
};

export default TrainingProgramDetailOJobs;
