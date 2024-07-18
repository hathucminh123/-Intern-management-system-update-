import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, message, Layout, Input, Pagination, Space, Image, Button, Popconfirm } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import * as Jobss from "../../../service/JobsService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState(null);
  const [selectJob, setSelectJob] = useState(null);

  const onSearch = (value) => setSearchQuery(value);

  const ratingStyle = {
    color: '#Ff0000',
    fontWeight: 'bold',
  };

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

  const userRole = localStorage.getItem('role').toLowerCase();

  const handleDetails = (item) => {
    navigate(`/${userRole}/Detail/${item.id}`, { state: { item } });
  };

  const handleTrainingDetails = (item) => {
    navigate(`/${userRole}/TrainingProgramsofjob/${item.id}`, {
      state: { item },
    });
  };

  const handleNewJobs = () => {
    navigate("/hrmanager/NewJobs");
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

  const handleDeleteTraining = async (jobId, trainingProgramId) => {
    try {
      const dataDeleteTraining = {
        jobId: jobId,
        trainingProgramId: trainingProgramId,
      };

      await Jobss.deleteTrainingNewJobs(dataDeleteTraining);
      message.success("Training program deleted successfully");
      fetchAllJobs();
    } catch (error) {
      message.error("Error deleting training program: " + error.message);
      console.error("Error deleting training program:", error);
    }
  };

  const handleSelect = (jobId, e) => {
    e.stopPropagation();
    setSelectJob(selectJob === jobId ? null : jobId);
  };

  const handleAddTrainingProgram = (item) => {
    navigate(`/${userRole}/ListTraining/${item.id}`, { state: { item } });
  };

  const currentJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Layout>
      {userRole === "internshipcoordinators" && (
        <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
          Job Class List
        </Header>)

      }
      {userRole === "hrmanager" && (
        <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
          Job  List
        </Header>)

      }
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          {userRole === "internshipcoordinators" && (
            <Title className="text-center mb-5" level={2}>
              List class jobs Training
            </Title>
          )}
          {userRole === "hrmanager" && (
            <Title className="text-center mb-5" level={2}>
              List Jobs
            </Title>
          )}
          <Space direction="vertical" className="flex flex-row items-center mb-5">
            <Search
              size="large"
              placeholder="Search"
              onSearch={onSearch}
              enterButton
              className="w-full"
            />

            {userRole === "hrmanager" && (
              <ButtonComponent
                styleButton={{ background: "#06701c", border: "none" }}
                styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                size="middle"
                textbutton="Create New Job"
                onClick={handleNewJobs}
              />
            )}

          </Space>
          <Row gutter={[16, 16]}>
            {currentJobs.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                  onClick={(e) => handleSelect(item.id, e)}
                  actions={userRole === "hrmanager" ? [
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
                  ] : []}
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
                  <Button
                    style={{ width: "fit-content", cursor: 'pointer', color: hovered === item.id ? 'blue' : 'black' }}
                    onClick={(e) => { e.stopPropagation(); handleDetails(item); }}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    View Details {'-->'}
                  </Button>
                  {userRole === "internshipcoordinators" && selectJob === item.id && (
                    <div className="mt-4">
                      <Space size={100}>
                        <Title level={5}>Danh sách Training Program</Title>
                        <ButtonComponent
                          styleButton={{ background: "#06701c", border: "none" }}
                          styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                          size="middle"
                          textbutton="Add training program"
                          onClick={(e) => { e.stopPropagation(); handleAddTrainingProgram(item); }}
                        />
                      </Space>
                      {item.trainingPrograms && item.trainingPrograms.map((trainingProgram) => (
                        <Space direction="vertical" style={{ width: '100%' }} key={trainingProgram.id}>
                          <Card
                            hoverable
                            className="shadow-lg"
                            style={{ borderRadius: '8px', backgroundColor: 'white', width: '100%' }}
                            actions={[
                              <Button
                                onClick={(e) => { e.stopPropagation(); handleDeleteTraining(item.id, trainingProgram.id); }}
                                style={{ width: 'fit-content' }}
                                type="danger"
                              >
                                Delete
                              </Button>
                            ]}
                          >
                            <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              Training Program: {trainingProgram.name}
                            </Title>
                            <Space direction="vertical">
                              <Text>
                                <strong>Duration:</strong> {trainingProgram.duration} months
                              </Text>
                              <Button
                                style={{ width: "fit-content", cursor: 'pointer', color: hovered === trainingProgram.id ? 'blue' : 'black' }}
                                onClick={(e) => { e.stopPropagation(); handleTrainingDetails(trainingProgram); }}
                                onMouseEnter={() => setHovered(trainingProgram.id)}
                                onMouseLeave={() => setHovered(null)}
                              >
                                View Details {'-->'}
                              </Button>
                            </Space>
                          </Card>
                        </Space>
                      ))}
                    </div>
                  )}
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
