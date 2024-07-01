import React, { useState } from "react";
import { Table, Typography, Layout, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Title } = Typography;
const { Header, Content } = Layout;

// Updated data structure with separate date and attended fields
const initialAttendanceData = [
  { key: "1", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "01/06/2024", attended: true },
  { key: "2", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics", date: "02/01/2024", attended: false },
  { key: "3", name: "Tâm", email: "tam@fpt.edu.vn", class: "React Basics", date: "01/06/2024", attended: false },
  { key: "4", name: "Tâm", email: "tam@fpt.edu.vn", class: "React Basics", date: "02/06/2024", attended: true },
  { key: "5", name: "Trí", email: "tri@fpt.edu.vn", class: "React Basics", date: "01/06/2024", attended: true },
  { key: "6", name: "Trí", email: "tri@fpt.edu.vn", class: "React Basics", date: "02/06/2024", attended: true },
  { key: "7", name: "Hiệp", email: "hiep@fpt.edu.vn", class: "React Basics", date: "01/06/2024", attended: true },
  { key: "8", name: "Hiệp", email: "hiep@fpt.edu.vn", class: "React Basics", date: "02/06/2024", attended: true },
];

const StudentAttendanceRecord = () => {
  const { className } = useParams();
  const currentDate = moment(); 
  const [selectedDate, setSelectedDate] = useState(currentDate);

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

  // Filter data based on selected date and class name
  const filteredData = initialAttendanceData
    .filter(student => student.class === className)
    .filter(student => !selectedDate || student.date === selectedDate.format("DD/MM/YYYY"));

  return (
    <Layout>
      <Header style={{ backgroundColor: "white", color: "black", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Title level={4} style={{ lineHeight: '64px' }}>Attendance Records</Title>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Title level={3}>Attendance for class: {className}</Title>
        <DatePicker 
          onChange={(date) => setSelectedDate(date)} 
          format="DD/MM/YYYY"
          value={selectedDate}
          style={{ marginBottom: "20px" }}
        />
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

export default StudentAttendanceRecord;
