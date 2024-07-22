import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Table, message, Typography, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import * as User from '../../service/User';
import * as Training from '../../service/TrainingPrograms';
import * as UserProfile from '../../service/authService';
import styled from 'styled-components';
import moment from 'moment';
import './table.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const StyledText = styled.span`
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: orange;
  }
  &:active {
    color: darkorange;
  }
`;

const StyledTableHeader = styled.th`
  background-color: #0D6EFD !important;
  color: white !important;
`;

const InternReport = () => {
  const { state } = useLocation();
  const user = state?.record;
  const [training, setTraining] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [hoveredProgram, setHoveredProgram] = useState(null);
  const [activeProgram, setActiveProgram] = useState(null);


 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await UserProfile.fetchUserProfile(localStorage.getItem('userId').toLowerCase());
        setUserProfile(res.events);
      } catch (error) {
        message.error('Fetch User Profile failed');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchAllTraining = async () => {
      try {
        const res = await Training.fetchTrainingUser(localStorage.getItem('userId').toLowerCase());
        setTraining(res.events);
      } catch (error) {
        message.error('Error fetching Training: ' + error.message);
      }
    };

    fetchAllTraining();
  }, []);

  useEffect(() => {
    const fetchReportData = async (programId) => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        if (userId && programId) {
          const response = await User.fetchUserListReport(userId, programId);
          if (response && response.events && response.events.userResultDetails) {
            const formattedData = response.events.userResultDetails.map(detail => ({
              name: response.events.name,
              name: detail.name,
              total: response.events.total,
              weight: detail.weight,
              value: detail.value,
            }));
            setReportData(prevData => ({
              ...prevData,
              [programId]: formattedData,
            }));
          } else {
            // message.error('Unexpected response format');
          }
        }
      } catch (error) {
        message.error('Error fetching report data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProgram) {
      fetchReportData(selectedProgram);
    }
  }, [selectedProgram]);

  const kpiColumns = [
    {
      title: <span style={{ color: 'black' }}>Grade Category</span>,
      dataIndex: 'name',
      key: 'name',
      className: 'custom-header',
    },
    {
      title: <span style={{ color: 'black' }}>Weight</span>,
      dataIndex: 'weight',
      key: 'weight',
      className: 'custom-header',
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
        <div>{record.value}</div>
      ),
    },
  ];

  const handleSelected = (programId) => {
    setSelectedProgram(selectedProgram === programId ? null : programId);
    setActiveProgram(programId);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ color: 'black' }}>User Report for: <strong>{userProfile?.userName}</strong></Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', height: '100vh', background: '#f0f2f5', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '5000px', padding: '40px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', flex: '1' }}>
            <Space direction="vertical">
              <Title level={2}>Select a Training Program ...</Title>
              <div style={{ width: '100%', backgroundColor: '#6B90DA', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '20px' }}>
                Training program
              </div>
             
                {training.map((train) => (
                   <Row key={train.id}>
                  <Col span={24}>
                    <span
                      style={{
                        color: selectedProgram === train.id ? 'orange' : hoveredProgram === train.id ? 'orange' : '#0D6EFD',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setHoveredProgram(train.id)}
                      onMouseLeave={() => setHoveredProgram(null)}
                      onMouseDown={() => setActiveProgram(train.id)}
                      onMouseUp={() => setActiveProgram(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelected(train.id);
                      }}
                    >
                      Training Program: {train.name}
                    </span>
                    <strong style={{ marginLeft: '10px' }}>from {moment(train.startDate).format('YYYY/MM/DD')}</strong>
                    <strong style={{ marginLeft: '3px' }}>- {moment(train.endDate).format('YYYY/MM/DD')}</strong>
                  </Col>
                  </Row>
                ))}
             
            </Space>
            <div style={{ width: '100%', marginLeft: '10px' }}>
              {selectedProgram && (
                reportData[selectedProgram] && reportData[selectedProgram].length > 0 ? (
                  <Table
                    bordered
                    pagination={false}
                    columns={kpiColumns}
                    dataSource={reportData[selectedProgram] || []}
                    rowKey="id"
                    loading={loading}
                    style={{ minWidth: '600px' }}
                    className="custom-table"
                    summary={() => {
                      const data = reportData[selectedProgram] || [];
                      const total = data.length > 0 ? data[0].total : null;
                      const roundedTotal = total !== null ? parseFloat(total).toFixed(2) : null;
                      const rating = total > 5 ? 'Passed' : 'Not Passed';
                      const ratingStyle = {
                        backgroundColor: rating === 'Passed' ? '#d4edda' : '#f8d7da',
                        color: rating === 'Passed' ? '#155724' : '#721c24',
                        fontWeight: 'bold',
                      };
                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={1}><strong>COURSE TOTAL</strong></Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1}><strong>AVERAGE</strong></Table.Summary.Cell>
                            <Table.Summary.Cell>
                              <strong>{roundedTotal !== null ? roundedTotal : <span style={{ color: 'red' }}>Weights do not add up to 100%</span>}</strong>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          {roundedTotal !== null && (
                            <Table.Summary.Row>
                              <Table.Summary.Cell colSpan={2}><strong>STATUS</strong></Table.Summary.Cell>
                              <Table.Summary.Cell>
                                <span style={ratingStyle}>{rating}</span>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                          )}
                        </>
                      );
                    }}
                  />
                ) : (
                  !loading && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <p>No grading data available. User has not been graded yet.</p>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default InternReport;
