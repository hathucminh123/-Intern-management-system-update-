import React, { useEffect, useState } from 'react'
import { Typography, Form, Input, Layout, Select, Button ,Table,Menu,Space,Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as User from "../../service/authService"

const UserListReport = () => {

const {Text,Title}=Typography;
const {Header,Content}=Layout
const [pageSize] = useState(6);
const [currentPage, setCurrentPage] = useState(1);
const navigate =useNavigate();
const userRole =localStorage.getItem('role')
const [users, setUsers] = useState([]);

const fetchUsers = async () => {
  try {
    const res = await User.fetchUser();
    const filteredUsers = res.events.filter(user => user.role === 0); 
    setUsers(filteredUsers);
  } catch (error) {
    message.error('Fetch User Error: ' + error.message);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

 const handleOpenDetailModal =(item)=>{
  navigate(`/${userRole}/UserDetailsRole/${item.id}`, { state: { item } });
 }

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
const   handleNavigateDetailsReport =(record)=>{
  navigate(`/mentor/kpiReport/${record.id}`,{state:{record}})
}



    const dataReport = [
      { id: 1, name: "Thúc Minh", email: 'minhhtse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University',role:'intern' },
      { id: 2, name: "Hoàng Hiệp", email: 'hiepse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University',role:'intern' },
      { id: 3, name: "Minh Trí", email: 'trise150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University',role:'intern' },
      { id: 4, name: "Tâm", email: 'tamse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University',role:'intern' }
      ];
    
    
      const columnsReport = [
        {
          title: 'User Name',
          dataIndex: 'userName',
          key: 'userName',
          responsive: ['md'],
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          responsive: ['md'],
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          responsive: ['md'],
          render: (text) => (
            <strong>
              {text === 0 && 'Intern'}
              {text === 1 && 'Mentor'}
              {text === 2 && 'Internship Coordinators'}
              {text === 3 && 'HR Manager'}
              {text === 4 && 'Admin'}
            </strong>
          ),
        },
        {
          title: "Actions", key: "actions", responsive: ['md'], render: (text, record) => (
            <Space size="middle">
              <Dropdown overlay={menu(record)}>
                <Button>
                  More <DownOutlined />
                </Button>
              </Dropdown>
              <Button onClick={()=>{handleNavigateReport(record)}}>Take Report</Button>
              <Button onClick={()=>{handleNavigateDetailsReport(record)}}>View Report</Button>
            
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
                    dataSource={users}
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