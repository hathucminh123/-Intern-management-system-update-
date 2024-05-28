import React, { useState } from "react";
import { Typography, Button } from "antd";
import GuestCampainsComponent from "../../components/GuestCampainsComponent/GuestCampainsComponent";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
const { Search } = Input;
const { Title } = Typography;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const GuestInfo = () => {
  const [activeTab, setActiveTab] = useState("recruiting");

  const renderContent = () => {
    switch (activeTab) {
      case "recruiting":
        return (
          <div className="flex flex-col items-center">
            <GuestCampainsComponent />
          </div>
        );
      case "upcoming":
        return <p>Content for Sắp diễn ra</p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full px-4">
        <Title className="mt-8 text-center" level={1}>
          Khám phá chương trình thực tập
        </Title>
      </div>
      <div className="flex mt-4 items-center">
        <Button
          size="large"
          className={`mr-4 ${
            activeTab === "recruiting" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setActiveTab("recruiting")}
        >
          Đang tuyển dụng
        </Button>
        <Button
          size="large"
          className={`mr-4 ${
            activeTab === "upcoming" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Sắp diễn ra
        </Button>
        <Search
          size="large"
          placeholder="Tìm Kiếm"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div className="mt-8 w-full px-4">{renderContent()}</div>
    </div>
  );
};

export default GuestInfo;
