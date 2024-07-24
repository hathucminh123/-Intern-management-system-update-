import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Layout, Input, Collapse, Table, Button, Checkbox, Spin } from "antd";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as Training from "../../../service/TrainingPrograms";
import * as AddTraining from "../../../service/JobsService";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;

const ListTraining = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Define pageSize here
  const [selectTraining, setSelectTraining] = useState(null);
  const Trainingprogram = state?.item;

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

  const onSearch = (value) => setSearchQuery(value);

  const filteredCampaigns = campaigns.filter((train) =>
    train.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const res = await Training.fetchTraining();
        setCampaigns(res.events);
      } catch (error) {
        message.error("Error fetching campaigns: " + error.message);
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const onchangeCheck = (e, campaign) => {
    if (e.target.checked) {
      setSelectTraining(campaign.id);
    } else {
      setSelectTraining(null);
    }
  };

  const userRole = localStorage.getItem('role');

  const handleAddTraining = async () => {
    setLoading(true);
    try {
      const newTraining = {
        jobId: Trainingprogram.id,
        trainingProgramId: selectTraining,
      };
      await AddTraining.createTrainingNewJobs(newTraining);
      message.success("Training program added successfully");
      navigate(`/${userRole}/TrainingJobs`);
    } catch (error) {
      message.error(`Training program already exists in ${Trainingprogram.name} Job`);
      console.error("Error adding training program:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobs = (item) => {
    const userRole = localStorage.getItem('role').toLowerCase();
    navigate(`/${userRole}/TrainingPrograms/${item.id}`, {
      state: { item },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>Training List</Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            Training List
          </Title>

          <div className="flex justify-between items-center mb-5" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Button type="primary" size="large" onClick={handleAddTraining} disabled={!selectTraining}>
              Add Training Program
            </Button>
            <Search
              size="large"
              placeholder="Search campaigns"
              onSearch={onSearch}
              enterButton
              className="w-full"
              style={{ maxWidth: '500px', margin: '0 auto' }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {filteredCampaigns.map((campaign) => (
                <Col key={campaign.id} xs={24} sm={12} md={8}>
                  <Checkbox onChange={(e) => onchangeCheck(e, campaign)} checked={selectTraining === campaign.id}>Select</Checkbox>
                  <Card
                    hoverable
                      className="job-card shadow-lg"
                    style={{ borderRadius: '8px', backgroundColor: 'white', marginTop: '10px' }}
                  >
                    <Collapse>
                      <Panel
                        header={
                          <div className="flex flex-col">
                            <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              Internship Program: {campaign.name}
                            </Title>
                            <Text>
                              <strong>Duration:</strong> {campaign.duration} months
                            </Text>
                            <Text
                              style={{ width: "fit-content", cursor: 'pointer', color: hovered === campaign.id ? 'blue' : 'black' }}
                              onClick={() => handleJobs(campaign)}
                              onMouseEnter={() => setHovered(campaign.id)}
                              onMouseLeave={() => setHovered(null)}
                            >
                              View Details {'-->'}
                            </Text>
                          </div>
                        }
                        key={campaign.id}
                        style={{ borderRadius: '8px', backgroundColor: 'white' }}
                      >
                        <Title level={5}>Resources</Title>
                        <Table
                          dataSource={campaign.resources}
                          columns={columns}
                          pagination={{ pageSize: pageSize, current: currentPage, onChange: handlePageChange }}
                        />
                      </Panel>
                    </Collapse>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ListTraining;
