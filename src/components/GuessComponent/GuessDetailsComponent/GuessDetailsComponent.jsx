import React, { useState } from 'react';
import { Space, Typography, Row, Col, Image, Card, Collapse, Button, message } from 'antd';
import { Container } from 'reactstrap';
import { ClockCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormCVModal from '../FormCVComponent/FormCVModal';
import './GuessDetailsComponent.css';
import image1 from '../../../assets/javaImage.jpg';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const internships = [
  {
    id: 1,
    title: 'Internship Team Summer 2024',
    positions: [
      'Frontend Developer',
      'Backend Developer',
      'Product Mindset',
      'Software Development',
      'Communication',
    ],
    duration: '10 weeks',
    startDate: '03/06/2024',
    details: 'Detailed information about Internship Team Summer 2024...',
    imgurl: 'https://geekadventure.vn/_next/image?url=https%3A%2F%2Fadmin.geekadventure.vn%2Fuploads%2F1710823201921_8ba476a272.jpeg&w=1920&q=90',
  },
  {
    id: 2,
    title: 'Internship Program Summer 2024',
    positions: [
      'Frontend Developer',
      'Backend Developer',
      'UX/UI Designer',
      'Data Analyst',
      'Marketing Intern',
    ],
    duration: '12 weeks',
    startDate: '06/07/2024',
    details: 'Detailed information about Internship Program Summer 2024...',
    imgurl: 'https://geekadventure.vn/_next/image?url=https%3A%2F%2Fadmin.geekadventure.vn%2Fuploads%2F1710823201921_8ba476a272.jpeg&w=1920&q=90',
  },
];

const JobDescriptionComponent = () => {
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
      title: 'Điều kiện ứng tuyển',
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
          {panels.map((panel) => (
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
                      <Paragraph className="text-neutral-7">{panel.content}</Paragraph>
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
  const internship = internships.find((internship) => internship.id === parseInt(id));
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (!internship) {
    return <div>Internship not found</div>;
  }

  return (
    <Space className="container" direction="vertical">
      <Title level={1} className="customTitle">{internship.title}</Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '24px' }}>
        {internship.positions.map((position, index) => (
          <Button key={index} className="rounded-full me-2 mb-6" style={{ whiteSpace: 'normal' }}>
            {position}
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
          <Image src={image1} alt="image product" preview={false} className="customImage" />
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            {Array(4)
              .fill()
              .map((_, index) => (
                <Col span={12} key={index}>
                  <Image src={image1} alt="image small" preview={false} className="customImage" />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
      <div className="flex w-full justify-center mt-20">
        <div className="w-[1200px]">
          <Title level={2} className="title-hero-banner text-center font-bold">
            Tại sao nên chọn <strong style={{ color: 'rgb(0, 164, 153)' }}>Dịch vụ chúng tôi</strong>
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
      <JobDescriptionComponent />
      <Space direction="horizontal" size={500} className="Recruitment">
        <Button type="primary" className="rounded-full customButton" onClick={showModal}>Ứng tuyển ngay</Button>
        <FormCVModal visible={isModalVisible} onClose={handleCloseModal} title={internship.title} intern={internships} />
        <Image preview={false} src="https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fappropriate-opportunity%2Fdecoration-main.png&w=828&q=90" width={300} />
      </Space>
      <div className="flex w-full justify-center mt-20">
        <div className="w-[1200px]">
          <Title level={2} className="title-hero-banner text-center font-bold">
            Khám phá những <strong style={{ color: 'rgb(0, 164, 153)' }}>Chương trình thực tập khác</strong>
          </Title>
          {internships.map((internship) => (
            <Card
              key={internship.id}
              hoverable
              style={{ width: 900, borderWidth: 3, marginBottom: 20 }}
              onClick={() => navigate(`/guest/detail/${internship.id}`)}
            >
              <Space direction="horizontal">
                <div>
                  <Title className="text-center" level={3}>
                    {internship.title}
                  </Title>
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '24px' }}>
                    {internship.positions.map((position, index) => (
                      <Button key={index} className="rounded-full me-2 mb-6" style={{ whiteSpace: 'normal' }}>
                        {position}
                      </Button>
                    ))}
                  </div>
                  <div className="flex mt-4">
                    <ClockCircleOutlined />
                    <div className="ml-3">Kỳ thực tập:</div>
                    <div className="ml-3 font-bold">{internship.duration}</div>
                  </div>
                  <div className="flex mt-4">
                    <ScheduleOutlined />
                    <div className="ml-3">Ngày bắt đầu dự kiến:</div>
                    <div className="ml-3 font-bold">{internship.startDate}</div>
                  </div>
                </div>
                <Image preview={false} src={internship.imgurl} width={200} />
              </Space>
            </Card>
          ))}
        </div>
      </div>
    </Space>
  );
};

export default GuessDetailsComponent;
