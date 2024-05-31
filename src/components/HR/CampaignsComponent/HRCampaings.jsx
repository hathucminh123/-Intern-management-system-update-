import React from "react";
import { Typography } from "antd";
import { Card } from "antd";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import BenefitCampains from "../../HR/CampaignsComponent/BenefitCampains";
const { Title } = Typography;

const HRCampaings = () => {
  const campaigns = [
    {
      cardTitle: "Chương trình thực tập Summer",
      duration: "8 tuần",
      positions: ["FontEnd Developer", "BackEnd Developer", "Business Analyst"],
      startDate: "12/7/2024",
    },
    {
      cardTitle: "Chương trình thực tập Spring",
      duration: "10 tuần",
      positions: ["Full Stack Developer", "Data Scientist", "UI/UX Designer"],
      startDate: "01/12/2024",
    },
  ];
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <Title>Khám phá chương trình thực tập</Title>
        <div className="mt-3">
          {campaigns.map((campaign, index) => (
            <Card
              key={index}
              hoverable
              title={<Title level={3}>{campaign.cardTitle}</Title>}
              bordered={true}
              style={{
                width: 800,
                marginBottom: 20,
              }}
            >
              <div className="flex">
                <div>Thời gian thực tập: </div>
                <div className="ml-3">{campaign.duration}</div>
              </div>
              <div className="flex mt-4 items-center">
                <div>Các vị trí tuyển dụng: </div>
                <div className="ml-3 flex flex-row">
                  {campaign.positions.map((position, posIndex) => (
                    <div
                      key={posIndex}
                      className="bg-gray-300 p-2 rounded-xl ml-3"
                    >
                      {position}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex mt-3">
                <div>Thời gian bắt đầu: </div>
                <div className="ml-3">{campaign.startDate}</div>
              </div>
              <ButtonComponent
                className="mt-5"
                styleButton={{ background: "#06701c", border: "none" }}
                styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                size="middle"
                textbutton={<div>Tìm hiểu thêm</div>}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRCampaings;