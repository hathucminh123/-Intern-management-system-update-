import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Typography, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import { createNewJobs } from '../../../service/JobsService';

const { Title } = Typography;

const CreateNewJobs = () => {
  const [form] = Form.useForm();
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");

  const handleRequirement = (value) => {
    setRequirement(value);
  };
  const handleDescription = (value) => {
    setDescription(value);
  };
  const handleBenefits = (value) => {
    setBenefits(value);
  };

  const onFinish = async (values) => {
    const newJob = {
      id: uuidv4(),
      ...values,
      scopeOfWork: description,
      requirements: requirement,
      benefits
    };

    try {
      const response = await createNewJobs(newJob);
      message.success("Job created successfully!");
      form.resetFields();
      setDescription("");
      setRequirement("");
      setBenefits("");
      console.log("Form values:", response);
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error creating job:", error);
    }
  };

  return (
    <div>
      <Title level={1}>Create new jobs</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          name="name"
          label="Job Name"
          rules={[
            { required: true, message: "Please enter the name of the job" },
          ]}
        >
          <Input placeholder="Enter the job name" />
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
              message: "Please enter the description of the work",
            },
          ]}
        >
          <ReactQuill
            value={description}
            onChange={handleDescription}
            placeholder="Enter the scope of work"
          />
        </Form.Item>
        <Form.Item
          name="requirements"
          label="Requirements"
          rules={[
            {
              required: true,
              message: "Please enter the requirements of the job",
            },
          ]}
        >
          <ReactQuill
            value={requirement}
            onChange={handleRequirement}
            placeholder="Enter the requirements of the job"
          />
        </Form.Item>
        <Form.Item
          name="benefits"
          label="Benefits"
          rules={[
            {
              required: true,
              message: "Please enter the benefits of the job",
            },
          ]}
        >
          <ReactQuill
            value={benefits}
            onChange={handleBenefits}
            placeholder="Enter the benefits of the job"
          />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (in months)"
          rules={[
            { required: true, message: "Please enter the job duration" },
          ]}
        >
          <Input placeholder="Enter the duration of the job" type="number" />
        </Form.Item>
        <Form.Item
          name="totalMember"
          label="Total Members"
          rules={[
            { required: true, message: "Please enter the total number of members" },
          ]}
        >
          <Input placeholder="Enter the total number of members" type="number" />
        </Form.Item>
        <Form.Item>
        <Form.Item
            name="imagePath"
            label="Jobs Image Path"
            rules={[
              {
                required: true,
                message: "Please enter the campaign image path",
              },
            ]}
          >
            <Input placeholder="Enter the image path" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateNewJobs;
