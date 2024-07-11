import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu } from 'antd';
import * as KPI from "../../../service/KPIService";
import DetailModal from './DetailModal';
import { DownOutlined } from '@ant-design/icons';
import * as Training from "../../../service/TrainingPrograms";
import { useLocation, useNavigate } from 'react-router-dom';
import DetailKPIModal from './DetailKPIModal';

import CreateKPIModal from './CreateKPIModal';

const { Text, Title } = Typography;
const { Header, Content } = Layout;

const KPIListt = () => {
  const { state } = useLocation();
  const TrainingProgram = state?.item;
  const [resource, setResource] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({});
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const navigate = useNavigate();

  const fetchAllKPI = async () => {
    try {
      const res = await KPI.fetchKPI();
      setResource(res.events);
    } catch (error) {
      message.error("Error fetching content: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllKPI();
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
          kpiId: resourceId,
        };

        await Training.AddKPISNewTraining(dataResource);
      }

      message.success("Resources added to training program successfully!");
      navigate('/internshipcoordinators/ViewTrainingProgram')
    } catch (error) {
      message.error("KPI is already exist in this training program");
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await KPI.deleteKPI(id);
      message.success("Delete complete");
      setResource((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      message.error("Error deleting KPI " + error.message);
    }
  };

  const handleAddTrainingProgram = (item) => {
    navigate(`/internshipcoordinators/TrainingListt/${item.id}`, { state: { item } })

  }

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteResource(record.id)}>Delete</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button onClick={() => handleAddTrainingProgram(record)}>Add to Training Program</Button>
      </Menu.Item>
    </Menu>
  );

  const handleUpdateTask = (updatedTask) => {
    setResource((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };

  const handleAddKPI = (newKPI) => {
    setResource((prev) => [...prev, newKPI]);
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
    // { title: "Value", dataIndex: "value", key: "value", responsive: ['md'] },
    { title: "Description", dataIndex: "descition", key: "description", responsive: ['md'] },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ['md'],
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
        <Title level={3}> Add KPI to {TrainingProgram.name}</Title>
        {/* <Button type="primary" onClick={() => setOpenCreateModal(true)}>Create KPI</Button> */}
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
        <DetailKPIModal
          isVisible={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          task={selectedResource}
          onUpdateTask={handleUpdateTask}
        />
      )}
      <CreateKPIModal
        isVisible={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onAddKPI={handleAddKPI}
        fetchList={fetchAllKPI}
      />
    </Layout>
  );
}

export default KPIListt;
