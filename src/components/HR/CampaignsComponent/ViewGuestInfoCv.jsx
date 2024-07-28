import React, { useEffect, useState } from 'react';
import { Table, message, Typography, Layout, Button, Modal, Form, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCandidate, EditNewCandidate } from '../../../service/Candidate';
import { sendEmail } from '../../../service/EmailService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LeftOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

const ViewGuestInfoCv = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalStatusVisible, setIsModalStatusVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCan, setSelectedCan] = useState(null);
  const [emailContent, setEmailContent] = useState('');
  const [form] = Form.useForm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const jobID = state?.jobID;
  const CampaignDetails = state?.CampaignDetail;
  const CampaignID = state?.CampaignID;
  const Jobss = state?.job;

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

  useEffect(() => {
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

  const showModalStatus = (id) => {
    setSelectedCan(id);
    setIsModalStatusVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalStatusVisible(false);
    form.resetFields();
  };

  const handleSendEmail = async () => {
    const emailData = {
      recievedUser: selectedUser,
      content: emailContent,
    };
    await sendEmail(emailData);

    console.log('Email data:', emailData);
    message.success('Email sent successfully');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleUpdateStatus = async () => {
    const StatusData = {
      id: selectedCan,
      candidateStatus: form.getFieldValue('candidateStatus')
    };
    await EditNewCandidate(StatusData);

    console.log('Candidate status:', StatusData);
    message.success('Candidate status updated successfully');
    setIsModalStatusVisible(false);
    form.resetFields();
    fetchData();
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
      title: 'Status',
      dataIndex: 'candidateStatus',
      key: 'candidateStatus',
      render: (text, record) => <Text>{record.candidateStatus}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => showModalStatus(record.id)} style={{ marginRight: '8px' }}>
            Update Status
          </Button>
          <Button type="default" onClick={() => showModal(record.email)}>
            Send Email
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={styles.header}>
        Danh sách ứng tuyển
      </Header>
      <Content style={styles.content}>
        <div style={styles.container}>
          <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)} style={styles.backButton}>
            Back
          </Button>
          <Title level={3}>Vị trí ứng tuyển {Jobss} vào chương trình {CampaignDetails.name}</Title>
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Content>
      <Footer style={styles.footer} />
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
      <Modal
        title="Update Status"
        visible={isModalStatusVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 100 }}
        width={600}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <Form form={form} onFinish={handleUpdateStatus}>
          <Form.Item
            name="candidateStatus"
            rules={[{ required: true, message: 'Please select the candidate status!' }]}
          >
            <Select placeholder="Select Status" allowClear>
              <Select.Option value={0}>Applied</Select.Option>
              <Select.Option value={1}>Interview Scheduled</Select.Option>
              <Select.Option value={2}>Interviewed</Select.Option>
              <Select.Option value={3}>Accepted</Select.Option>
              <Select.Option value={4}>Declined</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

const styles = {
  header: {
    backgroundColor: 'white',
    color: 'black',
    borderBottom: '1px solid #f0f0f0',
    padding: '0 24px',
  },
  content: {
    backgroundColor: '#f0f2f5',
    padding: '20px',
    minHeight: '80vh',
  },
  container: {
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    marginBottom: '16px',
  },
  footer: {
    textAlign: 'center',
  },
};

export default ViewGuestInfoCv;
