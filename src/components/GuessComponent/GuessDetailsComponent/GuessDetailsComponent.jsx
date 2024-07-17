import React, { useState, useEffect } from 'react';
import { Space, Typography, Row, Col, Image, Card, Collapse, Button, message } from 'antd';
import { Container } from 'reactstrap';
import { ClockCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormCVModal from '../FormCVComponent/FormCVModal';
import './GuessDetailsComponent.css';
import image1 from '../../../assets/javaImage.jpg';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';
import * as Campaign from '../../../service/Campaign';
import { GrSchedule } from 'react-icons/gr';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const JobDescriptionComponent = ({ data }) => {
  const panels = [
    {
      key: '1',
      title: 'Scope of work',
      content: (
        <ul>
          <li>Grasp the product concept within a business context which aligns with business objective</li>
          <li>Comprehend the operational processes of the target user to define an effective workflow for both the product and the operational teams</li>
          <li>Model the workflow to visualize how things work</li>
          <li>Define the list feature requirements to describe how to create things that work</li>
        </ul>
      ),
      imgSrc: 'https://geekadventure.vn/images/opportunity/job-description/job-decoration-1.svg',
    },
    {
      key: '2',
      title: 'Requirements',
      content: (
        <ul>
          <li>Grasp the product concept within a business context which aligns with business objective</li>
          <li>Comprehend the operational processes of the target user to define an effective workflow for both the product and the operational teams</li>
          <li>Model the workflow to visualize how things work</li>
          <li>Define the list feature requirements to describe how to create things that work</li>
        </ul>
      ),
      imgSrc: 'https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fjob-description%2Fjob-decoration-2.png&w=1200&q=90',
    },
    {
      key: '3',
      title: 'Benefits',
      content: (
        <ul>
          <li>Grasp the product concept within a business context which aligns with business objective</li>
          <li>Comprehend the operational processes of the target user to define an effective workflow for both the product and the operational teams</li>
          <li>Model the workflow to visualize how things work</li>
          <li>Define the list feature requirements to describe how to create things that work</li>
        </ul>
      ),
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

          <Card className="mb-10 rounded-32 bg-neutral-1 shadow-level-1">
            <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="collapse-wrapper">
              <Panel
                header={
                  <label className="flex cursor-pointer items-center p-10">
                    <Image preview={false} src={panels[0].imgSrc} alt="Icon" width={64} height={64} className="mr-4" />
                    <Title level={3} className="flex-1 text-neutral-10">{panels[0].title}</Title>
                  </label>
                }
                key={panels[0].key}
                className="collapse-title"
              >
                <div className="p-10">
                  <Space direction="horizontal">
                    <div dangerouslySetInnerHTML={{ __html: data.scopeOfWork }} />
                    <Image preview={false} src={panels[0].imgSrc} alt="Decoration" width={200} />
                  </Space>
                </div>
              </Panel>
            </Collapse>
          </Card>
          <Card className="mb-10 rounded-32 bg-neutral-1 shadow-level-1">
            <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="collapse-wrapper">
              <Panel
                header={
                  <label className="flex cursor-pointer items-center p-10">
                    <Image preview={false} src={panels[1].imgSrc} alt="Icon" width={64} height={64} className="mr-4" />
                    <Title level={3} className="flex-1 text-neutral-10">{panels[1].title}</Title>
                  </label>
                }
                key={panels[1].key}
                className="collapse-title"
              >
                <div className="p-10">
                  <Space direction="horizontal">
                    <div dangerouslySetInnerHTML={{ __html: data.requirements }} />
                    <Image preview={false} src={panels[1].imgSrc} alt="Decoration" width={200} />
                  </Space>
                </div>
              </Panel>
            </Collapse>
          </Card>
          <Card className="mb-10 rounded-32 bg-neutral-1 shadow-level-1">
            <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="collapse-wrapper">
              <Panel
                header={
                  <label className="flex cursor-pointer items-center p-10">
                    <Image preview={false} src={panels[2].imgSrc} alt="Icon" width={64} height={64} className="mr-4" />
                    <Title level={3} className="flex-1 text-neutral-10">{panels[2].title}</Title>
                  </label>
                }
                key={panels[2].key}
                className="collapse-title"
              >
                <div className="p-10">
                  <Space direction="horizontal">
                    <div dangerouslySetInnerHTML={{ __html: data.benefits }} />
                    <Image preview={false} src={panels[2].imgSrc} alt="Decoration" width={200} />
                  </Space>
                </div>
              </Panel>
            </Collapse>
          </Card>

        </div>
      </div>
    </section>
  );
};

const GuessDetailsComponent = ({ id }) => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectJobs, setSelectJobs] = useState(null)
  const [selectCampaigns, setSelectCampaigns] = useState(null)
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const res = await Campaign.fetchCampaigns();
        setCampaigns(res.events); // Assumed API returns { events: [] }
        console.log("Campaigns data:", res.events); // Add this line
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaignsData();
  }, []);

  const internship = campaigns.find((internship) => internship.id === parseInt(id));

  const showModal = (job, campaigns) => {
    setSelectJobs(job);
    setSelectCampaigns(campaigns)
    setIsModalVisible(true);
  };
  const handleNavigateJobs = (job, campaign) => {
    navigate(`/guest/JobDetails/${job.id}`, { state: { itemJob: job, itemCampaign: campaign } })

  }
  const showModall = (campaigns) => {
    setSelectJobs(campaigns);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (!internship) {
    return <div> not found</div >;
  }

  return (
    <Space className="container" direction="vertical">
      <Title level={1} className="customTitle">{internship.name}</Title>
      <Typography.Text style={{ fontSize: '20px' }}>những vị trí có thể ứng tuyển trong chương trình:</Typography.Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '24px' }}>

        {internship.jobs.map((position, index) => (
          <Button key={index} className="rounded-full me-2 mb-6" style={{ whiteSpace: 'normal' }}>
            Lập trình viên {position.name}
          </Button>

        ))}


      </div>
      <Container>
        <Row>
          <Col span={24} className="textCenter">
            <Text className="sectionSubtitle">Thực tập chân thật, bật mở tiềm năng</Text>
            <Title level={2} className="sectionTitle">Tự hào kể chuyện xây dựng sản phẩm số</Title>
          </Col>
        </Row>
      </Container>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Image src={internship.imagePath} alt="image product" preview={false} className="customImage" width={550} />
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            {internship.jobs.map((program, index) => (
              <React.Fragment key={index}>
                <Col span={12}>
                  <Image src={program.imagePath} alt="image small" width={200} height={100} preview={false} className="customImage" />
                </Col>


              </React.Fragment>
            ))}
          </Row>
        </Col>
      </Row>
      <div className="flex w-full justify-center mt-20">
        <div className="w-[1200px]">
          <Title level={2} className="title-hero-banner text-center font-bold">
            Tại sao nên chọn <strong style={{ color: 'rgb(0, 164, 153)' }}> chúng tôi</strong>
          </Title>
          <Row gutter={[24, 24]} className="mt-[64px]">
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
                <Card className="flex flex-col items-start rounded-32 bg-neutral-1 p-6 shadow-level-1">
                  <div className="w-full items-center">
                    <Image preview={false} src={item.imgSrc} alt="Benefit icon" width={64} height={64} />
                    <Title level={3} className="mt-4 text-neutral-10">{item.title}</Title>
                  </div>
                  <Paragraph className="mt-4 text-neutral-7">{item.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          <Row gutter={[24, 24]} className="mt-10">
            {[
              { value: '6000+', description: 'CV đã gửi về từ năm 2016' },
              { value: '40+', description: 'Thực tập sinh trở thành thành viên chính thức' },
              { value: '10+', description: 'Product đã được xây dựng qua các mùa' },
            ].map((item, index) => (
              <Col span={8} key={index}>
                <Card className="flex flex-col items-start rounded-32 bg-neutral-1 p-6 shadow-level-1">
                  <Title level={2} className="text-tertiary-5">{item.value}</Title>
                  <Paragraph className="internship-program-statistics mt-4 text-neutral-7">{item.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <JobDescriptionComponent data={internship} />

      <Typography.Title className="job-description-title mb-[64px] text-center font-bold text-neutral-10">
        Những vị trí ứng tuyển <strong style={{ color: 'rgb(0, 164, 153)' }}>lập trình viên </strong>  </Typography.Title>
      {/* <Card className="mb-10 rounded-32 bg-neutral-1 shadow-level-1">
      <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="collapse-wrapper">
        <Panel
          header={
            <label className="flex cursor-pointer items-center p-10">
              <Image
                preview={false}
                src="https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fappropriate-opportunity%2Fdecoration-main.png&w=828&q=90"
                alt="Icon"
                width={64}
                height={64}
                className="mr-4"
              />
              <Title level={3} className="flex-1 text-neutral-10">Những vị trí ứng tuyển</Title>
            </label>
          }
          className="collapse-title"
        >
          {internship.jobs.map((list, index) => (
            <Space direction="vertical" size={20} className="recruitment" key={index}>
              <Title level={4}>Vị trí ứng tuyển: {list.name}</Title>
              <Row gutter={[16, 16]}>
                <Col span={15}>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <div className="ml-3">Ngày bắt đầu dự kiến:</div>
                    <div className="ml-3 font-bold">{moment(list.startDate).format("DD-MM-YYYY")}</div>
                  </div>
                  <div className="flex mt-4">
                    <ClockCircleOutlined />
                    <div className="ml-3">Thời gian thực tập:</div>
                    <div className="ml-3 font-bold">{list.duration} months</div>
                  </div>
                  <Space direction="horizontal" size={10} style={{ marginTop: '20px' }}>
                    <Button type="primary" className="rounded-full customButton" onClick={() => showModal(list, internship)}>Ứng tuyển ngay</Button>
                    <Button type="default" className="rounded-full customButton" onClick={() => handleNavigateJobs(list, internship)}>Xem chi tiết</Button>
                  </Space>
                </Col>
                <Col span={9}>
                  <Image
                    preview={false}
                    src="https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fappropriate-opportunity%2Fdecoration-main.png&w=828&q=90"
                    width={300}
                  />
                </Col>
              </Row>
            </Space>
          ))}
        </Panel>
      </Collapse>
      <FormCVModal visible={isModalVisible} onClose={handleCloseModal} title={internship.name} intern={internship} job={selectJobs} campaigns={selectCampaigns} />
    </Card> */}


      <Row gutter={[16, 16]}>
        {internship.jobs.map((list, index) => (
          <Col key={list.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="shadow-lg"
              onClick={(e) => { e.stopPropagation(); handleNavigateJobs(list, internship); }}
            >
              <Image
                className="rounded-lg mb-3"
                preview={false}
                width="100%"
                height={200}
                src={list.imagePath}
                alt={list.name}
              />
              <Title level={5} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Developer {list.name}
              </Title>
              <p><strong>Duration:</strong> {list.duration} months</p>
              <p><strong>Start Date:</strong> {moment(list.startDate).format('DD-MM-YYYY')}</p>


            </Card>
          </Col>

        ))}
      </Row>
      <div className="flex w-full justify-center mt-20">
        <div className="w-[1200px]">
          <Title level={2} className="title-hero-banner text-center font-bold">
            Khám phá những <strong style={{ color: 'rgb(0, 164, 153)' }}>Chương trình thực tập khác</strong>
          </Title>
          {campaigns.map((internship) => (
            <Card
              key={internship.id}
              hoverable
              style={{ width: 900, borderWidth: 3, marginBottom: 20 }}
              onClick={() => navigate(`/guest/detail/${internship.id}`)}
            >
              <Space direction="horizontal" size={200}>
                <div>
                  <Title className="text-center" level={3}>
                    {internship.name}
                  </Title>
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '24px' }}>
                    {internship.jobs.map((position, index) => (
                      <Button key={index} className="rounded-full me-2 mb-6" style={{ whiteSpace: 'normal' }}>
                        Lập trình viên {position.name}
                      </Button>
                    ))}
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
                <Image preview={false} src={internship.imagePath} height={200} width="auto" />
              </Space>
            </Card>
          ))}
        </div>
      </div>
    </Space>
  );
};

export default GuessDetailsComponent;
