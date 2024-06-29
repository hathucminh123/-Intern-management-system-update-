import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Typography, message, Upload,Layout } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import * as Campaign from '../../../service/Campaign';
import * as Jobss from '../../../service/JobsService';

const { Title } = Typography;
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const CreateCampaignsHrComponent = () => {
  const [form] = Form.useForm();
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  // const [imagePath, setImagePath] = useState("");
console.log('jobs',jobs)
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
    const NewCampaigns = {
      id: uuidv4(),
      ...values,
      scopeOfWork: description,
      requirements: requirement,
     
    };

    try {
      const response = await Campaign.createNewCampaign(NewCampaigns);
      message.success("Campaign created successfully!");
      form.resetFields();
      setDescription("");
      setRequirement("");
    
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

  // const handleImageUpload = (info) => {
  //   if (info.file.status === 'done') {
  //     // Set imagePath as string
  //     setImagePath(info.file.response.imagePath);
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  return (
    <Layout >
     <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
       Create new Campaign
      </Header>
  <Content style={{ padding: '24px', minHeight: '80vh' }}>
    <div className="container flex flex-col">
      {/* <Title className="text-center mt-5" level={2}>
        Create New Campaign
      </Title> */}
      <div className="mt-5">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            name="name"
            label="Campaign Name"
            rules={[
              { required: true, message: "Please enter the campaign title" },
            ]}
          >
            <Input placeholder="Enter the campaign title" />
          </Form.Item>
          
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
              {jobs.map(program => (
                <Option key={program.id} value={program.id}>
                  {program.name}
                </Option>
              ))}
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
              value={description}
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
              placeholder="Enter the requirement"
            />
          </Form.Item>
          <Form.Item
            name="imagePath"
            label="Campaign Image Path"
            rules={[
              {
                required: true,
                message: "Please enter the campaign image path",
              },
            ]}
          >
            <Input placeholder="Enter the image path" />
          </Form.Item>
{/* 
          <Form.Item
            name="upload"
            label="Campaign Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
          >
            <Upload
              name="file"
              listType="picture"
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> */}

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

export default CreateCampaignsHrComponent;
