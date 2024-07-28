import React, { useState } from 'react'
import { Layout ,Table,Menu,Dropdown,Space,Button} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const StudentListClass = () => {
    const { Header,Content}=Layout
    const [pageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate =useNavigate();
   const userRole =localStorage.getItem('role');
const data = [
    { id: 1, name: "Thúc Minh", email: 'minhhtse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt',class:'reactjs ',role:'intern' },
    { id: 2, name: "Hoàng Hiệp", email: 'hiepse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt',class:'reactjs ',role:'intern' },
    { id: 3, name: "Minh Trí", email: 'trise150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt ',class:'reactjs ',role:'intern' },
    { id: 4, name: "Tâm", email: 'tamse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt',class:'reactjs ',role:'intern' }
  ];
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

  const columns = [
    // {
    //   title: "",
    //   dataIndex: "checkbox",
    //   key: "checkbox",
    //   render: (_, record) => (
    //     <Checkbox
    //       checked={!!checkedKeys[record.id]}
    //       onChange={(e) => handleCheckboxChange(record, e.target.checked)}
    //     />
    //   ),
    // },
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
    { title: "phoneNumber", dataIndex: "phoneNumber", key: "phoneNumber", responsive: ['md'] },
    { title: "education", dataIndex: "education", key: "education", responsive: ['md'] },
    { title: "class", dataIndex: "class", key: "class", responsive: ['md'] },
    // { 
    //   title: "Role", 
    //   dataIndex: "role", 
    //   key: "type", 
    //   responsive: ['md'],
    // },
    { 
      title: "Actions", 
      key: "actions", 
      responsive: ['md'], 
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        student List
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <div className="container mx-auto">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          style={{ marginTop: "20px" }}
          pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
        />
         </div>
         </Content>
         </Layout>   
  )
}

export default StudentListClass