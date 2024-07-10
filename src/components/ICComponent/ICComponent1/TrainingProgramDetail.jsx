import React, { useState, useEffect } from "react";
import { Typography, Button, Tag, Tabs, Form, Input, Table, message, Upload, Layout, Space, Dropdown, Menu, Row, Col } from "antd";
import { UploadOutlined, DownOutlined } from '@ant-design/icons';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../../../firebase/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import DetailModall from './DetailModall';
import * as Resource from "../../../service/Resource";
import * as Training from "../../../service/TrainingPrograms";
import "tailwindcss/tailwind.css";
import '../../../index.css';
import DetailKPIModal from "./DetailKPIModal";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import moment from "moment";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Header, Content } = Layout;

const TrainingProgramDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const CampaignDetail = state?.item;
  const [resources, setResources] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [pageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [task, setTask] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  console.log('metquadi',kpis)

  useEffect(() => {
    if (CampaignDetail?.resources) {
      setResources(CampaignDetail.resources);
    }
  }, [CampaignDetail]);

  useEffect(() => {
    if (CampaignDetail?.kpIs) {
      setKpis(CampaignDetail.kpIs);
    }
  }, [CampaignDetail]);

  useEffect(() => {
    if (CampaignDetail?.assessments) {
      setTask(CampaignDetail.assessments);
    }
  }, [CampaignDetail]);

  if (!CampaignDetail) {
    return <div>Training program detail not found</div>;
  }
  const userRole = localStorage.getItem('role')?.toLowerCase();


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
      navigate('/internshipcoordinators/ViewTrainingProgram');

      setCvFile(null);
      await fetchResources();
    } catch (error) {
      message.error('Error submitting form. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateResource = async (updatedResource) => {
    setResources((prev) => prev.map(item => item.id === updatedResource.id ? updatedResource : item));
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

  const handleDeleteKPIS = async (id) => {
    try {
      const KPIS = {
        trainingProgramId: CampaignDetail.id,
        kpiId: id
      };
      await Training.DeleteKPIsNewTraining(KPIS);
      setKpis((prev) => prev.filter(kpi => kpi.id !== id));
      message.success('KPIS deleted successfully!');
    } catch (error) {
      message.error('Error deleting KPIS. Please try again.');
      console.error('Error deleting KPIS:', error);
    }
  };

  const handleOpenDetailModal = (resource) => {
    setSelectedResource(resource);
    setOpenDetailModal(true);
  };

  const handleOpenDetailKPIModal = (kpi) => {
    setSelectedKPI(kpi);
    setOpenDetailModal(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setKpis((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };

  const handleAddKPIStoProgram = (item) => {
    navigate(`/internshipcoordinators/KPISListt/${item.id}`, { state: { item } });
  };

  const handleDetails = (task) => {
    navigate(`/${userRole}/taskDetail/${task.id}`, { state: { task } });
  };

  const resourceMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteResource(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const kpiMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailKPIModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteKPIS(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const TaskMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleDetails(record)}>View</Button>
      </Menu.Item>
    </Menu>
  );
  const resourceColumns = [
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
      render: (filePath) => (
        <a href={filePath} target="_blank" rel="noopener noreferrer">View File</a>
      ),
    },
  ];
  
  if (userRole === "internshipcoordinators") {
    resourceColumns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={resourceMenu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    });
  }
  const calculateTotal = (items) => {
    const totalWeights = items.reduce((total, item) => {
      return total + parseFloat(item.type);
    }, 0);

    if (totalWeights !== 100) {
      return null;
    }

    return items.reduce((sum, item) => {
      const weight = parseFloat(item.type) / 100;
      const value = parseFloat(item.value);
      return sum + (weight * value);
    }, 0).toFixed(2);
  };


  const kpiColumns = [
    {
      title: 'Grade Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Grade Item',
      dataIndex: 'descition',
      key: 'description',
      render: (text, record) => (
        <>
          <div>{record.descition}</div>
          <div><strong>Total</strong></div> 
        </>
      ),
    },
    {
      title: 'Weight',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <>
        {console.log("concac1",record)}
        
          <div>{record.type}</div>
          <div><strong> {parseFloat(record.type)}%</strong></div>
        </>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) => (
        <>
          <div>{record.value}</div>
        </>
      ),
    },
   
  
  ];

  if (userRole === "internshipcoordinators" || userRole ==="mentor") {
    kpiColumns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={kpiMenu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    });
  }

  const Takscolumns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Assigned To',
    //   dataIndex: 'owner',
    //   key: 'owner',
    //   render: (owner) => owner ? <span>{owner.userName}</span> : 'N/A',
    // },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : '',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : '',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          {record.status.toUpperCase() === "DONE" && (
            <Tag color='green'>
              {record.status.toUpperCase()}
            </Tag>
          )}
          {record.status.toUpperCase() === "ON-PROGRESS" && (
            <Tag color='geekblue'>
              {record.status.toUpperCase()}
            </Tag>
          )}
          {record.status.toUpperCase() === "TODOS" && (
            <Tag color='blue'>
              {record.status.toUpperCase()}
            </Tag>
          )}
        </span>
      ),
    },
   
  ];

  if (userRole === "internshipcoordinators") {
    Takscolumns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={resourceMenu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    });
  }


  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>Training program details</Header>
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
            <TabPane tab="Resources" key="2">
              {userRole === "internshipcoordinators" || userRole ==="mentor" && (
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
                columns={resourceColumns}
                dataSource={resources}
                rowKey="id"
                pagination={{ pageSize: pageSize, current: currentPage, onChange: setCurrentPage }}
              />
            </TabPane>
            <TabPane tab="KPIS" key="3">
              {(userRole === "internshipcoordinators" || userRole === "intern" || userRole ==="mentor") && (
                <Layout>
                  <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                    <Row gutter={100}>
                      <Col span={12}>
                        <Title level={4}>KPI LIST in {CampaignDetail.name}</Title>
                      </Col>
                      <Col span={12}>
                {userRole ==="internshipcoordinators"  &&(
                  <ButtonComponent
                  styleButton={{ background: "#06701c", border: "none" }}
                  styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                  size="middle"
                  textbutton="Add KPI"
                  onClick={(e) => { e.stopPropagation(); handleAddKPIStoProgram(CampaignDetail) }}
                />
                )}        
                      </Col>
                    </Row>
                  </Header>
                  <Content>
                    <Table
                    bordered
                    pagination={false}
                      columns={kpiColumns}
                      dataSource={kpis}
                      rowKey="id"
                      // pagination={{ pageSize: pageSize, current: currentPage, onChange: setCurrentPage }}
                      summary={() => {
                        const total = calculateTotal(kpis || []);
                        const rating = total >= 5 ? 'Passed' : 'Failed';
                        const ratingStyle = {
                            backgroundColor: rating === 'Passed' ? '#d4edda' : '#f8d7da',
                            color: rating === 'Passed' ? '#155724' : '#721c24',
                            fontWeight: 'bold',
                        };
                        return (
                            <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={3}><strong>COURSE TOTAL</strong></Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <strong >{total !== null ? total : <span style={{color:'red'}}>'Weights do not add up to 100%' </span> }</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                {total !== null && (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={3}><strong>STATUS</strong></Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            <span style={ratingStyle}>{rating}</span>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            </>
                        );
                      }}
                     />
                  </Content>
                </Layout>
              )}
            </TabPane>
            <TabPane tab="Assessments" key="4">
              {(userRole === "internshipcoordinators" || userRole === "intern" || userRole === "mentor") && (
                <Layout>
                  <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                    <Row gutter={500}>
                      <Col>
                        <Title level={4}>Assessment LIST in {CampaignDetail.name}</Title>
                      </Col>
                      <Col>
                  {userRole ==="mentor" &&(
                  <ButtonComponent
                  styleButton={{ background: "#06701c", border: "none" }}
                  styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                  size="middle"
                  textbutton="Add Assessment"
                  onClick={(e) => { e.stopPropagation(); handleAddKPIStoProgram(CampaignDetail) }}
                />
                )}        
                           
                      
                      </Col>
                    </Row>
                  </Header>
                  <Content>
                    <Table
                      columns={Takscolumns}
                      dataSource={task}
                      rowKey="id"
                      pagination={{ pageSize: pageSize, current: currentPage, onChange: setCurrentPage }}
                    />
                  </Content>
                </Layout>
              )}
            </TabPane>
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
      {selectedKPI && (
        <DetailKPIModal
          isVisible={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          task={selectedKPI}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </Layout>
  );
};

export default TrainingProgramDetail;
