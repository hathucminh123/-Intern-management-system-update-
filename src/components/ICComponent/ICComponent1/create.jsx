import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Typography, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import * as Training from '../../../service/TrainingPrograms';
import * as Jobss from '../../../service/JobsService';

const { Title } = Typography;
const { Option } = Select;

const Create = () => {
  const [form] = Form.useForm();
  const [courseObject, setCourseObject] = useState("");
  const [outputObject, setOutputObject] = useState("");
  const [jobs, setJobs] = useState([]);
  
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
    const NewTraining = {
      id: uuidv4(),
      ...values,
      courseObject: courseObject,
      outputObject: outputObject,
    };

    try {
      const response = await Training.createNewTraining(NewTraining);
      message.success("Campaign created successfully!");
      form.resetFields();
      setCourseObject("");
      setOutputObject("");
      console.log("Form values:", response);
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error creating campaign:", error);
    }
  };

  const handleCourseObjectChange = (value) => {
    setCourseObject(value);
  };

  const handleOutputObjectChange = (value) => {
    setOutputObject(value);
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
            name="name"
            label="Training Program name"
            rules={[
              { required: true, message: "Please enter the Training title" },
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
            name="courseObject"
            label="Course Object"
            rules={[
              {
                required: true,
                message: "Please enter the course object",
              },
            ]}
          >
            <ReactQuill
              value={courseObject}
              onChange={handleCourseObjectChange}
              placeholder="Enter the course object"
            />
          </Form.Item>
          <Form.Item
            name="outputObject"
            label="Output Object"
            rules={[
              {
                required: true,
                message: "Please enter the output object",
              },
            ]}
          >
            <ReactQuill
              value={outputObject}
              onChange={handleOutputObjectChange}
              placeholder="Enter the output object"
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

export default Create;
