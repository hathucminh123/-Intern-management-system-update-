import React from "react";
import { Input, Space, Button } from "antd";
import FilterDropDown from "./FilterDropDown";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const { Search } = Input;

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
    <ButtonComponent
      styleButton={{ background: "#06701c", border: "none" }}
      styleTextButton={{ color: "#fff", fontWeight: "bold" }}
      size="middle"
      textbutton="Tạo mới"
      onClick={onCreateNew} // Call onCreateNew when this button is clicked
    />
  </Space>
);

export default SearchBarCampaigns;
