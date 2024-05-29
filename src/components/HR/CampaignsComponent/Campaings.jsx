import React from "react";
import { Card, Space, Image, Pagination } from "antd";
import SearchBarCampaigns from "./SearchBarCampaigns";
import { useNavigate } from "react-router-dom";
import data from "../../../const/jobsDetailData";

const Campaings = () => {
  const navigate = useNavigate();

  const handleDetails = (item) => {
    navigate(`/hr/Detail/${item.id}`, { state: { item } });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBarCampaigns />
      <Space
        className="mt-10 flex-col items-center"
        direction="vertical"
        size="large"
      >
        {data.map((item) => (
          <Card
            key={item.id}
            hoverable
            bordered
            className="items-center"
            title={<div className="text-3xl">{item.title}</div>}
            extra={<a href="#">{item.extra}</a>}
            style={{ width: 900, borderWidth: 3 }}
            onClick={() => handleDetails(item)}
          >
            <div className="flex">
              <Image
                className="border-4 border-gray-300 shadow-xl rounded-lg"
                preview={false}
                width={200}
                src={item.image}
              />
              <div className="ml-10">
                <div className="flex">
                  <p className="font-bold">Thời gian:</p>
                  <p className="ml-2">{item.duration}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Hết hạn:</p>
                  <p className="ml-2">{item.deadline}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Thời gian làm việc:</p>
                  <p className="ml-2">{item.workTime}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <Pagination
          className="mt-6"
          defaultCurrent={1}
          total={data.length}
          pageSize={3}
        />
      </Space>
    </div>
  );
};

export default Campaings;