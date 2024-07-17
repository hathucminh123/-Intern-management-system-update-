import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Space, Image, Row, Col } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as Campaign from "../../../service/Campaign";
import moment from "moment";
import { GrSchedule } from "react-icons/gr";

const { Title, Text } = Typography;

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
    <Space direction="vertical" style={{ width: '100%', padding: '20px' }}>
      <div style={{ width: '100%', padding: '20px' }}>
        <Title level={2}>Những vị trí ứng tuyển:</Title>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "24px" }}>
          {filteredCampaigns.flatMap((campaign) =>
            campaign.jobs.map((position, index) => (
              <Button
                key={index}
                type={selectedPosition === position.name ? "primary" : "default"}
                className="rounded-full me-2 mb-2"
                style={{ whiteSpace: "normal" }}
                onClick={() => setSelectedPosition(position.name)}
              >
                Lập trình viên {position.name}
              </Button>
            ))
          )}
          <Button
            type={selectedPosition === "" ? "primary" : "default"}
            className="rounded-full me-2 mb-2"
            style={{ whiteSpace: "normal" }}
            onClick={() => setSelectedPosition("")}
          >
            Show All
          </Button>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          {filteredCampaigns.map((internship) => (
            <Card
              className="shadow-lg"
              key={internship.id}
              hoverable
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: "8px",
                marginBottom: "20px",
                overflow: "hidden",
              }}
              onClick={() => navigate(`/guest/detail/${internship.id}`)}
            >
              <Row gutter={[16, 16]}>
                <Col span={14}>
                  <Title level={3}>Chiến dịch thực tập: {internship.name}</Title>
                  <div className="mt-4">
                    <Text strong>Vị trí có thể ứng tuyển trong chiến dịch:</Text>
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
                    <Text className="ml-3">Thời gian thực tập:</Text>
                    <Text className="ml-3 font-bold">{internship.duration} months</Text>
                  </div>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <Text className="ml-3">Ngày bắt đầu dự kiến:</Text>
                    <Text className="ml-3 font-bold">{moment(internship.estimateStartDate).format("DD-MM-YYYY")}</Text>
                  </div>
                  <div className="flex mt-4">
                    <GrSchedule />
                    <Text className="ml-3">Ngày kết thúc dự kiến:</Text>
                    <Text className="ml-3 font-bold">{moment(internship.estimateEndDate).format("DD-MM-YYYY")}</Text>
                  </div>
                </Col>
                <Col span={10}>
                  {internship?.imagePath ? (
                    <Image
                      preview={false}
                      src={internship.imagePath}
                      width="100%"
                      height={250}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <Image
                      preview={false}
                      src="https://via.placeholder.com/500x250"
                      width="100%"
                      height={250}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
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
