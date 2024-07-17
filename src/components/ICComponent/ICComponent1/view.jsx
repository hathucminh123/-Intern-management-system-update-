import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Layout, Input, Collapse, Table, Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import * as Training from "../../../service/TrainingPrograms";
import "tailwindcss/tailwind.css";
import ButtonComponent from "../../ButtonComponent/ButtonComponent"

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;

const ViewCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [pageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'File',
      dataIndex: 'filePath',
      key: 'filePath',
      render: (filePath) => <a href={filePath} target="_blank" rel="noopener noreferrer">View File</a>,
    },
  ];

  const userRole =localStorage.getItem('role')
  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredCampaigns = campaigns.filter((train) =>
    train.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onchange = (page) => {
    setCurrentPage(page);
  };

  const fetchCampaigns = async () => {
    try {
      const res = await Training.fetchTraining();
      setCampaigns(res.events);
    } catch (error) {
      message.error("Error fetching campaigns: " + error.message);
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleJobs = (item) => {
    const userRole = localStorage.getItem('role').toLowerCase();
    navigate(`/${userRole}/TrainingPrograms/${item.id}`, {
      state: { item },
    });
  };

  const handleEdit = (campaign) => {
    navigate(`/internshipcoordinators/Details/${campaign.id}`, { state: { campaign } })
  }

  const handleDelete = async (campaign) => {
    try {
      await Training.DeleteNewTraining(campaign.id)
      message.success("Complete Delete Training")
      fetchCampaigns();
    } catch (error) {
      message.error(`Failed to delete Training Resource still in ${campaign.name}`)
    }
  }

  const handleAddResourceList = (item) => {
    navigate(`/internshipcoordinators/ResourceList/${item.id}`, { state: { item } })
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Training List
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            Training List
          </Title>

          <Search
            size="large"
            placeholder="Search campaigns"
            onSearch={onSearch}
            enterButton
            className="w-full mb-5"
            style={{ maxWidth: '500px', margin: '0 auto' }}
          />

          <Row gutter={[16, 16]}>
            {filteredCampaigns.map((campaign) => (
              // <Col key={campaign.id} xs={24} sm={12} md={8}>
                <Col key={campaign.id} span={24}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                  actions={ userRole ==="internshipcoordinators" && ([
                    <Button key="edit" onClick={() => handleEdit(campaign)}>Edit</Button>,
                    <Popconfirm
                      title="Are you sure to delete this campaign?"
                      onConfirm={() => handleDelete(campaign)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger">Delete</Button>
                    </Popconfirm>
                  ])}
                >
                  <Collapse>
                    <Panel
                      header={
                        <div className="flex flex-col">
                          <Title
                            level={5}
                            className="campaign-title"
                          >
                            Internship Program: {campaign.name}
                          </Title>
                          <Text>
                            <strong>Duration:</strong> {campaign.duration} months
                          </Text>
                          <Button
                            style={{ width: "fit-content", cursor: 'pointer', color: hovered === campaign.id ? 'blue' : 'black' }}
                            onClick={() => handleJobs(campaign)}
                            onMouseEnter={() => setHovered(campaign.id)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            View Details {'-->'}
                          </Button>
                        </div>
                      }
                      key={campaign.id}
                      style={{ borderRadius: '8px', backgroundColor: 'white' }}
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Title level={5}>Resources</Title>
                        </Col>
                       {userRole ==="internshipcoordinators" &&(
                        <Col span={12} style={{ textAlign: 'right' }}>
                        <ButtonComponent
                         styleButton={{ background: "#06701c", border: "none" }}
                         styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                         size="middle"
                         textbutton="Add Resource"
                         onClick={(e) => { e.stopPropagation(); handleAddResourceList(campaign); }}
                         />
                         </Col>
                       )} 
                       
                      </Row>
                      <Table
                        dataSource={campaign.resources}
                        columns={columns}
                        pagination={{ pageSize, current: currentPage, onChange: onchange }}
                        rowKey="id"
                      />
                    </Panel>
                  </Collapse>
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
