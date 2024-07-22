import React, { useState,useEffect } from 'react';
import { Layout, Row, Col, Card, Input, Collapse, Table, message } from 'antd';
import { kpi } from '../../assets/data/kpi'; // Importing the data from kpi.js
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;
import * as KPI from "../../service/KPIService";
import * as Training from "../../service/TrainingPrograms"
const TrainingList = () => {
    const [resource, setResource] = useState([]);
    const [training,setTraining]=useState([])


    const fetchTraining = async ()=>{
      try{
        const res = await Training.fetchTraining();
        setTraining(res.events)

      }catch(error){
        message.error("Error fetch Training ")

      }
    }

    useEffect(() => {
      fetchTraining();
     }, []);

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
      const calculateTotal = (items) => {
        const totalWeights = items.reduce((total, item) => {
          return total + parseFloat(item.type);
        }, 0);
    
        if (totalWeights !== 100) {
          return null;
        }
    
        return items.reduce((sum, item) => {
          const weight = parseFloat(item.type) / 100;
          const value = parseFloat(item.value);
          return sum + (weight * value);
        }, 0).toFixed(2);
      };

    const kpiColumns = [
        {
          title: 'Grade Category',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Grade Item',
          dataIndex: 'descition',
          key: 'description',
          render: (text, record) => (
            <>
              <div>{record.descition}</div>
              <div><strong>Total</strong></div> 
            </>
          ),
        },
        {
          title: 'Weight',
          dataIndex: 'type',
          key: 'type',
          render: (text, record) => (
            <>
            {console.log("concac1",record)}
            
              <div>{record.type}</div>
              <div><strong> {parseFloat(record.type)}%</strong></div>
            </>
          ),
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
          render: (text, record) => (
            <>
              <div>{record.value}</div>
            </>
          ),
        },
       
      
      ];
    
    return (
        <Layout>
            <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
               Student report  name:  <strong> Minh</strong>
            </Header>
            <Content style={{ padding: '20px' }}>
                {/* <Search  placeholder="Search campaigns" enterButton style={{ marginBottom: '20px' }} /> */}

                <Row gutter={[16,16]}>
                {training.map((training)=>(
            <Col key={training.id} span={12}>
              <Collapse
               >
              <Panel
               header={`Training program: ${training.name} | Duration: ${training.duration} months`}
               key={training.id}
              >
                <Card>
                <Table
          bordered
          pagination={false}
          columns={kpiColumns}
          dataSource={training.kpIs}
          rowKey="id"

           summary={() => {
          const total = calculateTotal(training.kpIs || []);
          const rating = total >= 5 ? 'Passed' : 'Failed';
          const ratingStyle = {
            backgroundColor: rating === 'Passed' ? '#d4edda' : '#f8d7da',
            color: rating === 'Passed' ? '#155724' : '#721c24',
            fontWeight: 'bold',
          };
        return (
            <>
                <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3}><strong>COURSE TOTAL</strong></Table.Summary.Cell>
                    <Table.Summary.Cell>
                        <strong >{total !== null ? total : <span style={{color:'red'}}>'Weights do not add up to 100%' </span> }</strong>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
                {total !== null && (
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={3}><strong>STATUS</strong></Table.Summary.Cell>
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

              </Panel>
              
              
              </Collapse>
         
         
                 </Col>


        ))} 

                           
            

                </Row>
                {/* <Table
                    bordered
                    pagination={false}
                      columns={kpiColumns}
                      dataSource={resource}
                      rowKey="id"
                      // pagination={{ pageSize: pageSize, current: currentPage, onChange: setCurrentPage }}
                      summary={() => {
                        const total = calculateTotal(resource || []);
                        const rating = total >= 5 ? 'Passed' : 'Failed';
                        const ratingStyle = {
                            backgroundColor: rating === 'Passed' ? '#d4edda' : '#f8d7da',
                            color: rating === 'Passed' ? '#155724' : '#721c24',
                            fontWeight: 'bold',
                        };
                        return (
                            <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={3}><strong>COURSE TOTAL</strong></Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <strong >{total !== null ? total : <span style={{color:'red'}}>'Weights do not add up to 100%' </span> }</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                {total !== null && (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={3}><strong>STATUS</strong></Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            <span style={ratingStyle}>{rating}</span>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            </>
                        );
                      }}
                      /> */}
            </Content>
        </Layout>
    );
};

export default TrainingList;