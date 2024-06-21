import React, { useEffect, useState } from "react";
import { Card, Image } from "antd";
import { ClockCircleOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Typography, Button ,Layout} from "antd";
import { useNavigate } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import * as campaign from '../../../service/Campaign'
import { set } from "lodash";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const HRCampaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
console.log(campaigns)
  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const res = await campaign.fetchCampaigns();
        setCampaigns(res.events);
        console.log("Campaigns data:", res.events); // Add this line
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaignsData();
  }, []);

  const handleJobs = (item) => {
    navigate(`/hrmanager/campaigns/${item.id}`, { state: { item } });
  };

  const handleAddNewCampaign = () => {
    navigate("/hrmanager/NewCampaigns");
  };

  return (
    <Layout >
    <Header style={{ color: 'white' }}>List campaigns </Header>
  <Content style={{ padding: '24px', minHeight: '80vh' }}>
    <div className="flex flex-col items-center">
      {/* <Title className="text-center" level={1}>
        List Campaigns
      </Title> */}
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

      {campaigns.map((campaign) => (
        <Card
          key={campaign.id}
          hoverable={true}
          style={{
            width: 700,
            borderWidth: 3,
            marginBottom: 20,
          }}
          onClick={() => handleJobs(campaign)}
        >
          <Space direction="horizontal" size={50}>
                <Image  preview={false} src={campaign.imagePath} width={300}/>
          <div>
            <Title className="text-center" level={3}>
              {campaign.name}
            </Title>

            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "24px" }}
            >
              {campaign.jobs.map((position, index) => (
                <Button
                  key={index}
                  className="rounded-full me-2 mb-6"
                  style={{ whiteSpace: "normal" }}
                >
                  {position.name}
                </Button>
              ))}
            </div>
            <div className="flex mt-4">
              <ClockCircleOutlined />
              <div className="ml-3">Kỳ thực tập:</div>
              <div className="ml-3 font-bold">{campaign.duration} months</div>
            </div>
            {/* <div className="flex mt-4">
              <ScheduleOutlined />
              <div className="ml-3">Ngày bắt đầu dự kiến:</div>
              <div className="ml-3 font-bold">{campaign.jobs.map((position,index)=>(
                <>{position.startDate}</>
              ))}</div>
            </div> */}
          </div>
          </Space>
        </Card>
      ))}
    </div>
    </Content>
    </Layout>
  );
};

export default HRCampaigns;
