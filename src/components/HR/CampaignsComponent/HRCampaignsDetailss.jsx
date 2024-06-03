import React from "react";
import { Typography, Button, Image, Tag } from "antd";
import "tailwindcss/tailwind.css"; // ensure Tailwind CSS is imported
import { useLocation, useParams, useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const HRCampaignsDetailss = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const CampaignDetail = state?.item;

  if (!CampaignDetail) {
    return <div>Job detail not found</div>;
  }

  const handleViewGuestInfoClick = (key) => {
    navigate(`/hrmanager/cvlist`, { state: { programId: key.id, CampaignDetail } });
  };



  return (
    <div className="flex justify-center items-center ">
      <div className="max-w-fit w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="flex mb-8">
          <Image
            width={250}
            preview={false}
            src={CampaignDetail.imagePath}
            className="border-4 border-gray-300 shadow-xl rounded-lg"
          />
          <div className="ml-8">
            <Title className="" level={2}>
              <div>{CampaignDetail.name}</div>
            </Title>
            <div className="flex mt-3">
              <div>Thời gian :</div>
              <Tag className="ml-3" color="#87d068">
                {CampaignDetail.duration}
              </Tag>
            </div>
            <div className="flex mt-3">
              <div>vị trí ứng tuyển </div>
              {CampaignDetail.trainingPrograms.map((jobs, index) => (
                <Button 
                  onClick={() => handleViewGuestInfoClick(jobs)} 
                  className="ml-3 text-red-500" 
                  key={index}
                >
                  {jobs.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <Title className="mt-8" level={3}>
          MÔ TẢ CÔNG VIỆC
        </Title>
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: CampaignDetail.scopeOfWork }} />
        </Paragraph>

        <Title level={3} className="">
          YÊU CẦU CÔNG VIỆC
        </Title>
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: CampaignDetail.requirements }} />
        </Paragraph>

        <Title level={3} className="">
          QUYỀN LỢI
        </Title>
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: CampaignDetail.benefits }} />
        </Paragraph>

        <Title level={3} className="">
          ỨNG TUYỂN
        </Title>
        <Paragraph>
          Ứng viên quan tâm vui lòng gửi CV với tiêu đề mail:{" "}
          <Text strong>[Fresher React Developer - Họ tên]</Text> đến địa chỉ
          email <Text strong>FA.HCM@fpt.com</Text>
        </Paragraph>
        <Paragraph>
          Email: <a href="mailto:FA.HCM@fpt.com">FA.HCM@fpt.com</a>
        </Paragraph>
        <Paragraph>
          Fanpage:{" "}
          <a
            href="https://www.facebook.com/fsoft.academy"
            target="_blank"
            rel="noopener noreferrer"
          >
            FPT Software Academy
          </a>
        </Paragraph>
        <Paragraph>
          Website:{" "}
          <a
            href="https://fsoft-academy.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://fsoft-academy.edu.vn/
          </a>
        </Paragraph>
     
      </div>
    </div>
  );
};

export default HRCampaignsDetailss;
