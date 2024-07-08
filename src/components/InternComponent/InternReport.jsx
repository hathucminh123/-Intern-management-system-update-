import React, { useState } from 'react';
import { Typography, Layout, Table } from 'antd';

const InternReport = () => {
  const { Text, Title, Paragraph } = Typography;
  const { Header, Content } = Layout;
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const dataReport = [
    { id: 1, name: "Thúc Minh", Logicalthinking: 'A', attitude: 'B', skill: 'C', total: 'B' },
    { id: 2, name: "Hoàng Hiệp", Logicalthinking: 'A', attitude: 'B', skill: 'C', total: 'B' },
    { id: 3, name: "Minh Trí", Logicalthinking: 'A', attitude: 'B', skill: 'C', total: 'B' },
    { id: 4, name: "Tâm", Logicalthinking: 'A', attitude: 'B', skill: 'C', total: 'B' }
  ];

  const columnsReport = [
    { title: "Name Intern", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Logical Thinking", dataIndex: "Logicalthinking", key: "Logicalthinking", responsive: ['md'] },
    { title: "Attitude", dataIndex: "attitude", key: "attitude", responsive: ['md'] },
    { title: "Skill", dataIndex: "skill", key: "skill", responsive: ['md'] },
    { title: "Total", dataIndex: "total", key: "total", responsive: ['md'] },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0',minHeight:'100px' }}>
        <Title level={3} style={{ margin: 0 }}>Intern Report List</Title>
        {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Text strong>Intern Name:</Text>
          <Paragraph style={{ marginLeft: '10px', marginBottom: 0 }}>Minh</Paragraph>
        </div> */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Text strong>Class:</Text>
          <Paragraph style={{ marginLeft: '10px', marginBottom: 0 }}>Reactjs</Paragraph>
        </div>
        {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Text strong>Grade:</Text>
          <Paragraph style={{ marginLeft: '10px', marginBottom: 0 }}>A</Paragraph>
        </div> */}
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Table
            columns={columnsReport}
            dataSource={dataReport}
            rowKey="id"
            style={{ marginTop: "20px" }}
            pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default InternReport;
