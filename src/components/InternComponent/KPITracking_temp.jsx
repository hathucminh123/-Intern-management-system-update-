import React from 'react';
import { Layout, Row, Col, Card, Button, Input, Collapse, Table } from 'antd';
import { kpi } from '../../assets/data/kpi'; // Importing the data from kpi.js
import { isFunction } from 'lodash';
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;
const TrainingList = () => {
    const calculateTotal = (points) => {
        return points.reduce((total, point) => {
            const weight = parseFloat(point.weight) / 100;
            const value = parseFloat(point.value);
            return total + weight * value;
        }, 0).toFixed(2);
    };

    const columns = [
        {
            title: 'Grade Item',
            dataIndex: 'gradeItem',
            key: 'gradeItem',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    return (
        <Layout>
            <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
                Training List
            </Header>
            <Content style={{ padding: '20px' }}>
                <Search placeholder="Search campaigns" enterButton style={{ marginBottom: '20px' }} />
                <Row gutter={[16, 16]}>
                    {kpi.map(training => (
                        <Col key={training.TrainingProgramID} span={12}>
                            <Collapse>
                                <Panel
                                    header={`${training.TrainingProgramName} (${training.startDate} to ${training.endDate})`}
                                    key={training.TrainingProgramID}
                                >
                                    <Card>
                                        <Table
                                            columns={columns}
                                            dataSource={training.point}
                                            pagination={false}
                                            rowKey="gradeItem"
                                            summary={() => {
                                                const total = calculateTotal(training.point);
                                                const rating = total >= 5 ? 'Passed' : 'Failed';
                                                const ratingStyle = {
                                                    backgroundColor: rating === 'Passed' ? '#d4edda' : '#f8d7da',
                                                    color: rating === 'Passed' ? '#155724' : '#721c24',
                                                    fontWeight: 'bold',
                                                };
                                                return (
                                                    <>
                                                        <Table.Summary.Row>
                                                            <Table.Summary.Cell colSpan={2}><strong>Total</strong></Table.Summary.Cell>
                                                            <Table.Summary.Cell>{total}</Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                        <Table.Summary.Row>
                                                            <Table.Summary.Cell colSpan={2}><strong>Rating</strong></Table.Summary.Cell>
                                                            <Table.Summary.Cell>
                                                                <text style={ratingStyle}>{rating}</text>
                                                            </Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                    </>
                                                );
                                            }}
                                            bordered
                                        />
                                    </Card>
                                </Panel>
                            </Collapse>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout >
    );
};

export default TrainingList;
