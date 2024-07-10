import React, { useState } from 'react'
import { Typography, Form, Input, Layout, Select, Button ,Table,Menu,Space,Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserListReport = () => {

const {Text,Title}=Typography;
const {Header,Content}=Layout
const [pageSize] = useState(6);
const [currentPage, setCurrentPage] = useState(1);
const navigate =useNavigate();
const useRole =localStorage.getItem('role')


const menu = (record) => (
  <Menu>
    <Menu.Item key="1">
      <Button onClick={() => handleOpenDetailModal(record)}>View</Button>
    </Menu.Item>
    {/* <Menu.Item key="2">
      <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
    </Menu.Item>
    <Menu.Item key="3">
      <Button onClick={() => handleDeleteResource(record.id)}>Delete</Button>
    </Menu.Item> */}
  </Menu>
);
const   handleNavigateReport =(record)=>{
  navigate(`/mentor/markReport/${record.id}`,{state:{record}})
}


    const dataReport = [
      { id: 1, name: "Thúc Minh", email: 'minhhtse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' },
      { id: 2, name: "Hoàng Hiệp", email: 'hiepse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' },
      { id: 3, name: "Minh Trí", email: 'trise150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' },
      { id: 4, name: "Tâm", email: 'tamse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' }
      ];
    
    
      const columnsReport = [
        { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
        { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", responsive: ['md'] },
        { title: "Education", dataIndex: "education", key: "education", responsive: ['md'] },
        {
          title: "Actions", key: "actions", responsive: ['md'], render: (text, record) => (
            <Space size="middle">
              <Dropdown overlay={menu(record)}>
                <Button>
                  More <DownOutlined />
                </Button>
              </Dropdown>
              <Button onClick={()=>{handleNavigateReport(record)}}>View Report</Button>
            </Space>
          ),
        },
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