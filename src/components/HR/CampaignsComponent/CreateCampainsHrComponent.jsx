import React from "react";
import { Form, Input, Button, DatePicker, Select, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const CreateCampaignsHrComponent = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
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
