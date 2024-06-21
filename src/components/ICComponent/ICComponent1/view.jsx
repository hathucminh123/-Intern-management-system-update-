import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message,Layout } from "antd";
import { useNavigate } from "react-router-dom";
import * as Training from "../../../service/TrainingPrograms";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;
const ViewCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await Training.fetchTraining();
        setCampaigns(res.events);
      } catch (error) {
        message.error("Error fetching campaigns: " + error.message);
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleJobs = (item) => {
    navigate(`/internshipcoordinators/TrainingPrograms/${item.id}`, {
      state: { item },
    });
  };

  return (
    <Layout >
    <Header style={{ color: 'white' }}>List training program   </Header>
  <Content style={{ padding: '10px', minHeight: '80vh' }}>
    <div className="container flex flex-col">
      <Title className="text-center mt-5" level={2}>
        Training List
      </Title>
      <Row gutter={[16, 16]} className="mt-5">
        {campaigns.map((campaign) => (
          <Col key={campaign.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={
                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {campaign.name}
                </div>
              }
              bordered={false}
              onClick={() => handleJobs(campaign)}
              className="hover:shadow-lg transition-shadow duration-300"
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Duration: {campaign.duration} months
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </Content>
</Layout>
  );  
};

export default ViewCampaigns;
