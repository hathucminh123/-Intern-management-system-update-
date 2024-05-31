import React from "react";
import { Card } from "antd";
import { ClockCircleOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
const { Title } = Typography;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
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
  },
];

const HRCampaigns = () => {
  const navigate = useNavigate();

  const handleJobs = (item) => {
    navigate(`/hr/Jobs/${item.id}`, { state: { item } });
  };

  const handleAddNewCampaign = () => {
    navigate("/hr/NewCampaigns");
  };

  return (
    <div className="flex flex-col items-center">
      <Title className="text-center" level={1}>
        List Campaigns
      </Title>
      <div className="flex m-4">
        <Space direction="vertical" className="flex flex-row items-center ">
          <Input placeholder="Tìm kiếm" />
          <ButtonComponent
            size="middle"
            styleButton={{ background: "#063970", border: "none" }}
            styleTextButton={{ color: "#fff", fontWeight: "bold" }}
            textbutton="Tìm kiếm"
          />
          <ButtonComponent
            styleButton={{ background: "#06701c", border: "none" }}
            styleTextButton={{ color: "#fff", fontWeight: "bold" }}
            size="middle"
            textbutton="Tạo mới"
            onClick={handleAddNewCampaign}
          />
        </Space>
      </div>

      {internships.map((internship) => (
        <Card
          key={internship.id}
          hoverable={true}
          style={{
            width: 600,
            borderWidth: 3,
            marginBottom: 20,
          }}
          onClick={() => handleJobs(internship)}
        >
          <div>
            <Title className="text-center" level={3}>
              {internship.title}
            </Title>

            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "24px" }}
            >
              {internship.positions.map((position, index) => (
                <Button
                  key={index}
                  className="rounded-full me-2 mb-6"
                  style={{ whiteSpace: "normal" }}
                >
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
        </Card>
      ))}
    </div>
  );
};

export default HRCampaigns;
