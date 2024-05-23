import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const FilterDropDown = () => (
  <Space wrap>
    <Select
      defaultValue="Công nghệ"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "Công nghệ",
          label: "Công nghệ",
        },
        {
          value: "DotNet",
          label: "DotNet",
        },
        {
          value: "React",
          label: "React",
        },
        {
          value: "Java",
          label: "Java",
        },
      ]}
    />
    <Select
      defaultValue="Địa Điểm"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "Địa Điểm",
          label: "Địa Điểm",
        },
        {
          value: "Hồ Chí Minh",
          label: "Hồ Chí Minh",
        },
        {
          value: "Hà Nội",
          label: "Hà Nội",
        },
      ]}
    />
  </Space>
);
export default FilterDropDown;
