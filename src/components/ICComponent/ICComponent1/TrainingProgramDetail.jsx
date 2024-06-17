import React, { useState } from "react";
import { Typography, Button, Image, Tag } from "antd";
import "tailwindcss/tailwind.css"; 
import { useLocation, useParams, useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const TrainingProgramDetail = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const CampaignDetail = state?.item;

  const [showJobs, setShowJobs] = useState(false);

  if (!CampaignDetail) {
    return <div>Job detail not found</div>;
  }

//   const handleViewGuestInfoClick = (CampaignDetail, job) => {
//     navigate(`/hrmanager/cvlist`, { state: { jobID: job.id, CampaignDetail, job: job.name, CampaignID: CampaignDetail.id } });
//   };

//   const handleViewCVListClick = () => {
//     setShowJobs(!showJobs);
//   };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-fit w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="flex mb-8">
          {/* <Image
            width={250}
            preview={false}
            src={CampaignDetail.imagePath}
            className="border-4 border-gray-300 shadow-xl rounded-lg"
          /> */}
          <div className="mt-8">
            <Title className="" level={2}>
              <div>{CampaignDetail.name}</div>
            </Title>
            <div className="flex mt-3">
              <div>Thời gian :</div>
              <Tag className="ml-3" color="#87d068">
                {CampaignDetail.duration} months
              </Tag>
            </div>
            <div className="flex mt-3">
              <div>các jobs apply:</div>
              {CampaignDetail.jobs.map((jobs, index) => (
                <Button
                //   onClick={() => handleViewGuestInfoClick(CampaignDetail, jobs)}
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
          Mô tả khóa học
        </Title>
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: CampaignDetail.courseObject }} />
        </Paragraph>

        <Title level={3} className="">
          Kết quả đầu ra
        </Title>
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: CampaignDetail.outputObject }} />
        </Paragraph>



        <Title level={3} className="">
          Ứng tuyển
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

        {/* <div className="flex justify-end mt-8">
          <Button type="primary" onClick={handleViewCVListClick}>
            Xem danh sách hồ sơ
          </Button>
        </div> */}

        {/* {showJobs && (
          <div className="mt-8">
            <Title level={3}>Vị trí ứng tuyển</Title>
            <div>
              {CampaignDetail.jobs.map((jobs, index) => (
                <Button
                  onClick={() => handleViewGuestInfoClick(CampaignDetail, jobs)}
                  className="m-3 text-red-500"
                  key={index}
                >
                  {jobs.name}
                </Button>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TrainingProgramDetail;
