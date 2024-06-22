import React, { useEffect, useState } from 'react';
import { Button, Card, List, Typography } from 'antd';
import { fetchCampaigns } from '../../../service/Campaign';
import { Campaign } from '../../../assets/data/data';

const { Title } = Typography;

const CategoryListComponent = ({ category }) => {
  const [campaigns, setCampaigns] = useState([]);
  console.log(campaigns);

  useEffect(() => {
    const fetchCampaignsData = async () => {
      // try {
      //   const res = await fetchCampaigns();
      //   setCampaigns(res.events);
      //   console.log("Campaigns data:", res.events); // Add this line
      // } catch (error) {
      //   console.error("Error fetching campaigns:", error);
      // }
setCampaigns(Campaign)
    };
    fetchCampaignsData();
  }, []);

  return (
    <div className="flex flex-col bg-neutral-1 shadow-level-1 p-6">
      <Title level={3} className="font-bold mb-4">Nhóm công việc</Title>
      <List
        dataSource={campaigns}
        renderItem={(campaign) => (
          <Card
            key={campaign.id}
            title={campaign.name}
            bordered={false}
            className="mb-4"
          >
            {campaign.jobs.map((position) => (
              <Button
                key={position.id}
                className="rounded-full me-2 mb-2"
                style={{ whiteSpace: "normal", display: 'flex' }}
              >
                {position.name}
              </Button>
            ))}
          </Card>
        )}
      />
    </div>
  );
};

export default CategoryListComponent;
