import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { Button } from "antd";
const { Search } = Input;
import FilterDropDown from "./FilterDropDown";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);
// const handleNewJobs = () => {
//   navigate("/hrmanager/NewJobs");
// };

const SearchBarCampaigns = () => (
  <Space direction="vertical" className="flex flex-row items-center ">
    <Input placeholder="Tìm kiếm" />
    <FilterDropDown />
    <ButtonComponent
      size="middle"
      styleButton={{ background: "#063970", border: "none" }}
      styleTextButton={{ color: "#fff", fontWeight: "bold" }}
      textbutton="Tìm kiếm"
    />
    {/* <ButtonComponent
      styleButton={{ background: "#06701c", border: "none" }}
      styleTextButton={{ color: "#fff", fontWeight: "bold" }}
      size="middle"
    
      textbutton="Tạo mới"
      onClick={handleNewJobs}
    /> */}
  </Space>
);

export default SearchBarCampaigns;
