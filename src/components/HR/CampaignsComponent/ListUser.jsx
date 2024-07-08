import React from 'react';
import { Dropdown, Table, Layout, Typography, Menu, Button, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ListUser = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  const handleOpenDetailModal = (item) => {
    if (item.role === "Intern") {
    navigate(`/${userRole}/UserDetails/${item.id}`, { state: { item } });
    }else{
    navigate(`/${userRole}/UserDetailsRole/${item.id}`, { state: { item } });
    }
  };

  const handleDeleteResource = (id) => {
    message.info(`Delete User ID: ${id}`);
  };

  const handleAddTrainingProgram = (record) => {
    message.info(`Add to Training Program: ${record.name}`);
  };

  const handleOpenDetailModall = (item) => {
    if (item.role === "Intern") {
      navigate(`/${userRole}/EditUserIntern/${item.id}`, { state: { item } });
    } else {
      navigate(`/${userRole}/EditUserRole/${item.id}`, { state: { item } });
    }
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button type="text" onClick={() => handleOpenDetailModal(record)}>View</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="text" onClick={() => handleOpenDetailModall(record)}>Edit</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="text" onClick={() => handleDeleteResource(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const data = [
    {
      id: 1,
      name: 'Hà Thúc Minh',
      email: 'minhhtse150913@fpt.edu.vn',
      role: 'HRManager',
    },
    {
      id: 2,
      name: 'Tâm',
      email: 'minhhtse150913@fpt.edu.vn',
      role: 'internshipcoordinators',
    },
    {
      id: 3,
      name: 'Hiệp',
      email: 'minhhtse150913@fpt.edu.vn',
      role: 'Mentor',
    },
    {
      id: 4,
      name: 'Trí',
      email: 'minhhtse150913@fpt.edu.vn',
      role: 'Intern',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ['md'],
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)} trigger={['click']}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="flex justify-between items-center"
        style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0', padding: '0 20px' }}
      >
        <Title level={3} style={{ margin: 0 }}>User List</Title>
        {/* <Button type="primary" onClick={() => message.info('Create User clicked')}>Create User</Button> */}
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <div className="">
          <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
      </Content>
    </Layout>
  );
};

export default ListUser;
