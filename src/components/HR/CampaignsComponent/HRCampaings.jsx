import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Layout, Pagination, Input, Space, Image, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import * as Campaign from '../../../service/Campaign';
import moment from "moment";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const HRCampaigns = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [campaigns, setCampaigns] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchCampaignsData();
  }, []);

  const fetchCampaignsData = async () => {
    try {
      const res = await Campaign.fetchCampaigns();
      setCampaigns(res.events);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleDetails = (item) => {
    navigate(`/hrmanager/campaigns/${item.id}`, { state: { item } });
  };

  const handleAddNewCampaign = () => {
    navigate("/hrmanager/NewCampaigns");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (item) => {
    navigate(`/hrmanager/EditCampaign/${item.id}`, { state: { item } });
  };

  const handleDelete = async (id) => {
    try {
      await Campaign.deleteNewCampaign(id);
      message.success("Campaign deleted successfully");
      fetchCampaignsData();
    } catch (error) {
      message.error("Error deleting job: " + error.message);
      console.error("Error deleting job:", error);
    }
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
                  actions={[
                    <Button key="edit" onClick={() => handleEdit(campaign)}>Edit</Button>,
                    <Popconfirm
                      title="Are you sure to delete this job?"
                      onConfirm={() => handleDelete(campaign.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger">Delete</Button>
                    </Popconfirm>
                  ]}
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
                  <p><strong>Jobs:</strong> {campaign.jobs.map((job) => job.name).join(", ")}</p>
                  <p><strong>Duration:</strong> {campaign.duration} months</p>
                  <p><strong>Start Date:</strong>{moment(campaign.estimateStartDate).format('DD-MM-YYYY')}</p>
                  <p><strong>End Date:</strong>{moment(campaign.estimateEndDate).format('DD-MM-YYYY')}</p>
                  <Text
                    style={{ width: "fit-content", cursor: 'pointer', color: hovered === campaign.id ? 'blue' : 'black' }}
                    onClick={(e) => { e.stopPropagation(); handleDetails(campaign); }}
                    onMouseEnter={() => setHovered(campaign.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    View Details {'-->'}
                  </Text>
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
