import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Table, message, Collapse } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import * as User from '../../service/User';
import * as Training from '../../service/TrainingPrograms';
import { data } from 'autoprefixer';
import * as UserProfile from '../../service/authService'
const { Header, Content } = Layout;

const InternReport = () => {
  const { state } = useLocation();
  const user = state?.record;
 
  const [training, setTraining] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userProfile,setUserProfile]=useState({})


  const fetchUserProfile =async()=>{
    try{
       const res=await UserProfile.fetchUserProfile(localStorage.getItem('userId').toLowerCase());
       setUserProfile(res.events)
    }catch(error){
      message.error('fectch User Profile failed')
    }
  
   }
  
  
   useEffect(()=>{
      fetchUserProfile()
  
  
   },[])

  const userId=localStorage.getItem('userId')
  const fetchAllTraining = async () => {
    try {
      const res = await Training.fetchTraining();
      setTraining(res.events);
    } catch (error) {
      message.error('Error fetching Training: ' + error.message);
    }
  };

  const fetchReportData = async (programId) => {
    setLoading(true);
    try {
      if (userId && programId) {
        const response = await User.fetchUserListReport(userId, programId);
        if (response && response.events && response.events.userResultDetails) {
          const formattedData = response.events.userResultDetails.map(detail => ({
            name: response.events.name,
            name:detail.name,
            total: response.events.total,
            weight: detail.weight,
            value: detail.value,
          }));
          setReportData(prevData => ({
            ...prevData,
            [programId]: formattedData,
          }));
        } else {
          message.error('Unexpected response format');
        }
      }
    } catch (error) {
      message.error('Error fetching report data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTraining();
  }, []);

  useEffect(() => {
    selectedPrograms.forEach(programId => {
      fetchReportData(programId);
    });
  }, [userId, selectedPrograms]);

  const kpiColumns = [
    {
      title: 'Grade Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: (text, record) => (
        <>
          <div>{record.weight}</div>
          <div><strong>{parseFloat(record.weight)}%</strong></div>
        </>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) => (
        <div>{record.value}</div>
      ),
    },
  ];

  const handleSelected = (programId) => {
    setSelectedPrograms(prevSelected => {
      if (prevSelected.includes(programId)) {
        return prevSelected.filter(id => id !== programId);
      } else {
        return [...prevSelected, programId];
      }
    });
  };
console.log('asdasd',reportData)
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        User Report: <strong>{userProfile?.userName}</strong>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {training.map((training) => (
            <Col key={training.id} span={12}>
              <Collapse>
                <Collapse.Panel
                  header={`${training.name} (${training.duration} months)`}
                  key={training.id}
                  onClick={() => handleSelected(training.id)}
                >
                  <Card style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <Table
                      bordered
                      pagination={false}
                      columns={kpiColumns}
                      dataSource={reportData[training.id] || []}
                      rowKey="id"
                      loading={loading}
                      style={{ minWidth: '600px' }}
                      summary={() => {
                        const data = reportData[training.id] || [];
                        const total = data.length > 0 ? data[0].total : null;
                        const rating = total > 5 ? 'Passed' : 'Not Passed';
                        const ratingStyle = {
                          backgroundColor: rating === 'Passed' ? '#d4edda' : '#f8d7da',
                          color: rating === 'Passed' ? '#155724' : '#721c24',
                          fontWeight: 'bold',
                        };
                        return (
                          <>
                            <Table.Summary.Row>
                              <Table.Summary.Cell colSpan={2}><strong>COURSE TOTAL</strong></Table.Summary.Cell>
                              <Table.Summary.Cell>
                                <strong>{total !== null ? total : <span style={{ color: 'red' }}>Weights do not add up to 100%</span>}</strong>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                            {total !== null && (
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
                  </Card>
                </Collapse.Panel>
              </Collapse>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default InternReport;
