import React, { useEffect, useState } from 'react';
import { Dropdown, Table, Layout, Typography, Menu, Button, Space, message, Input, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as User from '../../../service/authService';

const { Search } = Input;
const ListGuest = () => {
  const { Header, Content } = Layout;
  const [searchQuery, setSearchQuery] = useState("");
  const { Title } = Typography;
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await User.fetchUser();
      setUsers(res.events.filter(role =>  role.role === 5));
    } catch (error) {
      message.error('Fetch User Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredUser = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDetailModal = (item) => {
    navigate(`/${userRole}/UserDetailsRole/${item.id}`, { state: { item } });
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      await User.deleteUser(id);
      message.success('User deleted successfully');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      message.error('Delete User Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (item) => {
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
        <Button type="text" onClick={() => handleOpenEditModal(record)}>Edit</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="text" onClick={() => handleDeleteUser(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
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
        
          {text === 5 && 'Guest'}
        </strong>
      ),
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
        {/* Uncomment and modify the following line if needed */}
        {/* <Button type="primary" onClick={() => navigate(`/${userRole}/CreateUser`)}>Create User</Button> */}
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <div>
          <Space direction="vertical" className="flex flex-row items-center mb-5">
            <Search
              size="large"
              placeholder="Search"
              onSearch={onSearch}
              enterButton
              className="w-full"
            />
          </Space>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table dataSource={filteredUser} columns={columns} pagination={{ pageSize: 10 }} rowKey="id" />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ListGuest;
