import React, { useEffect, useState } from 'react';
import { Table, message ,Typography} from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase/config'; // Adjust the path as needed

const ViewGuestInfoCv = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'applications'));
        const applications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(applications);
      } catch (error) {
        message.error('Error fetching data from Firestore');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Training Program',
      dataIndex: 'list',
      key: 'list',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'CV Người dùng',
      dataIndex: 'cvUrl',
      key: 'cvUrl',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">View CV</a>,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title >Danh sách ứng tuyển Training program</Typography.Title>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="id" 
      />
    </div>
  );
};

export default ViewGuestInfoCv;