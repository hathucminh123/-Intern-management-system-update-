import React from "react";
import { Table, Typography, Layout } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { Header, Content } = Layout;

const studentData = [
  { key: 1, name: "Alice Johnson", age: 20, class: "React Basics" },
  { key: 2, name: "Bob Smith", age: 22, class: "React Basics" },
  { key: 3, name: "Charlie Brown", age: 21, class: "Advanced JavaScript" },
  { key: 4, name: "David Wilson", age: 23, class: "CSS Mastery" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Class", dataIndex: "class", key: "class" },
];

const StudentList = () => {
  const { className } = useParams();

  return (
    <Layout>
      <Header style={{ backgroundColor: "white", color: "black", borderBottom: "1px solid #f0f0f0" }}>
        Student List
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "80vh" }}>
        <Title level={3}>Students in {className}</Title>
        <Table
          columns={columns}
          dataSource={studentData.filter(student => student.class === className)}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
      </Content>
    </Layout>
  );
};

export default StudentList;
