import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, message, Layout, Input, Pagination, Space, Image } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import * as Jobss from "../../../service/JobsService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const { Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleNewJobs = () => {
    navigate("/hrmanager/NewJobs");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Job Listings
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            List Jobs
          </Title>
          <Space direction="vertical" className="flex flex-row items-center mb-5">
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
              textbutton="Create New"
              onClick={handleNewJobs}
            />
          </Space>
          <Row gutter={[16, 16]}>
            {currentJobs.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                  onClick={() => handleDetails(item)}
                >
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
                  <p><strong>Total Members:</strong> {item.totalMember}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            className="mt-6"
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

export default Jobs;
