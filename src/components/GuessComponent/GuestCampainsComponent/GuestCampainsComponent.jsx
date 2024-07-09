import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Space, Image, Row, Col } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as Campaign from "../../../service/Campaign";
import CategoryListComponent from "../CategoryListComponent/CategoryListComponent";
import moment from "moment";
import { GrSchedule } from "react-icons/gr";

const { Title } = Typography;

const internships = [
  {
    id: 1,
    title: "Internship Team Summer 2024",
    positions: [
      "Frontend Developer",
      "Backend Developer",
      "Product Mindset",
      "Software Development",
      "Communication",
    ],
    duration: "10 weeks",
    startDate: "03/06/2024",
  },
  {
    id: 2,
    title: "Internship Program Summer 2024",
    positions: [
      "Frontend Developer",
      "Backend Developer",
      "UX/UI Designer",
      "Data Analyst",
      "Marketing Intern",
    ],
    duration: "12 weeks",
    startDate: "06/07/2024",
    imgurl: 'https://geekadventure.vn/_next/image?url=https%3A%2F%2Fadmin.geekadventure.vn%2Fuploads%2F1710823201921_8ba476a272.jpeg&w=1920&q=90'
  },
];

const GuestCampainsComponent = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

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

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesName = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = selectedPosition
      ? campaign.jobs.some((job) => job.name === selectedPosition)
      : true;
    return matchesName && matchesPosition;
  });

  return (
    <Space direction="vertical" style={{ width: '100%', padding: '20px', marginLeft: '50px' }}>
      <div style={{ width: '100%', padding: '20px', marginLeft: '25%' }}>
        <Title level={2}>Những vị trí ứng tuyển:</Title>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "24px" }}>
          {filteredCampaigns.flatMap((campaign) =>
            campaign.jobs.map((position, index) => (
              <Button
                key={index}
                className="rounded-full me-2 mb-2"
                style={{ whiteSpace: "normal" }}
                onClick={() => setSelectedPosition(position.name)}
              >
                Lập trình viên {position.name}
              </Button>
            ))
          )}
          <Button
            className="rounded-full me-2 mb-2"
            style={{ whiteSpace: "normal" }}
            onClick={() => setSelectedPosition("")}
          >
            Show All
          </Button>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CategoryListComponent />
        </Col>
        <Col span={18}>
          {filteredCampaigns.map((internship) => (
            <Card
              className="shadow-lg"
              key={internship.id}
              hoverable
              style={{
                borderWidth: 3,
                marginBottom: 20,
              }}
            
              onClick={() => navigate(`/guest/detail/${internship.id}`)}
            >
              <Row gutter={200}>
                <Col >
                  <Title level={3}>{internship.name}</Title>
                  <div className="mt-4">
                    <div className="font-bold">Vị trí:</div>
                    <div className="ml-3" style={{ display: "flex", flexWrap: "wrap" }}>
                      {internship.jobs.map((position, index) => (
                        <Button
                          key={index}
                          className="rounded-full me-2 mb-2"
                          style={{ whiteSpace: "normal" }}
                        >
                          Lập trình viên {position.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <ClockCircleOutlined />
                    <div className="ml-3">Thời gian thực tập:</div>
                    <div className="ml-3 font-bold">{internship.duration} months</div>
                  </div>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <div className="ml-3">Ngày bắt đầu dự kiến:</div>
                    <div className="ml-3 font-bold">{moment(internship.estimateStartDate).format("DD-MM-YYYY")}</div>
                  </div>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <div className="ml-3">Ngày bắt đầu dự kiến:</div>
                    <div className="ml-3 font-bold">{moment(internship.estimateEndDate).format("DD-MM-YYYY")}</div>
                  </div>
                </Col>
                <Col >
                  {internship?.imagePath ? (
                    <Image
                      preview={false}
                      src={internship.imagePath}
                      width={500}
                      height={250}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      src="https://via.placeholder.com/200x150"
                      width={200}
                      height={150}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </Space>
  );
};

export default GuestCampainsComponent;
