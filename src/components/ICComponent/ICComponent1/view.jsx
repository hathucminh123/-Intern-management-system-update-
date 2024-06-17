import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import * as Training from '../../../service/TrainingPrograms';

const { Title } = Typography;

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
    navigate(`/internshipcoordinators/TrainingPrograms/${item.id}`, { state: { item } });
  };

  return (
    <div className="container flex flex-col">
      <Title className="text-center mt-5" level={2}>
        Training List 
      </Title>
      <Row gutter={[16, 16]} className="mt-5">
        {campaigns.map(campaign => (
          <Col key={campaign.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={campaign.name} bordered={false} onClick={() => handleJobs(campaign)}>
              <p>Duration: {campaign.duration}</p>
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: "24px" }}>
                {campaign.jobs.map((position, index) => (
                  <Button
                    key={index}
                    className="rounded-full me-2 mb-6"
                    style={{ whiteSpace: "normal" }}
                  >
                    {position.name}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewCampaigns;
