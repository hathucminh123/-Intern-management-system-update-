import React, { useEffect, useState } from "react";
import { Typography, Button, Image, Tag, Tabs, Row, Col, Card, Popconfirm, message, Modal, Form, Input,Space } from "antd";
import "tailwindcss/tailwind.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import * as Campaign from "../../../service/Campaign";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const HRCampaignsDetailss = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const CampaignDetail = state?.item;
  const [showJobs, setShowJobs] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [hoveredd,setHoveredd]=useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  if (!CampaignDetail) {
    return <div>Job detail not found</div>;
  }

  const handleFetch = async () => {
    try {
      await Campaign.fetchCampaigns();
    } catch (error) {
      message.error("Fetch failed: " + error.message);
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

  const handleDetails = (item) => {
    navigate(`/hrmanager/Detail/${item.id}`, { state: { item } });
  };

  const handleDelete = async (id) => {
    try {
      const deleteJobCampaign = {
        campaginId: CampaignDetail.id,
        jobId: id,
      };
      await Campaign.deleteJobsNewCampaign(deleteJobCampaign);
      message.success("Jobs program deleted successfully");
      navigate('/hrmanager/campaigns')
    } catch (error) {
      message.error("Error deleting training program: " + error.message);
    }
  };

 

 


  const handleAddJobCampaign =(item)=>{
     navigate(`/hrmanager/ListJobs/${item.id}`,{state:{item}})
  }


  return (
    <div className="flex justify-center items-center py-12 bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg">
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
              <div>Thời gian:</div>
              <Tag className="ml-3" color="#87d068">
                {CampaignDetail.duration} months
              </Tag>
            </div>
            <div className="flex flex-wrap mt-3">
              <div>Vị trí ứng tuyển:</div>
              {CampaignDetail.jobs.map((job, index) => (
                <Button
                  onClick={() => handleViewGuestInfoClick(CampaignDetail, job)}
                  className="ml-3 mt-0 text-blue-500"
                  key={index}
                >
                  {job.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin Campaign" key="1">
            <div className="mt-8">
              <Title level={3}>MÔ TẢ CÔNG VIỆC</Title>
              <Paragraph>
                <div dangerouslySetInnerHTML={{ __html: CampaignDetail.scopeOfWork }} />
              </Paragraph>
            </div>
            <div className="mt-8">
              <Title level={3}>YÊU CẦU CÔNG VIỆC</Title>
              <Paragraph>
                <div dangerouslySetInnerHTML={{ __html: CampaignDetail.requirements }} />
              </Paragraph>
            </div>
            <div className="mt-8">
              <Title level={3}>QUYỀN LỢI</Title>
              <Paragraph>
                <div dangerouslySetInnerHTML={{ __html: CampaignDetail.benefits }} />
              </Paragraph>
            </div>
          </TabPane>
          <TabPane tab="Các Jobs có trong Campaign" key="2">
            <div className="mt-8 flex justify-between items-center">
              <Title level={3}>Danh sách Jobs</Title>
              <Button type="primary" onClick={()=>{handleAddJobCampaign(CampaignDetail)}}>
                Add Job to Campaign
              </Button>
            </div>
            <div className="mt-8">
              <Row gutter={[16, 16]}>
                {CampaignDetail.jobs.map((item) => (
                  <Col key={item.id} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      className="shadow-lg"
                      style={{ borderRadius: '8px', backgroundColor: 'white' }}
                      actions={[
                        <Popconfirm
                          title="Are you sure to delete this job?"
                          onConfirm={() => handleDelete(item.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="danger">Delete</Button>
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
            </div>
          </TabPane>
          <TabPane tab="Xem danh sách hồ sơ" key="3">
            <div className="mt-8">
            <Row gutter={[16, 16]}>
                {CampaignDetail.jobs.map((item) => (
                  <Col key={item.id} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      className="shadow-lg"
                      style={{ borderRadius: '8px', backgroundColor: 'white' }}
                      actions={[
                        <Popconfirm
                          title="Are you sure to delete this job?"
                          onConfirm={() => handleDelete(item.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="danger">Delete</Button>
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
                      <Space direction="vertical">
                      <Text
                        style={{ width: "fit-content", cursor: 'pointer', color: hovered === item.id ? 'blue' : 'black' }}
                        onClick={(e) => { e.stopPropagation(); handleDetails(item); }}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        View Details {'-->'}
                      </Text>
                      <Text
                        style={{ width: "fit-content", cursor: 'pointer', color: hoveredd === item.id ? 'blue' : 'black' }}
                        onClick={(e) => { e.stopPropagation();  handleViewGuestInfoClick(CampaignDetail, item); }}
                        onMouseEnter={() => setHoveredd(item.id)}
                        onMouseLeave={() => setHoveredd(null)}
                      >
                        Xem hồ sơ {'-->'}
                      </Text>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </TabPane>
        </Tabs>
        <div className="mt-8">
          <Title level={3}>ỨNG TUYỂN</Title>
          <Paragraph>
            Ứng viên quan tâm vui lòng gửi CV với tiêu đề mail:{" "}
            <Text strong>[Fresher React Developer - Họ tên]</Text> đến địa chỉ
            email <Text strong>FA.HCM@fpt.com</Text>
          </Paragraph>
          <Paragraph>Email: <a href="mailto:FA.HCM@fpt.com">FA.HCM@fpt.com</a></Paragraph>
          <Paragraph>
            Fanpage:{" "}
            <a
              href="https://www.facebook.com/fsoft.academy"
              target="_blank"
              rel="noopener noreferrer"
            >
              FPT Software Academy
            </a>
          </Paragraph>
          <Paragraph>
            Website:{" "}
            <a
              href="https://fsoft-academy.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://fsoft-academy.edu.vn/
            </a>
          </Paragraph>
        </div>
       
       
      </div>
    </div>
  );
};

export default HRCampaignsDetailss;
