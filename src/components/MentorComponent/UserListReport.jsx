import React, { useState } from 'react'
import { Typography, Form, Input, Layout, Select, Button ,Table} from 'antd';

const UserListReport = () => {

const {Text,Title}=Typography;
const {Header,Content}=Layout
const [pageSize] = useState(6);
const [currentPage, setCurrentPage] = useState(1);



    const dataReport = [
        { id: 1, name: "Thúc Minh", Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B' },
        { id: 2, name: "Hoàng Hiệp", Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B'},
        { id: 3, name: "Minh Trí", Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B'},
        { id: 4, name: "Tâm",  Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B' }
      ];
    
    

    const columnsReport = [
        { title: "Name Intern", dataIndex: "name", key: "name", responsive: ['md'] },
        { title: "Logical thinking", dataIndex: "Logicalthinking", key: "Logicalthinking", responsive: ['md'] },
        { title: "Attitude", dataIndex: "attitude", key: "attitude", responsive: ['md'] },
        { title: "skill", dataIndex: "skill", key: "skill", responsive: ['md'] },
        { title: "Total", dataIndex: "total", key: "total", responsive: ['md'] },
       
      ];
    
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Create New Report to User</Title>
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
  )
}

export default UserListReport