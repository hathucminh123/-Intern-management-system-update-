import React, { useEffect, useState } from 'react';
import { Table, message, Typography, Layout, Button, Modal, Form } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCandidate } from '../../../service/Candidate';
import { sendEmail } from '../../../service/EmailService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LeftOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const ViewGuestInfoCv = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [form] = Form.useForm();
  const { state } = useLocation();
  const navigate =useNavigate();
  const jobID = state?.jobID;
  const CampaignDetails = state?.CampaignDetail;
  const CampaignID = state?.CampaignID;
  const Jobss = state?.job;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCandidate(CampaignID, jobID);
        setData(response.events);
      } catch (error) {
        message.error('Error fetching data from API');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (CampaignID && jobID) {
      fetchData();
    } else {
      message.error('Campaign ID or Job ID not found');
      setLoading(false);
    }
  }, [CampaignID, jobID]);

  const showModal = (email) => {
    setSelectedUser(email);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSendEmail = async () => {
    const emailData = {
      recievedUser: selectedUser,
      content: emailContent,
    };
    await sendEmail(emailData)

    console.log('Email data:', emailData);
    message.success('Gửi email thành công');
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Education',
      dataIndex: 'education',
      key: 'education',
    },
    {
      title: 'CV',
      dataIndex: 'cvPath',
      key: 'cvPath',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">View CV</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => showModal(record.email)}>Gửi Email</Button>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Danh sách ứng tuyển
       
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto" style={{ padding: "24px" }}>
        <Button className="mb-4 flex items-center" onClick={() => navigate(-1)}>
          <LeftOutlined /> Back
        </Button>
          <Typography.Title>Vị trí ứng tuyển {Jobss} vào chương trình {CampaignDetails.name}</Typography.Title>
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
          />
        </div>
      </Content>
      <Footer />
      <Modal
        title="Gửi Email"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 100 }}
        width={800} 
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }} 
      >
        <Form form={form} onFinish={handleSendEmail}>
          <Form.Item
            name="content"
            rules={[{ required: true, message: 'Please enter the email content!' }]}
          >
            <ReactQuill 
              value={emailContent} 
              onChange={setEmailContent} 
              theme="snow" 
              style={{ height: '300px' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewGuestInfoCv;
