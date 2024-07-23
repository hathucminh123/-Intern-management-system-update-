import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu,Input } from 'antd';
import * as Resource from "../../../service/Resource";
import DetailModal from './DetailModal';
import { DownOutlined } from '@ant-design/icons';
import * as Training from "../../../service/TrainingPrograms";
import { useLocation, useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;
const ResourceListt = () => {
  const { state } = useLocation();
  const TrainingProgram = state?.item;
  const [resource, setResource] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({});
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredResource = resource.filter((train) =>
    train.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const fetchAllResource = async () => {
    try {
      const res = await Resource.fetchResource();
      setResource(res.events);
    } catch (error) {
      message.error("Error fetching content: " + error.message);
    }
  };

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

  const handleSubmit = async () => {
    try {
      const selectedResourceIds = Object.keys(checkedKeys).filter(key => checkedKeys[key]).map(key => parseInt(key, 10));
      
      for (const resourceId of selectedResourceIds) {
        const dataResource = {
          trainingProgramId: TrainingProgram.id,
          resourceId: resourceId,
        };

        await Training.AddResourceNewTraining(dataResource);
      }

      message.success("Resources added to training program successfully!");
      navigate('/internshipcoordinators/ViewTrainingProgram')
    } catch (error) {
      message.error("Resource already exists in training: " );
    }
  };

  const handleDeleteResource = async (record) => {
    try {
      await Resource.deleteResource(record.id);
      message.success("Delete complete");
      setResource((prev) => prev.filter(item => item.id !== record.id));
    } catch (error) {
      message.error(`Resource name ${record.name} is still in a  training program!`);
    }
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteResource(record)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const handleUpdateTask = (updatedTask) => {
    setResource((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };

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
      <Header style={{ backgroundColor: "#fff", color: "white", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Title level={4} style={{ lineHeight: '64px', color: 'black', margin: 0 }}>Resource List</Title>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      <Search
            size="large"
            placeholder="Search Resources"
            onSearch={onSearch}
            enterButton
            className="w-full mb-5"
            style={{ maxWidth: '500px', margin: '0 auto' }}
          />

        <Table
          dataSource={filteredResource}
          columns={columns}
          rowKey="id"
          style={{ marginTop: "20px" }}
          pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
        />
        <div style={{ marginTop: "20px" }}>
          {/* <Button type="primary" disabled={Object.keys(checkedKeys).length === 0} onClick={handleSubmit}>
            Add to Training Program
          </Button> */}
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

export default ResourceListt;
