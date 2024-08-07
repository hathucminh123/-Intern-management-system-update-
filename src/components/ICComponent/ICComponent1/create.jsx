import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Typography, message, Layout, Spin, DatePicker } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';
import * as Training from '../../../service/TrainingPrograms';
import * as Jobss from '../../../service/JobsService';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;
const { Header, Content } = Layout;

const Create = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [courseObject, setCourseObject] = useState("");
  const [outputObject, setOutputObject] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(14, 'days'));

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
    if (startDate) {
      setEndDate(startDate.clone().add(14, 'days'));
      form.setFieldsValue({ endDate: startDate.clone().add(14, 'days') });
    }
  }, [startDate, form]);

  const onFinish = async (values) => {
    setLoading(true);
    const NewTraining = {
      id: uuidv4(),
      ...values,
      courseObject: courseObject,
      outputObject: outputObject,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };

    try {
      const response = await Training.createNewTraining(NewTraining);
      message.success("Training program created successfully!");
      form.resetFields();
      setCourseObject("");
      setOutputObject("");
      navigate('/internshipcoordinators/ViewTrainingProgram');
      console.log("Form values:", response);
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error creating campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseObjectChange = (value) => {
    setCourseObject(value);
  };

  const handleOutputObjectChange = (value) => {
    setOutputObject(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Create Training Programs
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container flex flex-col">
          <div className="mt-5">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                startDate: startDate,
                endDate: endDate,
              }}
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
                label="Job Positions"
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
                rules={[{ required: true, message: "Please enter the duration in months" }]}
              >
                <Input placeholder="Enter the duration, e.g., 10 months" />
              </Form.Item>

              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: "Please select the start date" }]}
              >
                <DatePicker
                 
                  value={startDate}
                  onChange={handleStartDateChange}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: "Please select the end date" }]}
              >
                <DatePicker
              
                  value={endDate}
                
                  style={{ width: "100%" }}
                />
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
                <Button type="primary" htmlType="submit" disabled={loading} block>
                  {loading ? <Spin /> : "Create new training program"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Create;
