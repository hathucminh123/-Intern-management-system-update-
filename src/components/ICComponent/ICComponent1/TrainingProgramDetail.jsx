import React, { useState, useEffect } from "react";
import { Typography, Button, Tag, Tabs, Form, Input, Table, message, Upload,Layout } from "antd";
import "tailwindcss/tailwind.css";
import { useLocation, useParams } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import * as Resource from "../../../service/Resource";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const TrainingProgramDetail = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const CampaignDetail = state?.item;
  const { Header, Content, Footer } = Layout;
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);
const [pageSize]=useState(3)
const [currentPage,setCurrentPage]=useState(1)
  useEffect(() => {
    if (CampaignDetail?.resources) {
      setResources(CampaignDetail.resources);
    }
  }, [CampaignDetail]);



  if (!CampaignDetail) {
    return <div>Training program detail not found</div>;
  }
const onchange =(page)=>{
  setCurrentPage(page)
}
  const handleAddResource = async (values) => {
    setLoading(true);
    try {
      if (!cvFile) {
        message.error('Please upload your file!');
        return;
      }

      // Upload file to Firebase Storage
      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

    
      const resourceData = {
        ...values,
        filePath: fileUrl,
        trainingProgramIds: [CampaignDetail.id]
      };

      await addDoc(collection(firestore, 'resources'), resourceData);

  
      await Resource.createNewResource(resourceData);

  
      setResources([...resources, resourceData]);

      message.success('Resource added successfully!');
      setCvFile(null);
    } catch (error) {
      message.error('Error submitting form. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
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
      title: 'File Path',
      dataIndex: 'filePath',
      key: 'filePath',
      render: (filePath) => <a href={filePath} target="_blank" rel="noopener noreferrer">View File</a>,
    },
    
  ];
  const userRole =localStorage.getItem('role').toLowerCase();

  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  return (
    <Layout >
    <Header style={{ color: 'white' }}>Create new TrainingProgram   </Header>
  <Content style={{ padding: '10px', minHeight: '80vh' }}>
    <div className="flex justify-center items-center">
      <div className=" w-full bg-white p-8 shadow-lg rounded-lg">
        <Tabs defaultActiveKey="1" className="w-full">
          <TabPane tab="Training Details" key="1">
            <div className="flex mb-8">
              <div className="mt-8">
                <Title className="" level={2}>
                  <div>{CampaignDetail.name}</div>
                </Title>
                <div className="flex mt-3">
                  <div>Duration :</div>
                  <Tag className="ml-3" color="#87d068">
                    {CampaignDetail.duration} months
                  </Tag>
                </div>
              </div>
            </div>
            <hr />
            <Title className="mt-8" level={3}>
              Course Description
            </Title>
            <Paragraph>
              <div dangerouslySetInnerHTML={{ __html: CampaignDetail.courseObject }} />
            </Paragraph>

            <Title level={3} className="">
              Output Object
            </Title>
            <Paragraph>
              <div dangerouslySetInnerHTML={{ __html: CampaignDetail.outputObject }} />
            </Paragraph>

            <Title level={3} className="">
              Application
            </Title>
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
          </TabPane>
          <TabPane tab="Resources" key="2">
        {userRole === "internshipcoordinators" 
        &&
        ( <Form layout="vertical" onFinish={handleAddResource}>
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
                label={
                  <div>
                    <Text strong>Upload File</Text>
                    <div>You can only upload one file</div>
                  </div>
                }
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
            <Table columns={columns} dataSource={resources} rowKey="name" pagination={{pageSize:pageSize,current:currentPage,onChange:onchange}}/>
          </TabPane>
        </Tabs>
      </div>
    </div>
    </Content>
    </Layout>
  );
};

export default TrainingProgramDetail;
