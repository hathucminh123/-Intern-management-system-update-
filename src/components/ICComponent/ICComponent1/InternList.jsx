import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu, Input } from 'antd';
import * as User from "../../../service/authService";
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Userr from "../../../service/User";

const { Text, Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const userRoles = {
  0: 'Intern',
  3: 'HR Manager',
  2: 'Internship Coordinators',
  1: 'Mentor',
  4: 'Admin'
};

const InternList = () => {
  const { state } = useLocation();
  const jobDetail = state?.jobDetail;
  const campaignDetail = state?.campaignDetail;
  const [users, setUsers] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({});
 

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await User.fetchUser();
      const filteredUsers = res.events.filter(user => user.role === 0 ); 
      setUsers(filteredUsers);
    } catch (error) {
      message.error('Error fetching users: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxChange = (record, checked) => {
    setCheckedKeys((prev) => ({ ...prev, [record.id]: checked }));
  };

  const handleAddUser = async () => {
    try {
      const selectedUserIds = Object.keys(checkedKeys).filter(key => checkedKeys[key]).map(key => parseInt(key, 10));
      for (const userId of selectedUserIds) {
        const newUser = {
          userId: userId,
          campaginId: campaignDetail.id,
          jobId: jobDetail.id
        };
        await Userr.AddNewStudentinCampaignJob(newUser);
      }
      message.success(`Add successfully user into: job ${jobDetail.name} from ${campaignDetail.name}`);
      navigate('/internshipcoordinators/class');
    } catch (error) {
      message.error('Add user failed: ' + error.message);
    }
  };
  console.log('user',checkedKeys)

  const handleOpenDetailModal = (item) => {
    navigate(`/${localStorage.getItem('role')}/UserDetailsRole/${item.id}`, { state: { item } });
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View</Button>
      </Menu.Item>
    </Menu>
  );

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  const filteredUsers = users.filter(user => 
    user.userName.toLowerCase().includes(searchQuery)
  );

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={!!checkedKeys[record.id]}
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
        />
      ),
    },
    { title: "Name", dataIndex: "userName", key: "userName", responsive: ['md'] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", responsive: ['md'] },
    { 
      title: "Role", 
      dataIndex: "role", 
      key: "role", 
      responsive: ['md'],
      render: (key) => <span><strong>{userRoles[key]}</strong></span>
    },
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
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: '#fff', padding: '0 20px', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Mentor and Intern List</Title>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Search 
          placeholder="Search by Name" 
          enterButton 
          onSearch={handleSearch} 
          style={{ marginBottom: '20px' }} 
        />
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          style={{ marginTop: "20px" }}
        />
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Button type="primary" disabled={Object.keys(checkedKeys).length === 0} onClick={handleAddUser}>
            Add to Class Campaign Jobs
          </Button>
        </div>
      </Content>
    </Layout>
  );
}

export default InternList;
