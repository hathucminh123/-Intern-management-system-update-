import { Typography, Tabs, Layout, Image, Row, Col, Divider } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './userDetails.css';
import image from '../../../assets/minhwap.jpg';

const userRoles = {
  0: 'Intern',
  3: 'HR Manager',
  2: 'Internship Coordinators',
  1: 'Mentor',
  4:'Admin',
  5:'Guest'
};

const UserDetailsRole = () => {
  const { Title, Paragraph, Text } = Typography;
  const { TabPane } = Tabs;
  const { Header, Content } = Layout;
  const { state } = useLocation();
  const user = state?.item;

  const role = userRoles[user?.role] || 'Unknown Role';

  return (
    <Layout>
      <Header className="header">
        <Title level={3}>User Details</Title>
      </Header>
      <Content className="content">
        <div className="details-container">
          <Row gutter={20}>
            <Col span={8}>
              <Image
                width={250}
                preview={false}
                src={image}
                className="profile-image"
              />
            </Col>
            <Col span={16}>
              <div className="user-info">
                <div className="info-item">
                  <Text strong>User Name:</Text>
                  <Paragraph className="info-value">{user?.userName}</Paragraph>
                </div>
                <div className="info-item">
                  <Text strong>Role:</Text>
                  <Paragraph className="info-value">{role}</Paragraph>
                </div>
                <Divider />
                <Tabs defaultActiveKey="1">
                  <TabPane tab="About" key="1">
                    <div className="tab-content">
                      <div className="info-item">
                        <Text strong>First Name:</Text>
                        <Paragraph className="info-value">{user?.firstName}</Paragraph>
                      </div>
                      <div className="info-item">
                        <Text strong>Last Name:</Text>
                        <Paragraph className="info-value">{user?.lastName}</Paragraph>
                      </div>
                      <div className="info-item">
                        <Text strong>Email:</Text>
                        <Paragraph className="info-value">{user?.email}</Paragraph>
                      </div>
                      <div className="info-item">
                        <Text strong>Phone Number:</Text>
                        <Paragraph className="info-value">{user?.phoneNumber}</Paragraph>
                      </div>
                    </div>
                  </TabPane>
                  {/* Uncomment and add more tabs as needed
                  <TabPane tab="More" key="2">
                    <div className="tab-content">
                      <div className="info-item">
                        <Text strong>Internship Status:</Text>
                        <Paragraph className="info-value">On training</Paragraph>
                      </div>
                      <div className="info-item">
                        <Text strong>Position:</Text>
                        <Paragraph className="info-value">Reactjs</Paragraph>
                      </div>
                      <Divider>Skills</Divider>
                      <div className="info-item">
                        <Text strong>JavaScript</Text>
                      </div>
                      <div className="info-item">
                        <Text strong>HTML/CSS</Text>
                      </div>
                      <Divider>Educations</Divider>
                      <div className="info-item">
                        <Text strong>2020-present:</Text>
                        <Paragraph className="info-value">FPT University education</Paragraph>
                      </div>
                    </div>
                  </TabPane> 
                  */}
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default UserDetailsRole;
