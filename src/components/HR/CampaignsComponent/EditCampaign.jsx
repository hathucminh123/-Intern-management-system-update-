import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Typography, message, DatePicker, Layout, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import * as Campaign from '../../../service/Campaign';
import * as Jobss from '../../../service/JobsService';
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;
const { Header, Content } = Layout;

const EditCampaign = () => {
  const {state} =useLocation(); 
  const CampaignDetail =state?.item;
  const [form] = Form.useForm();
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
console.log("asdasd",CampaignDetail)
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




  useEffect(() => {
    if (CampaignDetail) {
      setRequirement(CampaignDetail.requirements || "");
      setDescription(CampaignDetail.scopeOfWork || "");
      setBenefits(CampaignDetail.benefits || "");
      form.setFieldsValue({
        ...CampaignDetail,
        estimateStartDate: moment(CampaignDetail.estimateStartDate),
      });
    }
  }, [CampaignDetail, form]);

  const onFinish = async (values) => {
    const NewCampaigns = {
      id: CampaignDetail.id,
      ...values,
      scopeOfWork: description,
      requirements: requirement,
      benefits: benefits,
      duration: parseInt(values.duration),
    //   estimateStartDate: values.estimateStartDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    };

    try {
      const response = await Campaign.EditNewCampaign(NewCampaigns);
      message.success("Campaign edit successfully!");
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

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
      {CampaignDetail?.id ? "Edit Campaign" : "Create New Campaign"}
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
                {/* <Col span={12}>
                  <Form.Item
                    name="estimateStartDate"
                    label="Start Date"
                    rules={[{ required: true, message: "Please enter the start date" }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col> */}
                <Col span={12}>
                  <Form.Item
                    name="duration"
                    label="Internship Duration"
                    rules={[{ required: true, message: "Please enter the duration in weeks" }]}
                  >
                    <Input placeholder="Enter the duration, e.g., 10 weeks" />
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="duration"
                    label="Internship Duration"
                    rules={[{ required: true, message: "Please enter the duration in weeks" }]}
                  >
                    <Input placeholder="Enter the duration, e.g., 10 weeks" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="jobIds"
                    label="Positions"
                    rules={[{ required: true, message: "Please select the positions" }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select positions"
                      style={{ width: "100%" }}
                    >
                      {CampaignDetail.jobs.map(program => (
                        <Option key={program.id} value={program.id}>
                          {program.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row> */}
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
              <Form.Item
                name="imagePath"
                label="Campaign Image Path"
                rules={[{ required: true, message: "Please enter the campaign image path" }]}
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
        </div>
      </Content>
    </Layout>
  );
};

export default EditCampaign;
