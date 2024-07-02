import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu } from 'antd';
import * as Resource from "../../../service/Resource";
import DetailModal from './DetailModal';
import { DownOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Header, Content } = Layout;

const ResourceList = () => {
  const [resource, setResource] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({});
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const fetchAllResource = async () => {
    try {
      const res = await Resource.fetchResource();
      setResource(res.events);
    } catch (error) {
      message.error("Error fetching content: " + error.message);
    }
  }

  useEffect(() => {
    fetchAllResource();
  }, []);

  const handleCheckboxChange = (record, checked) => {
    setCheckedKeys((prev) => ({ ...prev, [record.id]: checked }));
  };

  const handleOpenDetailModal = (task) => {
    setSelectedResource(task);
    setOpenDetailModal(true);
  };

  const handleDeleteResource = async (id) => {
    try {
      await Resource.deleteResource(id);
      message.success("Delete complete");
      setResource((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      message.error("Error Delete: " + error.message);
    }
  }

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteResource(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const handleUpdateTask = (updatedTask) => {
    setResource((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };

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
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Description", dataIndex: "description", key: "description", responsive: ['md'] },
    { 
      title: "File", 
      dataIndex: "filePath", 
      key: "filePath", 
      responsive: ['md'],
      render: (filePath) => <a href={filePath} target="_blank" rel="noopener noreferrer">View File</a>,
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
      <Header style={{ backgroundColor: "#001529", color: "white", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Title level={4} style={{ lineHeight: '64px', color: 'white', margin: 0 }}>Resource List</Title>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Table
          dataSource={resource}
          columns={columns}
          rowKey="id"
          style={{ marginTop: "20px" }}
          pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
        />
        <div style={{ marginTop: "20px" }}>
          <Button type="primary" disabled={Object.keys(checkedKeys).length === 0}>
            Add to Training Program
          </Button>
        </div>
      </Content>
      {selectedResource && (
        <DetailModal
          isVisible={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          task={selectedResource}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </Layout>
  );
}

export default ResourceList;
