import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu, Input, Spin, Row, Col } from 'antd';
import * as User from "../../../service/authService";
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
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

const MentorList = () => {
  const { state } = useLocation();
  const jobDetail = state?.jobDetail;
  const campaignDetail = state?.campaignDetail;
  const [users, setUsers] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await User.fetchUser();
      const filteredUsers = res.events.filter(user => user.role === 1);
      setUsers(filteredUsers);
    } catch (error) {
      message.error('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxChange = (record, checked) => {
    setCheckedKeys((prev) => ({ ...prev, [record.id]: checked }));
  };

  const handleAddUser = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

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
      <Row>
          <Col span={10}>
          <Button className="mb-4 mt-3 flex items-center" onClick={() => navigate(-1)}>
          <LeftOutlined /> Back
        </Button>
          </Col>
          <Col>
          <Title className='mt-3' level={3} style={{ margin: 0 }}>Mentor List</Title>
          </Col>
        </Row>

      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Search
          placeholder="Search by Name"
          enterButton
          onSearch={handleSearch}
          style={{ marginBottom: '20px' }}
        />
        <Spin spinning={loading}>
          <Table
            dataSource={filteredUsers}
            columns={columns}
            rowKey="id"
            style={{ marginTop: "20px" }}
          />
        </Spin>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Button type="primary" disabled={Object.keys(checkedKeys).length === 0 || loading} onClick={handleAddUser}>
            Assign to manage jobs
          </Button>
        </div>
      </Content>
    </Layout>
  );
}

export default MentorList;
