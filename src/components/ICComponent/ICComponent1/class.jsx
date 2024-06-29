import React, { useState } from "react";
import { Card, Col, Row, Typography, Layout, Tag, Image } from "antd";
import "tailwindcss/tailwind.css";

  import { useNavigate } from "react-router-dom";
const { Title, Paragraph, Text } = Typography;
const { Header, Content } = Layout;

const classData = [
  {
    id: 1,
    name: "React Basics",
    duration: "3 months",
    description: "Learn the fundamentals of React, including components, state, and props.",
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    duration: "2 months",
    description: "Dive deeper into JavaScript concepts like closures, async/await, and ES6 features.",
  },
  {
    id: 3,
    name: "CSS Mastery",
    duration: "1 month",
    description: "Master the art of CSS, including Flexbox, Grid, and responsive design techniques.",
  },
];

const ClassList = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleCardClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const navigate =useNavigate();

  const handleTableClick = (className) => {
    navigate(`/internshipcoordinators/students/${className}`);
    console.log("wtf",className)
  };
  console

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Class List
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            {classData.map((classItem) => (
              <Col key={classItem.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white', width: '100%' }}
                  onClick={() => handleCardClick(classItem.id)}
                >
                  <Title level={5}>{classItem.name}</Title>
                  <Text strong>Duration: </Text>
                  <Tag color="blue">{classItem.duration}</Tag>
                  <Paragraph className="mt-2">{classItem.description}</Paragraph>
                  {expandedId === classItem.id && (
                    <div className="mt-4">
                      <Title level={5}>Danh sách lớp</Title>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                          <Card
                            hoverable
                            className="shadow-lg"
                            style={{ borderRadius: '8px', backgroundColor: 'white', width: '100%' }}
                            onClick={() => handleTableClick(classItem.name)}
                          >
                            <Image
                              className="rounded-lg mb-3"
                              preview={false}
                              width="100%"
                              height={150}
                              src="https://via.placeholder.com/300"
                              alt="Class Image"
                            />
                            <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              Class Name
                            </Title>
                            <p><strong>Duration:</strong> 2 months</p>
                            <p><strong>Start Date:</strong> 01-01-2022</p>
                            <p><strong>Total Members:</strong> 30</p>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ClassList;
