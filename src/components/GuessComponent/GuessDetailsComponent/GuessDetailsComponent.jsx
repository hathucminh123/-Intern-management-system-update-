import React, { useState, useEffect } from 'react';
import { Space, Typography, Row, Col, Image, Card, Collapse, Button } from 'antd';
import { Container } from 'reactstrap';
import { ClockCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormCVModal from '../FormCVComponent/FormCVModal';
import './GuessDetailsComponent.css';
import * as Campaign from '../../../service/Campaign';
import { GrSchedule } from 'react-icons/gr';
import moment from 'moment';
import { IoMdTime } from 'react-icons/io';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const JobDescriptionComponent = ({ data }) => {
  const panels = [
    {
      key: '1',
      title: 'Scope of work',
      content: data.scopeOfWork,
      imgSrc: 'https://geekadventure.vn/images/opportunity/job-description/job-decoration-1.svg',
    },
    {
      key: '2',
      title: 'Requirements',
      content: data.requirements,
      imgSrc: 'https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fjob-description%2Fjob-decoration-2.png&w=1200&q=90',
    },
    {
      key: '3',
      title: 'Benefits',
      content: data.benefits,
      imgSrc: 'https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fjob-description%2Fjob-decoration-3.png&w=1080&q=90',
    },
  ];

  return (
    <section className="pt-[120px]">
      <div className="flex w-full justify-center">
        <div className="w-[1200px] last:mb-0">
          <Title level={2} className="job-description-title mb-[64px] text-center font-bold text-neutral-10">
            Chi tiết <strong style={{ color: 'rgb(0, 164, 153)' }}>chương trình thực tập</strong>
          </Title>

          {panels.map(panel => (
            <Card key={panel.key} className="mb-10 rounded-32 bg-neutral-1 shadow-level-1">
              <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="collapse-wrapper">
                <Panel
                  header={
                    <label className="flex cursor-pointer items-center p-10">
                      <Image preview={false} src={panel.imgSrc} alt="Icon" width={64} height={64} className="mr-4" />
                      <Title level={3} className="flex-1 text-neutral-10">{panel.title}</Title>
                    </label>
                  }
                  key={panel.key}
                  className="collapse-title"
                >
                  <div className="p-10">
                    <Space direction="horizontal">
                      <div dangerouslySetInnerHTML={{ __html: panel.content }} />
                      <Image preview={false} src={panel.imgSrc} alt="Decoration" width={200} />
                    </Space>
                  </div>
                </Panel>
              </Collapse>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


const GuessDetailsComponent = ({ id }) => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const res = await Campaign.fetchCampaigns();
        setCampaigns(res.events);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaignsData();
  }, []);

  const internship = campaigns.find((internship) => internship.id === parseInt(id));

  const showModal = (job, campaign) => {
    setSelectedJob(job);
    setSelectedCampaign(campaign);
    setIsModalVisible(true);
  };

  const handleNavigateJobs = (job, campaign) => {
    navigate(`/guest/JobDetails/${job.id}`, { state: { itemJob: job, itemCampaign: campaign } });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (!internship) {
    return <div>Chiến dịch tuyển thực tập sinh không tồn tại</div>;
  }

  return (
    <Space className="container" direction="vertical" size="large" style={{ padding: '20px' }}>
      <Card style={{ width: '100%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <Title level={1} className="customTitle">{internship.name}</Title>
        <Text style={{ fontSize: '20px' }}>Những vị trí có thể ứng tuyển trong chiến dịch:</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '24px' }}>
          {internship.jobs.map((position, index) => (
            <Button
              key={index}
              type="default"
              className="rounded-full me-2 mb-2"
              style={{ whiteSpace: 'normal', marginBottom: '10px' }}
            >
              Lập trình viên {position.name}
            </Button>
          ))}
        </div>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <div className="detail-item" style={{ display: 'flex', alignItems: 'center' }}>
              <GrSchedule style={{ marginRight: '8px', fontSize: '16px' }} />
              <Text style={{ fontSize: '16px' }}>
                Ngày bắt đầu dự kiến: <span className="bold">{moment(internship.estimateStartDate).format("DD-MM-YYYY")}</span>
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="detail-item" style={{ display: 'flex', alignItems: 'center' }}>
              <GrSchedule style={{ marginRight: '8px', fontSize: '16px' }} />
              <Text style={{ fontSize: '16px' }}>
                Ngày kết thúc dự kiến: <span className="bold">{moment(internship.estimateEndDate).format("DD-MM-YYYY")}</span>
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="detail-item" style={{ display: 'flex', alignItems: 'center' }}>
              <IoMdTime style={{ marginRight: '8px', fontSize: '16px' }} />
              <Text style={{ fontSize: '16px' }}>
                Thời gian thực tập: <span className="bold">{internship.duration} months</span>
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Container>
        <Row>
          <Col span={24} className="textCenter">
            <Text className="sectionSubtitle">Thực tập chân thật, bật mở tiềm năng</Text>
            <Title level={2} className="sectionTitle">Tự hào kể chuyện xây dựng sản phẩm</Title>
          </Col>
        </Row>
      </Container>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Image src={internship.imagePath} alt="Internship Image" preview={false} className="customImage" width="100%" />
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            {internship.jobs.map((program, index) => (
              <Col span={12} key={index}>
                <Image src={program.imagePath} alt="Program Image" width="100%" height={100} preview={false} className="customImage" />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <div className="flex justify-center w-full mt-20">
        <div className="w-full max-w-6xl">
          <Title level={2} className="text-center font-bold">
            Tại sao nên chọn <strong style={{ color: 'rgb(0, 164, 153)' }}>chúng tôi</strong>
          </Title>
          <Row gutter={[24, 24]} className="mt-16">
            {[
              {
                imgSrc: 'https://geekadventure.vn/icons/tasks.svg',
                title: 'Làm trong dự án thật',
                description: 'Có cơ hội làm việc trong dự án thật, dựa trên bài toán mà doanh nghiệp đang cần giải quyết.',
              },
              {
                imgSrc: 'https://geekadventure.vn/icons/senior-support.svg',
                title: 'Đồng hành cùng Senior',
                description: 'Trong suốt thời gian thực tập luôn có Coach và PIC theo sát, nhiệt tình hỗ trợ, đưa ra lời khuyên.',
              },
              {
                imgSrc: 'https://geekadventure.vn/icons/geek-development.svg',
                title: 'Trau dồi toàn diện kỹ năng',
                description: 'Không chỉ là kỹ năng chuyên môn mà kỹ năng mềm cũng phát triển rõ rệt sau thời gian thực tập.',
              },
            ].map((item, index) => (
              <Col span={8} key={index}>
                <Card className="flex flex-col items-start rounded-lg p-6 shadow-lg">
                  <div className="w-full flex items-center">
                    <Image preview={false} src={item.imgSrc} alt="Benefit icon" width={64} height={64} />
                    <Title level={3} className="mt-4 ml-4">{item.title}</Title>
                  </div>
                  <Paragraph className="mt-4">{item.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>

          {/* <Row gutter={[24, 24]} className="mt-10">
            {[
              { value: '6000+', description: 'CV đã gửi về từ năm 2016' },
              { value: '40+', description: 'Thực tập sinh trở thành thành viên chính thức' },
              { value: '10+', description: 'Product đã được xây dựng qua các mùa' },
            ].map((item, index) => (
              <Col span={8} key={index}>
                <Card className="flex flex-col items-start rounded-lg p-6 shadow-lg">
                  <Title level={2} className="text-tertiary-5">{item.value}</Title>
                  <Paragraph className="mt-4">{item.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row> */}
        </div>
      </div>

      <JobDescriptionComponent data={internship} />

      <Title level={2} className="text-center font-bold mb-16">
        Những vị trí ứng tuyển <strong style={{ color: 'rgb(0, 164, 153)' }}>lập trình viên</strong>
      </Title>

      <Row gutter={[16, 16]}>
        {internship.jobs.map((list, index) => (
          <Col key={list.id} xs={24} sm={12} md={8}>
            <Card hoverable className="shadow-lg"
              onClick={(e) => { e.stopPropagation(); handleNavigateJobs(list, internship); }}
            >
              <Image className="rounded-lg mb-3" preview={false} width="100%" height={200} src={list.imagePath} alt={list.name} />
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Developer {list.name}
              </Title>
              <p><strong>Duration:</strong> {list.duration} months</p>
              <p><strong>Start Date:</strong> {moment(list.startDate).format('DD-MM-YYYY')}</p>
              {/* <Text
                style={{ width: "fit-content", cursor: 'pointer', color: hovered === list.id ? 'blue' : 'black' }}
              
                onMouseEnter={() => setHovered(list.id)}
                onMouseLeave={() => setHovered(null)}
              >
                View Details {'-->'}
              </Text> */}
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex justify-center w-full mt-20">
        <div className="w-full max-w-6xl">
          <Title level={2} className="text-center font-bold">
            Khám phá những <strong style={{ color: 'rgb(0, 164, 153)' }}>Chương trình thực tập khác</strong>
          </Title>
          {campaigns.map((internship) => (
            <Card
              key={internship.id}
              hoverable
              className="shadow-lg"
              style={{ width: '100%', maxWidth: '900px', margin: '0 auto', marginBottom: '20px' }}
              onClick={() => navigate(`/guest/detail/${internship.id}`)}
            >
              <Space direction="horizontal" size={24}>
                <div>
                  <Title level={3}>{internship.name}</Title>
                  <div className="mt-4">
                    <Text strong>Vị trí có thể ứng tuyển trong chiến dịch:</Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '24px' }}>
                      {internship.jobs.map((position, index) => (
                        <Button key={index} className="rounded-full me-2 mb-6" style={{ whiteSpace: 'normal' }}>
                          Lập trình viên {position.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <ClockCircleOutlined />
                    <div className="ml-3">Kỳ thực tập:</div>
                    <div className="ml-3 font-bold">{internship.duration} months</div>
                  </div>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <div className="ml-3">Ngày bắt đầu dự kiến:</div>
                    <div className="ml-3 font-bold">{moment(internship.estimateStartDate).format("DD-MM-YYYY")}</div>
                  </div>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <div className="ml-3">Ngày kết thúc dự kiến:</div>
                    <div className="ml-3 font-bold">{moment(internship.estimateEndDate).format("DD-MM-YYYY")}</div>
                  </div>
                </div>
                <Image preview={false} src={internship.imagePath} height={200} width={200} style={{ objectFit: 'cover', borderRadius: '8px' }} />
              </Space>
            </Card>
          ))}
        </div>
      </div>

      <FormCVModal visible={isModalVisible} onClose={handleCloseModal} title={internship.name} intern={internship} job={selectedJob} campaigns={selectedCampaign} />
    </Space>
  );
};

export default GuessDetailsComponent;
