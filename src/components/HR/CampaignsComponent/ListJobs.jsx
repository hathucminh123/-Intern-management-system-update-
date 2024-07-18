import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, message, Layout, Input, Pagination, Space, Image, Button, Popconfirm, Checkbox } from "antd";
import moment from "moment";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as Jobss from "../../../service/JobsService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import * as Campaign from "../../../service/Campaign";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const ListJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState(null);
  const { state } = useLocation();
  const [selectedJobs, setSelectedJobs] = useState("");
  const CampaignDetail = state?.item;

  const onSearch = (value) => setSearchQuery(value);

  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const res = await Jobss.fetchJobs();
      setJobs(res.events);
    } catch (error) {
      message.error("Error fetching jobs: " + error.message);
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDetails = (item) => {
    navigate(`/hrmanager/Detail/${item.id}`, { state: { item } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (item) => {
    navigate(`/hrmanager/EditJob/${item.id}`, { state: { item } });
  };

  const handleDelete = async (id) => {
    try {
      await Jobss.deleteNewJobs(id);
      message.success("Job deleted successfully");
      fetchAllJobs();
    } catch (error) {
      message.error("Error deleting job: " + error.message);
      console.error("Error deleting job:", error);
    }
  };

  const onChange = (e, item) => {
    const { checked } = e.target;
    console.log('asdasd', checked)
    if (checked) {
      setSelectedJobs(item.id);
    } else {
      setSelectedJobs(null);
    }
  };

  const handleAddNewJobs = async () => {
    try {
      const addDataJob = {
        campaginId: CampaignDetail.id,
        jobId: selectedJobs,
      };
      await Campaign.addJobsNewCampaign(addDataJob);
      message.success("Jobs added successfully");
      navigate("/hrmanager/campaigns");
    } catch (error) {
      message.error("Error  jobs is exsit in campaign: " + CampaignDetail.name);
    }
  };

  const currentJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const ratingStyle = {
    color: '#Ff0000',
    fontWeight: 'bold',
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Job Listings</Title>
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            List Jobs
          </Title>
          <Space direction="vertical" className="w-full mb-5">
            <Search
              size="large"
              placeholder="Search"
              onSearch={onSearch}
              enterButton
              className="w-full"
            />
            <ButtonComponent
              styleButton={{ background: "#06701c", border: "none" }}
              styleTextButton={{ color: "#fff", fontWeight: "bold" }}
              size="middle"
              textbutton={`Add jobs to "${CampaignDetail.name}" Campaign`}
              onClick={handleAddNewJobs}
            // disabled={selectedJobs.length === 2}
            />
          </Space>
          <Row gutter={[16, 16]}>
            {currentJobs.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                  actions={[
                    <Button key="edit" onClick={() => handleEdit(item)}>Edit</Button>,
                    <Popconfirm
                      title="Are you sure to delete this job?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button >
                        <span style={ratingStyle}>Delete</span>
                      </Button>
                    </Popconfirm>
                  ]}
                >
                  <Checkbox onChange={(e) => onChange(e, item)} style={{ marginBottom: '10px' }}>
                    Select
                  </Checkbox>
                  <Image
                    className="rounded-lg mb-3"
                    preview={false}
                    width="100%"
                    height={200}
                    src={item.imagePath}
                    alt={item.name}
                  />
                  <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Developer {item.name}
                  </Title>
                  <p><strong>Duration:</strong> {item.duration} months</p>
                  <p><strong>Start Date:</strong> {moment(item.startDate).format('DD-MM-YYYY')}</p>
                  <Text
                    style={{ width: "fit-content", cursor: 'pointer', color: hovered === item.id ? 'blue' : 'black' }}
                    onClick={(e) => { e.stopPropagation(); handleDetails(item); }}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    View Details {'-->'}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            className="mt-6 text-center"
            current={currentPage}
            total={filteredJobs.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ListJobs;
