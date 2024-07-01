import React, { useEffect, useState } from "react";
import { Table, Typography, Layout, Select } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { Header, Content } = Layout;

const initialAttendanceData = [
  { key: "1", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "01/01/2024", attended: true },
  { key: "2", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "02/01/2024", attended: false },
  { key: "3", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "03/01/2024", attended: false },
  { key: "4", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "04/01/2024", attended: true },
  { key: "5", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "05/01/2024", attended: true },
];

const ClassAttendanceRecord = () => {
  const { className } = useParams();
  const [selectedName, setSelectedName] = useState('');
  const [user, setUser] = useState([]);

  const User = [
    { id: 1, name: 'Minh' },
    { id: 2, name: 'Tâm' },
    { id: 3, name: 'Trí' },
    { id: 4, name: 'Hiệp' },
  ];

  useEffect(() => {
    setUser(User);
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Attended",
      dataIndex: "attended",
      key: "attended",
      render: attended => (
        <span style={{
          backgroundColor: attended ? "green" : "red",
          color: "white",
          padding: "2px 8px",
          borderRadius: "4px"
        }}>
          {attended ? "Present" : "Absent"}
        </span>
      )
    }
  ];

  const handleAssignedToChange = (value) => {
    setSelectedName(value);
  };

  const filteredData = initialAttendanceData
    .filter(student => student.class === className)
    .filter(student => selectedName ? student.name === selectedName : false);

  return (
    <Layout>
      <Header style={{ backgroundColor: "white", color: "black", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Title level={4} style={{ lineHeight: '64px' }}>Attendance Records</Title>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Title level={3}>Attendance students for  class {className}</Title>
        <Select
          placeholder="Choose user"
          allowClear
          onChange={handleAssignedToChange}
          style={{ width: '100%' }}
        >
          {user.map(item => (
            <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
          ))}
        </Select>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          rowKey="key"
          style={{ marginTop: "20px" }}
        />
      </Content>
    </Layout>
  );
};

export default ClassAttendanceRecord;
