import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Layout, Pagination, Input, Space, Image } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import * as campaign from '../../../service/Campaign';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const HRCampaigns = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const res = await campaign.fetchCampaigns();
        setCampaigns(res.events);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaignsData();
  }, []);

  const handleJobs = (item) => {
    navigate(`/hrmanager/campaigns/${item.id}`, { state: { item } });
  };

  const handleAddNewCampaign = () => {
    navigate("/hrmanager/NewCampaigns");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentCampaigns = filteredCampaigns.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Campaign Listings
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            List Campaigns
          </Title>
          <Space direction="vertical" className="flex flex-row items-center mb-5">
            <Search
              size="large"
              placeholder="Search"
              onSearch={setSearchQuery}
              enterButton
              className="w-full"
            />
            <ButtonComponent
              styleButton={{ background: "#06701c", border: "none" }}
              styleTextButton={{ color: "#fff", fontWeight: "bold" }}
              size="middle"
              textbutton="Create New"
              onClick={handleAddNewCampaign}
            />
          </Space>
          <Row gutter={[16, 16]}>
            {currentCampaigns.map((campaign) => (
              <Col key={campaign.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                  onClick={() => handleJobs(campaign)}
                >
                  <Image
                    className="rounded-lg mb-3"
                    preview={false}
                    width="100%"
                    height={200}
                    src={campaign.imagePath}
                    alt={campaign.name}
                  />
                  <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {campaign.name}
                  </Title>
                  <p><strong>Duration:</strong> {campaign.duration} months</p>
                  <p><strong>Jobs:</strong> {campaign.jobs.map((job) => job.name).join(", ")}</p>
                  <div className="flex items-center mt-4">
                    <ClockCircleOutlined />
                    <span className="ml-3">Internship Duration:</span>
                    <span className="ml-3 font-bold">{campaign.duration} months</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            className="mt-6"
            current={currentPage}
            total={filteredCampaigns.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default HRCampaigns;
