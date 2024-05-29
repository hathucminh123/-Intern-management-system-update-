import React, { useState } from "react";
import { Typography, Button,Image } from "antd";
import GuestCampainsComponent from "../../components/GuestCampainsComponent/GuestCampainsComponent";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import './GuestInfo.css'
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

    <div className="Container " >
    <div className="logo">

      <Image preview={false} src="https://geekadventure.vn/_next/image?url=%2Fimages%2Fopportunity%2Fhero-banner%2Fmain-decoration.png&w=1920&q=90" width={200}/>
      <div  className="logoedit">
        <Image style={{position:'absolute',right:'500px',bottom:'100px'}} preview={false} src="https://geekadventure.vn/images/opportunity/hero-banner/pattern1.svg" width={100}/>
      </div>
      <div  className="logoedit">
        <Image style={{position:'absolute',right:'600px',top:'100px'}} preview={false} src="https://geekadventure.vn/images/grow/take-ownership-development/rocket.svg" width={100}/>
      </div>
      <div  className="logoedit">
        <Image style={{position:'absolute',left:'500px',bottom:'200px'}} preview={false} src="https://geekadventure.vn/images/grow/take-ownership-development/star.svg" color="transparent" width={100}/>
      </div>
      <div  className="logoedit">
        <Image style={{position:'absolute',left:'550px',top:'0'}} preview={false} src="https://geekadventure.vn/images/opportunity/hero-banner/pattern2.svg" color="transparent" width={100}/>
      </div>
    </div>
  
      <div className="max-w-3xl w-full px-4">
        <Title className="mt-8 text-center" level={1}>
          Khám phá <strong className="title">chương trình thực tập</strong>
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