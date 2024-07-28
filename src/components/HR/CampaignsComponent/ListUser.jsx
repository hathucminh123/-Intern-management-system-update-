import React, { useEffect, useState, useMemo } from 'react';
import { Dropdown, Table, Layout, Typography, Menu, Button, Space, message, Input, Spin, Select, Popover } from 'antd';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as User from '../../../service/authService';

const { Text: AntdText } = Typography;
const { Search } = Input;
const { Option } = Select;

const ListUser = () => {
  const { Header, Content } = Layout;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const { Title } = Typography;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const userRole = localStorage.getItem('role');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await User.fetchUser();
      setUsers(res.events);
    } catch (error) {
      message.error('Fetch User Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const onRoleChange = (value) => {
    setSelectedRole(value);
  };

  const systemUser = users.filter(user => user.role !== 5);

  const filteredUser = systemUser.filter((systemUser) => {
    const matchesSearchQuery = systemUser.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === null || selectedRole === undefined || systemUser.role === selectedRole;
    return matchesSearchQuery && matchesRole;
  });

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

  const content = useMemo(() => (
    <Space direction="vertical">
      <AntdText strong>Filter by role:</AntdText>
      <Select
        placeholder="Choose user"
        allowClear
        onChange={onRoleChange}
        style={{ width: 300 }}
      >
        <Option value={0}>Intern</Option>
        <Option value={1}>Mentor</Option>
        <Option value={2}>Internship Coordinators</Option>
        <Option value={3}>HR Manager</Option>
      </Select>
    </Space>
  ), [onRoleChange]);

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
          {text === 0 && 'Intern'}
          {text === 1 && 'Mentor'}
          {text === 2 && 'Internship Coordinators'}
          {text === 3 && 'HR Manager'}
          {text === 4 && 'Admin'}
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
            <Popover
              content={content}
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Button icon={<FilterOutlined />} />
            </Popover>
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

export default ListUser;

