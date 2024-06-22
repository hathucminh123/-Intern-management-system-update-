import React, { useState } from "react";
import { Typography, Button, Image, Input } from "antd";
import GuestCampainsComponent from "../../components/GuessComponent/GuestCampainsComponent/GuestCampainsComponent";
import { AudioOutlined } from "@ant-design/icons";
import './GuestInfo.css';

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

const GuestInfo = () => {
  const [activeTab, setActiveTab] = useState("recruiting");
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (value) => setSearchQuery(value);

  const renderContent = () => {
    switch (activeTab) {
      case "recruiting":
        return (
          <div className="flex flex-col items-center">
            <GuestCampainsComponent searchQuery={searchQuery} />
          </div>
        );
      // case "upcoming":
      //   return <p>Content for Sắp diễn ra</p>;
      default:
        return null;
    }
  };

  return (
    <div className="Container">
      <div className="logo">
        <Image
          preview={false}
          src="https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fhero-banner%2Fmain-decoration.png&w=1920&q=90"
          width={200}
        />
        <div className="logoedit" style={{ right: '200px', bottom: '100px' }}>
          <Image
            preview={false}
            src="https://geekadventure.vn/images/opportunity/hero-banner/pattern1.svg"
            width={100}
          />
        </div>
        <div className="logoedit" style={{ right: '300px', top: '200px' }}>
          <Image
            preview={false}
            src="https://geekadventure.vn/images/grow/take-ownership-development/rocket.svg"
            width={100}
          />
        </div>
        <div className="logoedit" style={{ left: '200px', bottom: '100px' }}>
          <Image
            preview={false}
            src="https://geekadventure.vn/images/grow/take-ownership-development/star.svg"
            width={100}
          />
        </div>
        <div className="logoedit" style={{ left: '300px', top: '200px' }}>
          <Image
            preview={false}
            src="https://geekadventure.vn/images/opportunity/hero-banner/pattern2.svg"
            width={100}
          />
        </div>
      </div>

      <div className="max-w-3xl w-full px-4">
        <Title className="mt-8 text-center" level={1}>
          Khám phá <strong className="title">chiến dịch thực tập</strong>
        </Title>
      </div>
      <div className="flex mt-4 items-center">
        <Button
          size="large"
          className={`mr-4 ${activeTab === "recruiting" ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setActiveTab("recruiting")}
        >
          Đang tuyển dụng
        </Button>
        {/* <Button
          size="large"
          className={`mr-4 ${activeTab === "upcoming" ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Sắp diễn ra
        </Button> */}
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
