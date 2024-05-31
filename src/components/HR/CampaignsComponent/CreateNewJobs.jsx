import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Typography,
  Upload,
} from "antd";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Title } = Typography;

const CreateNewJobs = () => {
  const [form] = Form.useForm();
  const [requirement, seRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [apply, setApply] = useState("");
  const handleRequirement = (value) => {
    seRequirement(value);
  };
  const handleDescription = (value) => {
    setDescription(value);
  };
  const handleBenefits = (value) => {
    setBenefits(value);
  };
  const handleApply = (value) => {
    setApply(value);
  };
  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div>
      <div>
        <Title level={1}>Create new jobs</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            name="nameJobs"
            label="Name Jobs"
            rules={[
              { required: true, message: "Please enter the name of job" },
            ]}
          >
            <Input placeholder="Enter the Job name" />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Jobs Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="jobtype"
            label="Job Type"
            rules={[{ required: true, message: "Please select the positions" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select Job type"
              style={{ width: "100%" }}
            >
              <Option value="Frontend Developer">Part-time</Option>
              <Option value="Backend Developer">Full-time</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="expireDate"
            label="ExpireDate Date"
            rules={[
              { required: true, message: "Please select the ExpireDate Date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description of jobs"
            rules={[
              {
                required: true,
                message: "Please enter the Description of work",
              },
            ]}
          >
            <ReactQuill
              value={description}
              onChange={handleDescription}
              placeholder="Enter the requirement of jobs"
            />
          </Form.Item>
          <Form.Item
            name="requirement"
            label="Requirement of jobs"
            rules={[
              {
                required: true,
                message: "Please enter the scope of work",
              },
            ]}
          >
            <ReactQuill
              value={requirement}
              onChange={handleRequirement}
              placeholder="Enter the requirement of jobs"
            />
          </Form.Item>
          <Form.Item
            name="benefits"
            label="Benefits of jobs"
            rules={[
              {
                required: true,
                message: "Please enter the benefits of work",
              },
            ]}
          >
            <ReactQuill
              value={benefits}
              onChange={handleBenefits}
              placeholder="Enter the requirement of jobs"
            />
          </Form.Item>
          <Form.Item
            name="apply"
            label="Apply Link"
            rules={[
              {
                required: true,
                message: "Please enter apply information",
              },
            ]}
          >
            <ReactQuill
              value={apply}
              onChange={handleApply}
              placeholder="Enter the requirement of jobs"
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

export default CreateNewJobs;
