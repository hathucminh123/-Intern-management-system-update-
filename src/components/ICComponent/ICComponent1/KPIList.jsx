import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Button, message, Space, Dropdown, Menu, Collapse, Card, Row, Col, Input } from 'antd';
import * as KPI from "../../../service/KPIService";
import { DownOutlined } from '@ant-design/icons';
import * as Training from "../../../service/TrainingPrograms";
import { useLocation, useNavigate } from 'react-router-dom';
import DetailKPIModal from './DetailKPIModal';
import CreateKPIModal from './CreateKPIModal';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;

const KPIList = () => {
  const { state } = useLocation();
  const TrainingProgram = state?.item;
  const [resource, setResource] = useState([]);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleOpenDetailModal = (task) => {
    setSelectedResource(task);
    setOpenDetailModal(true);
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
    navigate(`/internshipcoordinators/TrainingListt/${item.id}`, { state: { item } });
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
      title: 'Grade Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Grade Item',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <>
          <div>{record.type}</div>
        </>
      ),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: (text, record) => (
        <>
          <div>{record.weight}%</div>
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
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

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredResources = resource.filter((item) =>
    item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#fff", color: "black", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Title level={3} style={{ lineHeight: '64px', color: 'black', margin: 0 }}>KPIS List</Title>
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
          <Col>
            <Search 
              placeholder="Search KPI" 
              enterButton 
              onSearch={handleSearch}
              style={{ width: '300px' }}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={() => setOpenCreateModal(true)}>Create KPI</Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {filteredResources.map((item) => (
            <Col key={item.id} span={24}>
              <Collapse>
                <Panel header={`${item.name}`} key={item.id}>
                  <Card>
                    <Table
                      bordered
                      columns={columns}
                      dataSource={[item]}
                      pagination={false}
                      rowKey="id"
                    />
                  </Card>
                </Panel>
              </Collapse>
            </Col>
          ))}
        </Row>
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

export default KPIList;
