import React, { useEffect, useState } from "react";
import { Typography, Button, Image, Tag, Tabs, Row, Col, Card, Popconfirm, message, Spin } from "antd";
import "tailwindcss/tailwind.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import * as Campaign from "../../../service/Campaign";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const HRCampaignsDetailss = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const CampaignDetail = state?.item;
  const [showJobs, setShowJobs] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [hoveredd, setHoveredd] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userRole = localStorage.getItem('role');

  const ratingStyle = {
    color: '#Ff0000',
    fontWeight: 'bold',
  };

  if (!CampaignDetail) {
    return <div>Job detail not found</div>;
  }

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      await Campaign.fetchCampaigns();
    } catch (error) {
      message.error("Fetch failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleViewGuestInfoClick = (CampaignDetail, job) => {
    navigate(`/hrmanager/cvlist`, {
      state: { jobID: job.id, CampaignDetail, job: job.name, CampaignID: CampaignDetail.id },
    });
  };

  const handleViewCVListClick = () => {
    setShowJobs(!showJobs);
  };

  const handleDetails = (item, CampaignDetail) => {
    navigate(`/${userRole}/Detail/${item.id}`, { state: { item, CampaignDetail } });
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const deleteJobCampaign = {
        campaginId: CampaignDetail.id,
        jobId: id,
      };
      await Campaign.deleteJobsNewCampaign(deleteJobCampaign);
      message.success("Jobs program deleted successfully");
      navigate('/hrmanager/campaigns');
    } catch (error) {
      message.error("intern still in jobs: " );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddJobCampaign = (item) => {
    navigate(`/hrmanager/ListJobs/${item.id}`, { state: { item } });
  };

  const handleSelect = (jobId, e) => {
    e.stopPropagation();
    setSelectJob(selectJob === jobId ? null : jobId);
  };

  const handleAddTrainingProgram = (item) => {
    navigate(`/${userRole}/ListTraining/${item.id}`, { state: { item } });
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gray-100">
      <div className="w-full max-w-7xl bg-white p-8 shadow-lg rounded-lg">
      <Button className="mb-4 flex items-center" onClick={() => navigate(-1)}>
          <LeftOutlined /> Back
        </Button>
        <div className="flex flex-col md:flex-row mb-8">
          <Image
            width={250}
            preview={false}
            src={CampaignDetail.imagePath}
            className="border-4 border-gray-300 shadow-xl rounded-lg"
          />
          <div className="ml-0 mt-6 md:ml-8 md:mt-0">
            <Title level={2}>{CampaignDetail.name}</Title>
            <div className="flex items-center mt-3">
              <div>Duration:</div>
              <Tag className="ml-3" color="#87d068">
                {CampaignDetail.duration} months
              </Tag>
            </div>
            <div className="flex items-center mt-3">
              <div>Start Date:</div>
              <div className="ml-3 text-red-500">
                {moment(CampaignDetail.estimateStartDate).format('DD-MM-YYYY')}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div>End Date:</div>
              <div className="ml-3 text-red-500">
                {moment(CampaignDetail.estimateEndDate).format('DD-MM-YYYY')}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div>Dealine Apply:</div>
              <div className="ml-3 text-red-500">
                {moment(CampaignDetail.submissionDeadline).format('DD-MM-YYYY')}
              </div>
            </div>
            <div className="flex flex-wrap mt-3">
              <div>Vị trí ứng tuyển lập trình viên:</div>
              {CampaignDetail.jobs.map((job, index) => (
                <Tag
                  className="ml-3 mt-0 text-blue-500"
                  key={index}
                >
                  {job.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <Tabs defaultActiveKey="1">
          {userRole === 'hrmanager' && (
            <TabPane tab="Campaign Details" key="1">
              <div className="mt-8">
                <Title level={3}>Scope Of Work</Title>
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: CampaignDetail.scopeOfWork }} />
                </Paragraph>
              </div>
              <div className="mt-8">
                <Title level={3}>Requirements</Title>
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: CampaignDetail.requirements }} />
                </Paragraph>
              </div>
              <div className="mt-8">
                <Title level={3}>Benefits</Title>
                <Paragraph>
                  <div dangerouslySetInnerHTML={{ __html: CampaignDetail.benefits }} />
                </Paragraph>
              </div>
            </TabPane>
          )}
          {userRole === 'hrmanager' && (
            <TabPane tab="List jobs in Campaign" key="2">
              <div className="mt-8 flex justify-between items-center">
                <Title level={3}>Danh sách Jobs</Title>
                <Button type="primary" onClick={() => { handleAddJobCampaign(CampaignDetail); }}>
                  Add Job to Campaign
                </Button>
              </div>
              <div className="mt-8">
                {isLoading ? (
                  <Spin size="large" />
                ) : (
                  <Row gutter={[16, 16]}>
                    {CampaignDetail.jobs.map((item) => (
                      <Col key={item.id} xs={24} sm={12} md={8}>
                        <Card
                          hoverable
                          className="job-card shadow-lg"
                          style={{ borderRadius: '8px', backgroundColor: 'white' }}
                          actions={[
                            <Popconfirm
                              title="Are you sure to delete this job?"
                              onConfirm={() => handleDelete(item.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button >
                                <span style={ratingStyle}>Delete</span>
                              </Button>
                            </Popconfirm>,
                          ]}
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
                          <Text
                            style={{ width: "fit-content", cursor: 'pointer', color: hovered === item.id ? 'blue' : 'black' }}
                            onClick={(e) => { e.stopPropagation(); handleDetails(item, CampaignDetail); }}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            View Details {'-->'}
                          </Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            </TabPane>
          )}
          {userRole === 'internshipcoordinators' && (
            <TabPane tab="Jobs list in Campaign" key="2">
              <div className="mt-8 flex justify-between items-center">
                <Title level={3}>Danh sách Jobs</Title>
              </div>
              <div className="mt-8">
                {isLoading ? (
                  <Spin size="large" />
                ) : (
                  <Row gutter={[16, 16]}>
                    {CampaignDetail.jobs.map((item) => (
                      <Col key={item.id} xs={24} sm={12} md={8}>
                        <Card
                          onClick={(e) => handleSelect(item.id, e)}
                          hoverable
                             className="job-card shadow-lg"
                          style={{ borderRadius: '8px', backgroundColor: 'white' }}
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
                            onClick={(e) => { e.stopPropagation(); handleDetails(item, CampaignDetail); }}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            View List Intern {'-->'}
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            </TabPane>
          )}
          {userRole === "hrmanager" && (
            <TabPane tab="View Candidates" key="3">
              <div className="mt-8">
                {isLoading ? (
                  <Spin size="large" />
                ) : (
                  <Row gutter={[16, 16]}>
                    {CampaignDetail.jobs.map((item) => (
                      <Col key={item.id} xs={24} sm={12} md={8}>
                        <Card
                          hoverable
                             className="job-card shadow-lg"
                          style={{ borderRadius: '8px', backgroundColor: 'white' }}
                          actions={[
                            <Popconfirm
                              title="Are you sure to delete this job?"
                              onConfirm={() => handleDelete(item.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button >
                                <span style={ratingStyle}>Delete</span>
                              </Button>
                            </Popconfirm>,
                          ]}
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
                            style={{ width: "fit-content", cursor: 'pointer', color: hoveredd === item.id ? 'blue' : 'black' }}
                            onClick={(e) => { e.stopPropagation(); handleViewGuestInfoClick(CampaignDetail, item); }}
                            onMouseEnter={() => setHoveredd(item.id)}
                            onMouseLeave={() => setHoveredd(null)}
                          >
                            View Candidates {'-->'}
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            </TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default HRCampaignsDetailss;
