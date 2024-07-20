import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Table, Space, Dropdown, Menu, Button, message, Collapse, Input, Form, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import * as KPI from '../../../service/KPIService';
import * as Training from '../../../service/TrainingPrograms';
import * as User from '../../../service/User';

const { Header, Content } = Layout;

const KPIReportDetails = () => {
  const { state } = useLocation();
  const Details = state?.record;
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userRole = localStorage.getItem('role');
  console.log('user',Details)

  const fetchAllTraining = async () => {
    setLoading(true);
    try {
      const res = await Training.fetchTrainingUser();
      setTraining(res.events);
    } catch (error) {
      message.error('Error fetching Training: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTraining();
  }, []);

  const handleDeleteKPIS = async (id) => {
    setLoading(true);
    try {
      await KPI.deleteKPI(id);
      message.success('Delete complete');
      setTraining((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      message.error('Error deleting KPI: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const kpiMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailKPIModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleDeleteKPIS(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const kpiColumns = [
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
          <div><strong>Total</strong></div>
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
          <div><strong>{parseFloat(record.weight)}%</strong></div>
        </>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) => (
        <Form.Item
          name={['kpis', record.id, 'value']}
          rules={[{ required: true, message: 'Please enter the value' }]}
        >
          <Input defaultValue={record.value} />
        </Form.Item>
      ),
    },
  ];

  const handlePostTask = async (training) => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const updatedKpis = training.kpIs.map((kpi) => ({
        kpiId: kpi.id,
        value: values.kpis[kpi.id].value,
      }));

      const newReport = {
        userId: Details.id,
        programId: training.id,
        userResultDetails: updatedKpis,
      };

      await User.PostReportStudent(newReport);
      navigate('/mentor/UserListReport');
      message.success('KPI updated successfully!');
      fetchAllTraining();
    } catch (error) {
      message.error('Error updating KPI: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Student report name: <strong>{Details.userName}</strong>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]}>
            {training.map((training) => (
              <Col key={training.id} span={12}>
                <Collapse>
                  <Collapse.Panel
                    header={`Training program: ${training.name} | Duration: ${training.duration} months`}
                    key={training.id}
                  >
                    <Card style={{ overflowX: 'auto', maxWidth: '100%' }}>
                      <Form form={form} layout="vertical" initialValues={{ kpis: training.kpIs.reduce((acc, kpi) => ({ ...acc, [kpi.id]: { value: kpi.value } }), {}) }}>
                        <Table
                          bordered
                          pagination={false}
                          columns={kpiColumns}
                          dataSource={training.kpIs}
                          rowKey="id"
                          style={{ minWidth: '600px' }}
                        />
                        <Button type="primary" onClick={() => handlePostTask(training)}>
                          Grading
                        </Button>
                      </Form>
                    </Card>
                  </Collapse.Panel>
                </Collapse>
              </Col>
            ))}
          </Row>
        </Spin>
      </Content>
    </Layout>
  );
};

export default KPIReportDetails;
