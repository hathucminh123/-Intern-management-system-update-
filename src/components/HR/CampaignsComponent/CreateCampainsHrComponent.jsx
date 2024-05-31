import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Typography } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const { Title } = Typography;
const { Option } = Select;

const CreateCampaignsHrComponent = () => {
  const [form] = Form.useForm();
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [requirement, seRequirement] = useState("");

  const onFinish = (values) => {
    values.scopeOfWork = scopeOfWork;
    console.log("Form values:", values);
  };

  const handleScopeOfWorkChange = (value) => {
    setScopeOfWork(value);
  };
  const handleRequirement = (value) => {
    seRequirement(value);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="container flex flex-col">
      <Title className="text-center mt-5" level={2}>
        Create New Campaign
      </Title>
      <div className="mt-5">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            name="title"
            label="Campaign Name"
            rules={[
              { required: true, message: "Please enter the campaign title" },
            ]}
          >
            <Input placeholder="Enter the campaign title" />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Campain Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="positions"
            label="Positions"
            rules={[{ required: true, message: "Please select the positions" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select positions"
              style={{ width: "100%" }}
            >
              <Option value="Frontend Developer">Frontend Developer</Option>
              <Option value="Backend Developer">Backend Developer</Option>
              <Option value="Product Mindset">Product Mindset</Option>
              <Option value="Software Development">Software Development</Option>
              <Option value="Communication">Communication</Option>
              <Option value="UX/UI Designer">UX/UI Designer</Option>
              <Option value="Data Analyst">Data Analyst</Option>
              <Option value="Marketing Intern">Marketing Intern</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="duration"
            label="Internship Duration"
            rules={[{ required: true, message: "Please enter the duration" }]}
          >
            <Input placeholder="Enter the duration, e.g., 10 weeks" />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: "Please select the start date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="scopeOfWork"
            label="Scope of Work"
            rules={[
              {
                required: true,
                message: "Please enter the scope of work",
              },
            ]}
          >
            <ReactQuill
              value={scopeOfWork}
              onChange={handleScopeOfWorkChange}
              placeholder="Enter the scope of work"
            />
          </Form.Item>
          <Form.Item
            name="requirement"
            label="Requirement"
            rules={[
              {
                required: true,
                message: "Please enter the requirement",
              },
            ]}
          >
            <ReactQuill
              value={requirement}
              onChange={handleRequirement}
              placeholder="Enter the scope of work"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateCampaignsHrComponent;
