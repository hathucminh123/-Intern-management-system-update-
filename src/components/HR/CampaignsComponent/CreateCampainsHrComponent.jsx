import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Typography, message, DatePicker, Layout, Row, Col, Upload } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import * as Campaign from '../../../service/Campaign';
import * as Jobss from '../../../service/JobsService';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UploadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Header, Content } = Layout;

const CreateCampaignsHrComponent = () => {
  const [form] = Form.useForm();
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jobs, setJobs] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await Jobss.fetchJobs();
        setJobs(res.events);
      } catch (error) {
        message.error("Error fetching jobs: " + error.message);
        console.error("Error fetching jobs:", error);
      }
    };
    fetchAllJobs();
  }, []);

  const onFinish = async (values) => {
    try {
      if (!cvFile) {
        message.error('Please upload an image!');
        return;
      }
      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      const NewCampaigns = {
        id: uuidv4(),
        ...values,
        scopeOfWork: description,
        requirements: requirement,
        benefits: benefits,
        duration: parseInt(values.duration),
        estimateStartDate: values.estimateStartDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        imagePath: fileUrl,
      };


      const response = await Campaign.createNewCampaign(NewCampaigns);
      message.success("Campaign created successfully!");
      form.resetFields();
      navigate('/hrmanager/campaigns');
      setDescription("");
      setRequirement("");
      setBenefits("");
      console.log("Form values:", response);
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error creating campaign:", error);
    }
  };

  const handleScopeOfWorkChange = (value) => {
    setDescription(value);
  };

  const handleRequirement = (value) => {
    setRequirement(value);
  };

  const handleBenefits = (value) => {
    setBenefits(value);
  };
  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Create new Campaign
      </Header>
      <Content style={{ padding: '24px', minHeight: '80vh' }}>
        <div className="container flex flex-col">
          <div className="mt-5">
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
                    label="Campaign Name"
                    rules={[{ required: true, message: "Please enter the campaign name" }]}
                  >
                    <Input placeholder="Enter the campaign name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="estimateStartDate"
                    label="Start Date"
                    rules={[{ required: true, message: "Please enter the start date" }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="duration"
                    label="Internship Duration"
                    rules={[{ required: true, message: "Please enter the duration in months" }]}
                  >
                    <Input placeholder="Enter the duration, e.g., 10 months" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="jobIds"
                    label="Jobs"
                    rules={[{ required: true, message: "Please select the positions" }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select jobs"
                      style={{ width: "100%" }}
                    >
                      {jobs.map(program => (
                        <Option key={program.id} value={program.id}>
                          {program.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="scopeOfWork"
                label="Scope of Work"
                rules={[{ required: true, message: "Please enter the scope of work" }]}
              >
                <ReactQuill
                  value={description}
                  onChange={handleScopeOfWorkChange}
                  placeholder="Enter the scope of work"
                />
              </Form.Item>
              <Form.Item
                name="requirements"
                label="Requirements"
                rules={[{ required: true, message: "Please enter the requirements" }]}
              >
                <ReactQuill
                  value={requirement}
                  onChange={handleRequirement}
                  placeholder="Enter the requirements"
                />
              </Form.Item>
              <Form.Item
                name="benefits"
                label="Benefits"
                rules={[{ required: true, message: "Please enter the benefits" }]}
              >
                <ReactQuill
                  value={benefits}
                  onChange={handleBenefits}
                  placeholder="Enter the benefits"
                />
              </Form.Item>
              {/* <Form.Item
                name="imagePath"
                label="Campaign Image Path"
                rules={[{ required: true, message: "Please enter the campaign image path" }]}
              >
                <Input placeholder="Enter the image path" />
              </Form.Item> */}


              <Form.Item
                name="imagePath"
                label={
                  <div>
                    <Text strong>Campaign Image</Text>
                    <div>You can only upload one file</div>
                  </div>
                }
                rules={[{ required: true, message: 'Please upload an image!' }]}
              >
                <Upload.Dragger
                  name="imagePath"
                  multiple={false}
                  accept=".jpg,.jpeg,.png"
                  beforeUpload={handleBeforeUpload}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Drag and drop a file here or click to upload</p>
                  <p className="ant-upload-hint">(JPG, JPEG, PNG)</p>
                </Upload.Dragger>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create new campaign
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateCampaignsHrComponent;
