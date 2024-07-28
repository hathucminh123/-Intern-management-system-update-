import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Checkbox, Button, message, Space, Dropdown, Menu, Spin, Row, Col } from 'antd';
import * as KPI from "../../../service/KPIService";
import DetailModal from './DetailModal';
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllKPI = async () => {
    setLoading(true);
    try {
      const res = await KPI.fetchKPI();
      setResource(res.events);
    } catch (error) {
      message.error("Error fetching content: " + error.message);
    } finally {
      setLoading(false);
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
    setLoading(true);
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
      navigate('/internshipcoordinators/ViewTrainingProgram');
    } catch (error) {
      message.error("KPI is already exist in this training program");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (id) => {
    setLoading(true);
    try {
      await KPI.deleteKPI(id);
      message.success("Delete complete");
      setResource((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      message.error("Error deleting KPI " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrainingProgram = (item) => {
    navigate(`/internshipcoordinators/TrainingListt/${item.id}`, { state: { item } });
  };

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
    { title: "Description", dataIndex: "description", key: "description", responsive: ['md'] },
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
      <Header style={{ backgroundColor: 'white', borderBottom: '1px solid #f0f0f0', padding: '0 20px',height:'10vh' }}>
       <Row>
       <Col span={5}>
       <Button className="mt-3 mb-4 flex items-center" onClick={() => navigate(-1)}>
          <LeftOutlined /> Back
        </Button>
       
       </Col>
       <Col span={19}>
       <Title className='mt-3' level={3}> Add KPI to {TrainingProgram.name} </Title>
       </Col>
       
       
       </Row>
    
     
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
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
          </>
        )}
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
