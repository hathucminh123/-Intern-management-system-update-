import React from "react";
import { Typography, Button, Image, Tag } from "antd";
import "tailwindcss/tailwind.css"; // đảm bảo Tailwind CSS được import
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
const { Title, Paragraph, Text } = Typography;

const HRCampaignsDetails = () => {
  let { id } = useParams(); 
  const { state } = useLocation();
  const jobDetail = state?.item;
console.log('asdasd',jobDetail)
  if (!jobDetail) {
    return <div>Job detail not found</div>;
  }
  return (
    <div className="flex justify-center items-center ">
      <div className="max-w-fit w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="flex mb-8">
          <Image
            width={250}
            preview={false}
            src={jobDetail.imagePath}
            className="border-4 border-gray-300 shadow-xl rounded-lg"
          />
          <div className="ml-8">
            <Title className="" level={2}>
              <div>{jobDetail.name}</div>
            </Title>
            <div className="flex mt-3">
              <div>Thời gian :</div>
              <Tag className="ml-3" color="#87d068">
                {jobDetail.duration} months
              </Tag>
            </div>
            <div className="flex mt-3">
              <div>Yêu cầu số thành biên </div>
              <div className="ml-3 text-red-500">{jobDetail.totalMember} Thành viên</div>
            </div>
            <div className="flex mt-3">
              <div>Ngày Bắt đầu: </div>
              <div className="ml-3 text-red-500">{moment(jobDetail.startDate).format('DD-MM-YYYY')} </div>
            </div>
          </div>
        </div>
        <hr />
        <Title className="mt-8" level={3}>
          MÔ TẢ CÔNG VIỆC
        </Title>
        <Paragraph>
          <ul className="list-disc list-inside">
          <div dangerouslySetInnerHTML={{ __html: jobDetail.scopeOfWork }} />
          </ul>
        </Paragraph>

        <Title level={3} className="">
          YÊU CẦU CÔNG VIỆC
        </Title>
        <Paragraph>
          <ul className="list-disc list-inside">
          <div dangerouslySetInnerHTML={{ __html: jobDetail.requirements }} />
          </ul>
        </Paragraph>

        <Title level={3} className="">
          QUYỀN LỢI
        </Title>
        <Paragraph>
          <ul className="list-disc list-inside">
          <div dangerouslySetInnerHTML={{ __html: jobDetail.benefits }} />
          </ul>
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

export default HRCampaignsDetails;