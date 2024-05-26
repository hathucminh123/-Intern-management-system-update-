import React from "react";
import { Typography, Button } from "antd";
import "tailwindcss/tailwind.css"; // đảm bảo Tailwind CSS được import
import { Image, Tag } from "antd";
const { Title, Paragraph, Text } = Typography;
import reactImage from "../../../assets/react_image.jpeg";
import { useParams } from 'react-router-dom';
const jobDescription = [
  "Được đào tạo chuyên sâu về kỹ năng phát triển ứng dụng web với React trong chương trình Fresher kéo dài 3-6 tháng.",
  "Được hướng dẫn bởi các chuyên gia trong lĩnh vực, và tham gia vào các dự án thực tế để nâng cao kỹ năng lập trình.",
  "Sau khi hoàn thành chương trình đào tạo, bạn sẽ tham gia vào các dự án phát triển phần mềm cùng đội ngũ chuyên nghiệp.",
];

const jobRequirements = [
  "Là sinh viên sắp ra trường hoặc mới tốt nghiệp chuyên ngành Công nghệ Thông tin, Kỹ thuật Phần mềm hoặc các ngành liên quan.",
  "Có kiến thức cơ bản về HTML, CSS, JavaScript, và React.",
  "Hiểu biết về các công cụ quản lý mã nguồn như Git.",
  "Có khả năng đọc hiểu tài liệu kỹ thuật và giao tiếp Tiếng Anh cơ bản.",
  "Có thể làm việc full-time từ thứ 2 đến thứ 6 (8h00-17h00).",
];

const benefits = [
  "Tham gia khóa đào tạo với mức hỗ trợ lên đến 20.000.000 VNĐ/tháng.",
  "Trải nghiệm môi trường làm việc hiện đại tại các Campus của FPT Software.",
  "Hưởng các chế độ đãi ngộ khi trở thành nhân viên chính thức: lương tháng 13, xét tăng lương hàng năm, và các phúc lợi khác.",
  "Được đóng BHXH, BHYT, BHTN theo quy định của nhà nước.",
  "Bảo hiểm FPT Care và chế độ nghỉ mát đặc biệt dành riêng cho nhân viên công ty.",
  "Sử dụng các dịch vụ của công ty như sân bóng đá, bóng chuyền, sân tennis, phòng gym, xe đưa đón nhân viên,...",
];



const HRCampaignsDetails = () => {
  let { id } = useParams();
  console.log(id);
  return (
  <div className="flex justify-center items-center min-h-scree">
    <div className="max-w-fit w-full bg-white p-8 shadow-lg rounded-lg">
      <div className="flex mb-8">
        <Image
          width={250}
          preview={false}
          src={reactImage}
          className="border-4 border-gray-300 shadow-xl rounded-lg"
        />
        <div className="ml-8">
          <Title className="" level={2}>
            <div>Thực Tập ReactJs</div>
          </Title>
          <div className="flex mt-3">
            <div>Thời gian :</div>
            <Tag className="ml-3" color="#87d068">
              FullTime
            </Tag>
          </div>
          <div className="flex mt-3">
            <div>Hết hạn :</div>
            <div className="ml-3 text-red-500">10/10/2024</div>
          </div>
        </div>
      </div>
      <hr />
      <Title className="mt-8" level={3}>
        MÔ TẢ CÔNG VIỆC
      </Title>
      <Paragraph>
        <ul className="list-disc list-inside">
          {jobDescription.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </Paragraph>

      <Title level={3} className="">
        YÊU CẦU CÔNG VIỆC
      </Title>
      <Paragraph>
        <ul className="list-disc list-inside">
          {jobRequirements.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </Paragraph>

      <Title level={3} className="">
        QUYỀN LỢI
      </Title>
      <Paragraph>
        <ul className="list-disc list-inside">
          {benefits.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </Paragraph>

      <Title level={3} className="">
        ỨNG TUYỂN
      </Title>
      <Paragraph>
        Ứng viên quan tâm vui lòng gửi CV với tiêu đề mail:{" "}
        <Text strong>[Fresher React Developer - Họ tên]</Text> đến địa chỉ email{" "}
        <Text strong>FA.HCM@fpt.com</Text>
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
      <Button type="primary" href="mailto:FA.HCM@fpt.com">
        Ứng tuyển
      </Button>
    </div>
  </div>
)};

export default HRCampaignsDetails;
