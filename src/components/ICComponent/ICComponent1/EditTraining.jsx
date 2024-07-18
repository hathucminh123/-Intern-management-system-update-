import React, { useState, useEffect } from "react";
import { Form, Layout, Typography, message, Input, Button } from 'antd'
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from 'react-router-dom'
import * as Training from "../../../service/TrainingPrograms"
import { values } from "lodash";
const EditTraining = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const TrainingDetails = state?.campaign
  const { Header, Content } = Layout
  const { Title, Text } = Typography
  const [form] = Form.useForm();
  const [courseObject, setCourseObject] = useState("");
  const [outputObject, setOutputObject] = useState("")


  console.log("asd", TrainingDetails)

  useEffect(() => {
    if (TrainingDetails) {
      setCourseObject(TrainingDetails.courseObject || "");
      setOutputObject(TrainingDetails.outputObject || "");
      form.setFieldsValue({
        ...TrainingDetails,

      });
    }

  }, [TrainingDetails, form])

  const handleCourseObject = (values) => {
    setCourseObject(values)
  }

  const handleOutputObject = (values) => {
    setOutputObject(values)
  }


  const onFinish = async (values) => {

    try {
      const EditTraining = {
        ...values,
        id: TrainingDetails.id,
        courseObject: courseObject,
        outputObject: outputObject,


      }
      await Training.EditNewTraining(EditTraining)
      message.success("update completed");
      form.resetFields();
      navigate('/internshipcoordinators/ViewTrainingProgram');
    } catch (error) {
      message.error("update Failed", error.message);
    }
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        Edit Training
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Title className="text-center mb-5" level={2}>
            Edit Training
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            <Form.Item
              name="name"
              label="Training program Name"
              rules={[
                { required: true, message: "Please enter the job name" },
              ]}
            >
              <Input placeholder="Enter the job name" />
            </Form.Item>

            <Form.Item
              label="outputObject"
              rules={[
                {
                  required: true,
                  message: "Please enter the description of the work",
                },
              ]}
            >
              <ReactQuill
                value={outputObject}
                onChange={handleOutputObject}
                placeholder="Enter the scope of work"
              />
            </Form.Item>
            <Form.Item
              label="courseObject"
              rules={[
                {
                  required: true,
                  message: "Please enter the requirements of the job",
                },
              ]}
            >
              <ReactQuill
                value={courseObject}
                onChange={handleCourseObject}
                placeholder="Enter the requirements of the job"
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


            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default EditTraining