import React from "react";
import { Card, Space } from "antd";
import SearchBarCampaigns from "./SearchBarCampaigns";
import { Image } from "antd";
import reactImage from "../../../assets/react_image.jpeg";
import nodeJs from "../../../assets/node-js.jpg";
import javaImage from "../../../assets/javaImage.jpg";
import { Pagination } from "antd";
const data = [
  {
    title: "Thực Tập React",
    extra: "Chỉnh sửa",
    image: reactImage,
    details: [
      { label: "Thời gian:", value: "Kéo dài 3-6 tháng" },
      { label: "Hết hạn:", value: "10/10/2024" },
      { label: "Thời gian làm việc:", value: "full time" },
    ],
  },
  {
    title: "Thực Tập Node.js",
    extra: "Chỉnh sửa",
    image: nodeJs,
    details: [
      { label: "Thời gian:", value: "Kéo dài 4-6 tháng" },
      { label: "Hết hạn:", value: "15/11/2024" },
      { label: "Thời gian làm việc:", value: "part time" },
    ],
  },
  {
    title: "Thực Tập Java",
    extra: "Chỉnh sửa",
    image: javaImage,
    details: [
      { label: "Thời gian:", value: "Kéo dài 3-5 tháng" },
      { label: "Hết hạn:", value: "20/12/2024" },
      { label: "Thời gian làm việc:", value: "full time" },
    ],
  },
];

const Campaings = () => (
  <div className="flex flex-col items-center w-full">
    <SearchBarCampaigns />
    <Space
      className="mt-10 flex-col items-center"
      direction="vertical"
      size="large"
    >
      {data.map((item, index) => (
        <Card
          key={index}
          hoverable
          bordered
          className="items-center"
          title={<div className="text-3xl">{item.title}</div>}
          extra={<a href="#">{item.extra}</a>}
          style={{ width: 900 }}
        >
          <div className="flex">
            <Image preview={false} width={200} src={item.image} />
            <div className="ml-10">
              {item.details.map((detail, idx) => (
                <div key={idx} className="flex">
                  <p className="font-bold">{detail.label}</p>
                  <p className="ml-2">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
      <Pagination className="mt-6" defaultCurrent={1} total={50} />
    </Space>
  </div>
);

export default Campaings;
