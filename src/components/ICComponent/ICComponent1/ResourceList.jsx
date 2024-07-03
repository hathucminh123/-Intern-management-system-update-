import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu } from 'antd';
import * as Resource from "../../../service/Resource";
import DetailModal from './DetailModal';
import { DownOutlined } from '@ant-design/icons';
import * as Training from "../../../service/TrainingPrograms";
import { useLocation, useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { Header, Content } = Layout;

const ResourceList = () => {
  const { state } = useLocation();
  const TrainingProgram = state?.item;
  const [resource, setResource] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({});
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const navigate = useNavigate();

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

  const handleDeleteResource = async (id) => {
    try {
      await Resource.deleteResource(id);
      message.success("Delete complete");
      setResource((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      message.error("Error deleting resource: " + error.message);
    }
  };

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
     <div className="mt-8 flex justify-between items-center">
              <Title level={3}>Resource List</Title>
            
            </div>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Table
          dataSource={resource}
          columns={columns}
          rowKey="id"
          style={{ marginTop: "20px" }}
          pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
        />
        <div style={{ marginTop: "20px" }}>
          <Button type="primary" disabled={Object.keys(checkedKeys).length === 0} onClick={handleSubmit}>
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
