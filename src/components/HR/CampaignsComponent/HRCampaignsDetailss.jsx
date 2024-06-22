import React, { useState } from "react";
import { Typography, Button, Image, Tag } from "antd";
import "tailwindcss/tailwind.css"; // ensure Tailwind CSS is imported
import { useLocation, useParams, useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const HRCampaignsDetailss = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const CampaignDetail = state?.item;

  const [showJobs, setShowJobs] = useState(false);

  if (!CampaignDetail) {
    return <div>Job detail not found</div>;
  }

  const handleViewGuestInfoClick = (CampaignDetail, job) => {
    navigate(`/hrmanager/cvlist`, {
      state: { jobID: job.id, CampaignDetail, job: job.name, CampaignID: CampaignDetail.id },
    });
  };

  const handleViewCVListClick = () => {
    setShowJobs(!showJobs);
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row mb-8">
          <Image
            width={250}
            preview={false}
            src={CampaignDetail.imagePath}
            className="border-4 border-gray-300 shadow-xl rounded-lg"
          />
          <div className="ml-0 mt-6 md:ml-8 md:mt-0">
            <Title level={2}>{CampaignDetail.name}</Title>
            <div className="flex items-center mt-3">
              <div>Thời gian:</div>
              <Tag className="ml-3" color="#87d068">
                {CampaignDetail.duration} months
              </Tag>
            </div>
            <div className="flex flex-wrap mt-3">
              <div>Vị trí ứng tuyển:</div>
              {CampaignDetail.jobs.map((job, index) => (
                <Button
                  onClick={() => handleViewGuestInfoClick(CampaignDetail, job)}
                  className="ml-3 mt-2 text-red-500"
                  key={index}
                >
                  {job.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-8">
          <Title level={3}>MÔ TẢ CÔNG VIỆC</Title>
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: CampaignDetail.scopeOfWork }} />
          </Paragraph>
        </div>
        <div className="mt-8">
          <Title level={3}>YÊU CẦU CÔNG VIỆC</Title>
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: CampaignDetail.requirements }} />
          </Paragraph>
        </div>
        <div className="mt-8">
          <Title level={3}>QUYỀN LỢI</Title>
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: CampaignDetail.benefits }} />
          </Paragraph>
        </div>
        <div className="mt-8">
          <Title level={3}>ỨNG TUYỂN</Title>
          <Paragraph>
            Ứng viên quan tâm vui lòng gửi CV với tiêu đề mail:{" "}
            <Text strong>[Fresher React Developer - Họ tên]</Text> đến địa chỉ
            email <Text strong>FA.HCM@fpt.com</Text>
          </Paragraph>
          <Paragraph>Email: <a href="mailto:FA.HCM@fpt.com">FA.HCM@fpt.com</a></Paragraph>
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
        <div className="flex justify-end mt-8">
          <Button type="primary" onClick={handleViewCVListClick}>
            Xem danh sách hồ sơ
          </Button>
        </div>
        {showJobs && (
          <div className="mt-8">
            <Title level={3}>Vị trí ứng tuyển</Title>
            <div className="flex flex-wrap">
              {CampaignDetail.jobs.map((job, index) => (
                <Button
                  onClick={() => handleViewGuestInfoClick(CampaignDetail, job)}
                  className="m-3 text-red-500"
                  key={index}
                >
                  {job.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRCampaignsDetailss;
