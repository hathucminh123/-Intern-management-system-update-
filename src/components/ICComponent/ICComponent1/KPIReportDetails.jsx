import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Table, Space, Button, message, Input, Form, Spin, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import * as KPI from '../../../service/KPIService';
import * as Training from '../../../service/TrainingPrograms';
import * as User from '../../../service/User';
import moment from 'moment';
import "../../InternComponent/table.css";

const { Header, Content } = Layout;
const { Text, Title } = Typography;

const KPIReportDetails = () => {
  const { state } = useLocation();
  const Details = state?.record;
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    fetchAllTraining();
  }, []);

  const fetchAllTraining = async () => {
    setLoading(true);
    try {
      const res = await Training.fetchTrainingUser(Details.id);
      setTraining(res.events);
    } catch (error) {
      message.error('Error fetching Training: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSelected = (programId) => {
    setSelectedProgram((prev) => (prev?.id === programId ? null : training.find((prog) => prog.id === programId)));
  };

  const kpiColumns = [
    {
      title: <span style={{ color: 'black' }}>Grade Category</span>,
      dataIndex: 'name',
      key: 'name',
      className: 'custom-header',
    },
    {
      title: <span style={{ color: 'black' }}>Grade Item</span>,
      className: 'custom-header',
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
      title: <span style={{ color: 'black' }}>Weight</span>,
      dataIndex: 'weight',
      className: 'custom-header',
      key: 'weight',
      render: (text, record) => (
        <>
          <div>{record.weight}%</div>
          <div><strong>{parseFloat(record.weight)}%</strong></div>
        </>
      ),
    },
    {
      title: <span style={{ color: 'black' }}>Value</span>,
      dataIndex: 'value',
      key: 'value',
      className: 'custom-header',
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

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Student report name: <strong>{Details.userName}</strong>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Spin spinning={loading}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', height: '100vh', background: '#f0f2f5', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
              <Title level={2}>Select a Training Program ...</Title>
              <div style={{ width: '100%', backgroundColor: '#6B90DA', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '20px' }}>
                Training program 
              </div>
              {training.map((train) => (
                <Row key={train.id}>
                  <Col span={24}>
                    <span
                      style={{
                        color: selectedProgram?.id === train.id ? 'orange' : '#0D6EFD',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSelected(train.id)}
                    >
                      Training Program: {train.name}
                    </span>
                    <strong style={{ marginLeft: '10px' }}>from {moment(train.startDate).format('YYYY/MM/DD')}</strong>
                    <strong style={{ marginLeft: '3px' }}>- {moment(train.endDate).format('YYYY/MM/DD')}</strong>
                  </Col>
                </Row>
              ))}
            </div>
            {selectedProgram && (
              <div style={{ width: '100%', marginLeft: '10px' }}>
                <Card style={{ overflowX: 'auto', maxWidth: '100%' }}>
                  <Form form={form} layout="vertical" initialValues={{ kpis: selectedProgram.kpIs.reduce((acc, kpi) => ({ ...acc, [kpi.id]: { value: kpi.value } }), {}) }}>
                    <Table
                      bordered
                      pagination={false}
                      columns={kpiColumns}
                      dataSource={selectedProgram.kpIs}
                      rowKey="id"
                      className="custom-table"
                      style={{ minWidth: '600px' }}
                    />
                    <Button type="primary" onClick={() => handlePostTask(selectedProgram)}>
                      Grading
                    </Button>
                  </Form>
                </Card>
              </div>
            )}
          </div>
        </Spin>
      </Content>
    </Layout>
  );
};

export default KPIReportDetails;
