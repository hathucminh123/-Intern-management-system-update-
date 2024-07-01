import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Typography, message, Layout, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import { createNewJobs } from '../../../service/JobsService';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header, Content } = Layout;

const CreateNewJobs = () => {
  const [form] = Form.useForm();
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const navigate =useNavigate();

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
      navigate('/hrmanager/Jobs')
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
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Create New Job
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            Create New Job
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 800, margin: "0 auto" }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Job Name"
                  rules={[{ required: true, message: "Please enter the job name" }]}
                >
                  <Input placeholder="Enter the job name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="startDate"
                  label="Start Date"
                  rules={[{ required: true, message: "Please select the start date" }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Scope of Work"
              rules={[{ required: true, message: "Please enter the description of the work" }]}
            >
              <ReactQuill
                value={description}
                onChange={handleDescription}
                placeholder="Enter the scope of work"
              />
            </Form.Item>
            <Form.Item
              label="Requirements"
              rules={[{ required: true, message: "Please enter the requirements of the job" }]}
            >
              <ReactQuill
                value={requirement}
                onChange={handleRequirement}
                placeholder="Enter the requirements of the job"
              />
            </Form.Item>
            <Form.Item
              label="Benefits"
              rules={[{ required: true, message: "Please enter the benefits of the job" }]}
            >
              <ReactQuill
                value={benefits}
                onChange={handleBenefits}
                placeholder="Enter the benefits of the job"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="duration"
                  label="Duration (in months)"
                  rules={[{ required: true, message: "Please enter the job duration" }]}
                >
                  <Input placeholder="Enter the duration of the job" type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="totalMember"
                  label="Total Members"
                  rules={[{ required: true, message: "Please enter the total number of members" }]}
                >
                  <Input placeholder="Enter the total number of members" type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="imagePath"
              label="Job Image Path"
              rules={[{ required: true, message: "Please enter the job image path" }]}
            >
              <Input placeholder="Enter the image path" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateNewJobs;
