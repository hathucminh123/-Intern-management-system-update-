import React, { useEffect, useState } from "react";
import { Typography, Button, Image, Tag, Tabs, Layout, Table, Menu, Space, Dropdown, Row ,Col,Card,message} from "antd";
import "tailwindcss/tailwind.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { IoMdTime } from "react-icons/io";
import * as Jobss from "../../../service/JobsService"

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Header, Content } = Layout;

const JobsTrainingDetails = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const jobDetail = state?.item;
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [training,setTraining]=useState([]);
  const userRole = localStorage.getItem('role');
  const navigate= useNavigate();
  const [hovered, setHovered] = useState(null);
  console.log('Job Detail:', jobDetail);

  if (!jobDetail) {
    return <div>Job detail not found</div>;
  }

  const data = [
    { id: 1, name: "Thúc Minh", email: 'minhhtse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' },
    { id: 2, name: "Hoàng Hiệp", email: 'hiepse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' },
    { id: 3, name: "Minh Trí", email: 'trise150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' },
    { id: 4, name: "Tâm", email: 'tamse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'FPT University' }
  ];

  const dataReport = [
    { id: 1, name: "Thúc Minh", Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B' },
    { id: 2, name: "Hoàng Hiệp", Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B'},
    { id: 3, name: "Minh Trí", Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B'},
    { id: 4, name: "Tâm",  Logicalthinking: 'A', attitude: 'B',skill:'c', total: 'B' }
  ];


  const handleOpenDetailModal = (record) => {
    // Handle open detail modal logic
  };

  const handleDeleteResource = (id) => {
    // Handle delete resource logic
  };
  useEffect(() => {
    if (jobDetail?.trainingPrograms) {
      setTraining(jobDetail.trainingPrograms);
    }
  }, [jobDetail]);


  const handleAddMentorJobCampaign =()=>{
    navigate('/internshipcoordinators/MentorList')
  }
  const handleDeleteTraining = async (jobId, trainingProgramId) => {
    try {
      const dataDeleteTraining = {
        jobId: jobId,
        trainingProgramId: trainingProgramId,
      };

      await Jobss.deleteTrainingNewJobs(dataDeleteTraining);
      message.success("Training program deleted successfully");
      setTraining((prev) => prev.filter(resource => resource.id !== trainingProgramId));
    } catch (error) {
      message.error("Error Training is already deleting training program: " );
      console.error("Error deleting training program:", error);
    }
  };


const   handleNavigateReport =(record)=>{
  navigate(`/internshipcoordinators/markReport/${record.id}`,{state:{record}})
}
const handleTrainingDetails = (item) => {
  navigate(`/${userRole}/TrainingProgramsofjob/${item.id}`, {
    state: { item },
  });
};
const handleAddTrainingProgram = (item) => {
  navigate(`/${userRole}/ListTraining/${item.id}`, { state: { item } });
};

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleOpenDetailModal(record)}>View</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button onClick={() => handleDeleteResource(record.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", responsive: ['md'] },
    { title: "Education", dataIndex: "education", key: "education", responsive: ['md'] },
    {
      title: "Actions", key: "actions", responsive: ['md'], render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
          <Button onClick={()=>{handleNavigateReport(record)}}>View Report</Button>
        </Space>
      ),
    },
  ];

  const columnsReport = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Logical thinking", dataIndex: "Logicalthinking", key: "Logicalthinking", responsive: ['md'] },
    { title: "Attitude", dataIndex: "attitude", key: "attitude", responsive: ['md'] },
    { title: "skill", dataIndex: "skill", key: "skill", responsive: ['md'] },
    { title: "Total", dataIndex: "total", key: "total", responsive: ['md'] },
   
  ];


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className=" w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="flex mb-8">
          <Image
            width={250}
            preview={false}
            src={jobDetail.imagePath}
            className="border-4 border-gray-300 shadow-xl rounded-lg"
          />
          <div className="ml-8">
            <Title level={2}>{jobDetail.name}</Title>
            <div className="flex mt-3">
            
              <div>Duration :</div>
         
              <Tag className="ml-3" color="#87d068">
                {jobDetail.duration} months
              </Tag>
            </div>
            <div className="flex mt-3">
              <div>Start Date: </div>
              <div className="ml-3 text-red-500">{moment(jobDetail.startDate).format('DD-MM-YYYY')}</div>
            </div>
            <div className="flex mt-3">
              <div>location: </div>
              <div className="ml-3 text-red-500">Thành Phố Hồ Chí Minh</div>
            </div>
          </div>
        </div>
        <hr />

        {userRole === "internshipcoordinators" && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Jobs Details" key="1">
              <Title className="mt-8" level={3}>Scope Of Work</Title>
              <Paragraph>
                <ul className="list-disc list-inside">
                  <div dangerouslySetInnerHTML={{ __html: jobDetail.scopeOfWork }} />
                </ul>
              </Paragraph>
              <Title level={3}>Requirements</Title>
              <Paragraph>
                <ul className="list-disc list-inside">
                  <div dangerouslySetInnerHTML={{ __html: jobDetail.requirements }} />
                </ul>
              </Paragraph>
              <Title level={3}>Benefits</Title>
              <Paragraph>
                <ul className="list-disc list-inside">
                  <div dangerouslySetInnerHTML={{ __html: jobDetail.benefits }} />
                </ul>
              </Paragraph>
            </TabPane>
            {/* <TabPane tab="Student List in jobs" key="2">
              <Layout>
                <Header style={{ backgroundColor: "white", color: "black", padding: "0 16px", borderBottom: "1px solid #f0f0f0" ,height:'100px'}}>
                  <div className="mt-8 flex justify-between items-center">
                    <Title level={3}>Student List</Title>
                    <div style={{gap:"100px"}}>
                    <Button  style={{marginRight:"20px"}}  type="primary" onClick={() => { handleAddMentorJobCampaign(jobDetail) }}>
                      Assign intern to Manage this class
                    </Button>
                    <Button type="primary" onClick={() => { handleAddMentorJobCampaign(jobDetail) }}>
                      Assign mentor to Manage this class
                    </Button>
                    </div>
                  </div>
                </Header>
                <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
                  <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    style={{ marginTop: "20px" }}
                    pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
                  />
                </Content>
              </Layout>
            </TabPane> */}
            <TabPane tab="Training Program Lists in jobs" key="3">
              <Layout>
                <Header style={{ backgroundColor: "white", color: "black", padding: "0 16px", borderBottom: "1px solid #f0f0f0" }}>
                  <div className="mt-8 flex justify-between items-center">
                    <Title level={3}>Student Report List</Title>
                    {/* <Button type="primary" onClick={() => { handleAddMentorJobCampaign(jobDetail) }}>
                      Assign mentor to Manage this class
                    </Button> */}
                        <ButtonComponent
                          styleButton={{ background: "#06701c", border: "none" }}
                          styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                          size="middle"
                          textbutton="Add training program"
                          onClick={(e) => { e.stopPropagation(); handleAddTrainingProgram(jobDetail); }}
                        />
                  </div>
                </Header>
                <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
                  {/* <Table
                    columns={columnsReport}
                    dataSource={dataReport}
                    rowKey="id"
                    style={{ marginTop: "20px" }}
                    pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
                  /> */}
                 
                  <Row gutter={[16,16]} >
                    {training.map((trainingProgram)=>(
                        <Col key={trainingProgram.id} xs={24} sm={12} md={8}>
                                 <Card
                            hoverable
                            className="shadow-lg"
                            style={{ borderRadius: '8px', backgroundColor: 'white', width: '100%' }}
                            actions={[
                              <Button
                                onClick={(e) => { e.stopPropagation(); handleDeleteTraining(jobDetail.id, trainingProgram.id); }}
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
                              <Text
                                style={{ width: "fit-content", cursor: 'pointer', color: hovered === trainingProgram.id ? 'blue' : 'black' }}
                                onClick={(e) => { e.stopPropagation(); handleTrainingDetails(trainingProgram); }}
                                onMouseEnter={() => setHovered(trainingProgram.id)}
                                onMouseLeave={() => setHovered(null)}
                              >
                                View Details {'-->'}
                              </Text>
                            </Space>
                          </Card>


                        </Col>



                    ))}
                  </Row>
                </Content>
              </Layout>
            </TabPane>
          </Tabs> 
        )}

        {userRole === "hrmanager" && (
          <>
            <Title className="mt-8" level={3}>Scope Of Work</Title>
            <Paragraph>
              <ul className="list-disc list-inside">
                <div dangerouslySetInnerHTML={{ __html: jobDetail.scopeOfWork }} />
              </ul>
            </Paragraph>
            <Title level={3}>Requirements</Title>
            <Paragraph>
              <ul className="list-disc list-inside">
                <div dangerouslySetInnerHTML={{ __html: jobDetail.requirements }} />
              </ul>
            </Paragraph>
            <Title level={3}>Benefits</Title>
            <Paragraph>
              <ul className="list-disc list-inside">
                <div dangerouslySetInnerHTML={{ __html: jobDetail.benefits }} />
              </ul>
            </Paragraph>
          </>
        )}

        <Title level={3} className="mt-8">Recruitment</Title>
        <Paragraph>
          Ứng viên quan tâm vui lòng gửi CV với tiêu đề mail: <Text strong>[Fresher React Developer - Họ tên]</Text> đến địa chỉ email <Text strong>FA.HCM@fpt.com</Text>
        </Paragraph>
        <Paragraph>Email: <a href="mailto:FA.HCM@fpt.com">FA.HCM@fpt.com</a></Paragraph>
        <Paragraph>Fanpage: <a href="https://www.facebook.com/fsoft.academy" target="_blank" rel="noopener noreferrer">FPT Software Academy</a></Paragraph>
        <Paragraph>Website: <a href="https://fsoft-academy.edu.vn/" target="_blank" rel="noopener noreferrer">https://fsoft-academy.edu.vn/</a></Paragraph>
      </div>
    </div>
  );
};

export default JobsTrainingDetails;
