import React, { useEffect, useState } from 'react';
import { Table, message, Typography,Layout } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { fetchCandidate } from '../../../service/Candidate';
const { Header, Content, Footer } = Layout;
const ViewGuestInfoCv = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const programId = state?.programId;
  const CampaignDetails = state?.CampaignDetail;
  const Jobss=state?.job;
  console.log('asdasd',CampaignDetails)
  console.log('asd',Jobss)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCandidate(programId)
        setData(response.events);
    
      } catch (error) {
        message.error('Error fetching data from API');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (programId) {
      fetchData();
    } else {
      message.error('Program ID not found');
      setLoading(false);
    }
  }, [programId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`https://intern-management.onrender.com/api/Candidate?programId=${programId}`);
  //       setData(response.data.result);
  //       console.log('data', response.data.result);
  //     } catch (error) {
  //       message.error('Error fetching data from API');
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (programId) {
  //     fetchData();
  //   } else {
  //     message.error('Program ID not found');
  //     setLoading(false);
  //   }
  // }, [programId]);

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
  ];

  return (
    <Layout>
    <Header style={{ color: 'white' }}>Trang chủ    </Header>
    <Content style={{ padding: '24px', minHeight: '80vh' }}>
    <div style={{ padding: '24px' }}>
      
      <Typography.Title>Vị trí ứng tuyển {Jobss}  vào  chương trình {CampaignDetails.name}</Typography.Title>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />
    </div>
    </Content>
  
  </Layout>
  );
};

export default ViewGuestInfoCv;
