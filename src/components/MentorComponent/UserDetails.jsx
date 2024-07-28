import React from 'react'
import { Typography, Tabs, Layout, Image, Row, Col, Divider } from 'antd';
import { useLocation } from 'react-router-dom';
import '../../components/HR/CampaignsComponent/userDetails.css'
import image from '../../assets/minhwap.jpg'
const UserDetailss = () => {
    const { Title, Paragraph, Text } = Typography;
    const { TabPane } = Tabs;
    const { Header, Content } = Layout;
    const { state } = useLocation();
    const User = state?.item;
    console.log("sad",User)
  
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
                  {/* <Title level={2}>{User?.name}</Title> */}
                  <div className="info-item">
                    <Text strong>User Name:</Text>
                    <Paragraph className="info-value">{User?.name}</Paragraph>
                  </div>
                  <div className="info-item">
                    <Text strong>Role:</Text>
                    <Paragraph className="info-value">{User?.role}</Paragraph>
                  </div>
                  <Divider />
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="About" key="1">
                      <div className="tab-content">
                        <div className="info-item">
                          <Text strong>First Name:</Text>
                          <Paragraph className="info-value">Minh</Paragraph>
                        </div>
                        <div className="info-item">
                          <Text strong>Last Name:</Text>
                          <Paragraph className="info-value">Hà</Paragraph>
                        </div>
                        <div className="info-item">
                          <Text strong>Email:</Text>
                          <Paragraph className="info-value">{User?.email}</Paragraph>
                        </div>
                        <div className="info-item">
                          <Text strong>PhoneNumber:</Text>
                          <Paragraph className="info-value">{User?.phoneNumber}</Paragraph>
                        </div>
                        <div className="info-item">
                          <Text strong>Education</Text>
                          <Paragraph className="info-value">{User?.education}</Paragraph>
                        </div>
                        <div className="info-item">
                          <Text strong>Role:</Text>
                          <Paragraph className="info-value">{User?.role}</Paragraph>
                        </div>
                      </div>
                    </TabPane>
                    {/* <TabPane tab="More" key="2">
                      <div className="tab-content">
                      <div className="info-item">
                          <Text strong>Internship status:</Text>
                          <Paragraph className="info-value">On training</Paragraph>
                        </div>
                        <div className="info-item">
                          <Text strong>Position:</Text>
                          <Paragraph className="info-value">Reactjs</Paragraph>
                        </div>
                        <Divider>Skills</Divider>
                        <div className="info-item">
                          <Text strong>Javascript</Text>
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
                    </TabPane> */}
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  };


export default UserDetailss