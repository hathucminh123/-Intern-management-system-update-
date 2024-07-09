import React from 'react';
import { Layout, Row, Col, Card, Input, Collapse, Table } from 'antd';
import { kpi } from '../../assets/data/kpi'; // Importing the data from kpi.js
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;

const TrainingList = () => {
    const calculateTotal = (gradeCategories) => {
        const totalWeights = gradeCategories.reduce((total, category) => {
            return total + category.gradeItem.reduce((catTotal, item) => {
                return catTotal + parseFloat(item.weight);
            }, 0);
        }, 0);

        if (totalWeights !== 100) {
            return null; // Weights do not add up to 100%, do not calculate the total
        }

        const total = gradeCategories.reduce((total, category) => {
            const categoryTotal = category.gradeItem.reduce((catTotal, item) => {
                const weight = parseFloat(item.weight) / 100;
                const value = parseFloat(item.value);
                return catTotal + weight * value;
            }, 0);
            return total + categoryTotal;
        }, 0);
        return total.toFixed(2);
    };

    const columns = [
        {
            title: 'Grade Category',
            dataIndex: 'CatagoryName',
            key: 'CatagoryName',
        },
        {
            title: 'Grade Item',
            dataIndex: 'gradeItem',
            key: 'gradeItem',
            render: (text, record) => (
                <>
                    {record.gradeItem.map(item => (
                        <div key={item.gradeItem}>{item.gradeItem}</div>
                    ))}
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
                    {record.gradeItem.map(item => (
                        <div key={item.gradeItem}>{item.weight}</div>
                    ))}
                    <div><strong>{record.gradeItem.reduce((total, item) => total + parseFloat(item.weight), 0)} %</strong></div>
                </>
            ),
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => {
                const averageValue = (record.gradeItem.reduce((total, item) => total + parseFloat(item.value), 0) / record.gradeItem.length).toFixed(2);
                return (
                    <>
                        {record.gradeItem.map(item => (
                            <div key={item.gradeItem}>{item.value}</div>
                        ))}
                        <div><strong>{averageValue}</strong></div>
                    </>
                );
            },
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
                                            bordered
                                            columns={columns}
                                            dataSource={training.GradeCatagory}
                                            pagination={false}
                                            rowKey="CatagoryName"
                                            summary={() => {
                                                const total = calculateTotal(training.GradeCatagory);
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
                                                                {total !== null ? <strong>{total}</strong> : <span style={{ color: 'red' }}>Weights do not add up to 100%</span>}
                                                            </Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                        {total !== null && (
                                                            <>
                                                                <Table.Summary.Row>
                                                                    <Table.Summary.Cell colSpan={3}><strong>STATUS</strong></Table.Summary.Cell>
                                                                    <Table.Summary.Cell>
                                                                        <span style={ratingStyle}>{rating}</span>
                                                                    </Table.Summary.Cell>
                                                                </Table.Summary.Row>
                                                            </>
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
            </Content>
        </Layout>
    );
};

export default TrainingList;