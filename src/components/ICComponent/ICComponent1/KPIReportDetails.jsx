import React, { useState,useEffect } from 'react';
import { Layout, Row, Col, Card, Input, Collapse, Table ,Space,Dropdown,Menu,Button} from 'antd';

const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;
import * as KPI from "../../../service/KPIService";
import { useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import DetailKPIModal from './DetailKPIModal';
const KPIReportDetails = () => {

    const {state}=useLocation();
    const Details = state?.record
    const [resource, setResource] = useState([]);
    console.log('dassad',Details)
    const [selectedKPI, setSelectedKPI] = useState(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const userRole =localStorage.getItem('role')

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

      const handleUpdateTask = (updatedTask) => {
        setResource((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
      };
    
      const handleOpenDetailKPIModal = (kpi) => {
        setSelectedKPI(kpi);
        setOpenDetailModal(true);
      };
      const handleDeleteKPIS = async (id) => {
        try {
          await KPI.deleteKPI(id);
          message.success("Delete complete");
          setResource((prev) => prev.filter(item => item.id !== id));
        } catch (error) {
          message.error("Error deleting KPI " + error.message);
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
      if (userRole === "internshipcoordinators" || userRole ==="mentor") {
    kpiColumns.push({
          title: 'Actions',
          key: 'actions',
          render: (text, record) => (
            <Space size="middle">
              <Dropdown overlay={kpiMenu(record)}>
                <Button>
                  More <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          ),
        });
      }
    
    return (
        <Layout>
            <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
               Student report  name:  <strong> {Details.name}</strong>
            </Header>
            <Content style={{ padding: '20px' }}>
                {/* <Search  placeholder="Search campaigns" enterButton style={{ marginBottom: '20px' }} /> */}
                <Table
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
                      />
                       {selectedKPI && (
        <DetailKPIModal
          isVisible={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          task={selectedKPI}
          onUpdateTask={handleUpdateTask}
        />
      )}
            </Content>
        </Layout>
    );
};

export default KPIReportDetails;