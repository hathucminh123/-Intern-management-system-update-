import React from "react";
import { Input, Space, Button } from "antd";
import FilterDropDown from "./FilterDropDown";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const onSearch = (value, _e, info) => console.log(info?.source, value);
// const handleNewJobs = () => {
//   navigate("/hrmanager/NewJobs");
// };

const SearchBarCampaigns = ({ onSearch, onCreateNew }) => (
  <Space direction="vertical" className="flex flex-row items-center ">
    <Search placeholder="Tìm kiếm" onSearch={onSearch} />
    <FilterDropDown />
    <ButtonComponent
      size="middle"
      styleButton={{ background: "#063970", border: "none" }}
      styleTextButton={{ color: "#fff", fontWeight: "bold" }}
      textbutton="Tìm kiếm"
      onClick={onSearch} // Call onSearch when this button is clicked
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
