import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Typography, message, Layout, Upload, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { editNewJobs } from "../../../service/JobsService";
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Header, Content } = Layout;

const EditJob = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const jobDetail = state?.item;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    if (jobDetail) {
      setRequirement(jobDetail.requirements || "");
      setDescription(jobDetail.scopeOfWork || "");
      setBenefits(jobDetail.benefits || "");
      form.setFieldsValue({
        ...jobDetail,
        startDate: moment(jobDetail.startDate),
      });
    }
  }, [jobDetail, form]);

  const handleRequirement = (value) => {
    setRequirement(value);
  };
  const handleDescription = (value) => {
    setDescription(value);
  };
  const handleBenefits = (value) => {
    setBenefits(value);
  };
  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  const onFinish = async (values) => {
    try {
      if (!cvFile) {
        message.error('Please upload an image!');
        return;
      }
      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);
      const updatedJob = {
        id: id,
        ...values,
        scopeOfWork: description,
        requirements: requirement,
        benefits,
        imagePath: fileUrl,
      };


      await editNewJobs(updatedJob);
      message.success("Job updated successfully!");
      navigate("/hrmanager/jobs");
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error updating job:", error);
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
      <Row>
          <Col span={10}>
          <Button className="mb-4 mt-3 flex items-center" onClick={() => navigate(-1)}>
          <LeftOutlined /> Back
        </Button>
          </Col>
          <Col>
          {/* <Title className='mt-3' level={3} style={{ margin: 0 }}>Task Details</Title> */}
          </Col>
        </Row>
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            Edit Developer {jobDetail.name} 
          </Title>
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
                { required: true, message: "Please enter the job name" },
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
              <Input placeholder="Enter the duration of the job in months" type="number" />
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
            <Form.Item
              name="imagePath"
              label={
                <div>
                  <Text strong>Upload Image</Text>
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
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default EditJob;
