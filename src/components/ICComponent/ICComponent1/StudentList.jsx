import React, { useState } from "react";
import { Table, Typography, Layout, Checkbox, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const { Title } = Typography;
const { Header, Content } = Layout;

const initialStudentData = [
  { key: "1", name: "Minh", email: "minh@fpt.edu.vn", class: "React Basics" },
  { key: "2", name: "Tâm", email: "tam@fpt.edu.vn", class: "React Basics" },
  { key: "3", name: "Trí", email: "tri@fpt.edu.vn", class: "React Basics" },
  { key: "4", name: "Hiệp", email: "hiep@fpt.edu.vn", class: "React Basics" },
];

const StudentList = () => {
  const { className } = useParams();
  const currentDate = new Date().toLocaleDateString();

  const [attendanceData, setAttendanceData] = useState(
    initialStudentData.map(student => ({
      ...student,
      attendance: {
        [currentDate]: false
      }
    }))
  );

  const handleCheckChange = (key, date) => {
    const updatedData = attendanceData.map(student => {
      if (student.key === key) {
        return {
          ...student,
          attendance: {
            ...student.attendance,
            [date]: !student.attendance[date]
          }
        };
      }
      return student;
    });
    setAttendanceData(updatedData);
  };

  const handleAttendanceSubmit = () => {
    const attendance = attendanceData.filter(student => student.class === className).map(({ name, attendance }) => ({
      name,
      attendance: attendance[currentDate]
    }));
    console.log("Attendance submitted:", attendance);
    // Implement submission logic here
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
    { title: "Class", dataIndex: "class", key: "class" },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      render: (attendance, record) => (
        <Checkbox
          checked={attendance[currentDate] || false}
          onChange={() => handleCheckChange(record.key, currentDate)}
        />
      )
    }
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: "#001529", color: "white", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Title level={4} style={{ lineHeight: '64px', color: 'white' }}>Student List - {currentDate}</Title>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Title level={3} style={{ marginBottom: '20px' }}>Students in {className}</Title>
        <Table
          columns={columns}
          dataSource={attendanceData.filter(student => student.class === className)}
          pagination={false}
          rowKey="key"
          style={{ marginTop: "20px" }}
        />
        <ButtonComponent
          size={40}
          styleButton={{
            background: '#ffb81c',
            height: '48px',
            width: '200px',
            border: 'none',
            borderRadius: '24px',
            margin: '20px 0',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          textbutton={'Take Attendance'}
          styleTextButton={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}
          onClick={handleAttendanceSubmit}
        />
        <div style={{ marginTop: '20px' }}>
          <Link to={`/mentor/ClassAttendance/${className}`}>
            <Button type="primary" style={{ marginRight: "10px" }}>View Class Attendance Records</Button>
          </Link>
          <Link to={`/mentor/StudentAttendance/${className}`}>
            <Button type="primary">View Student Attendance Records</Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
};

export default StudentList;
