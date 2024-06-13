import React, { useState } from "react";
import { Form, Input, DatePicker, Typography, Button, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Title } = Typography;

const NewDetailTrainingProgram = ({ onNext, initialData }) => {
  const [form] = Form.useForm();
  const [techRequirements, setTechRequirements] = useState(initialData.techRequirements || "");
  const [courseObjective, setCourseObjective] = useState(initialData.courseObjective || "");

  const onFinish = (values) => {
    if (!techRequirements || !courseObjective) {
      message.error('Please enter all required fields');
      return;
    }
    onNext({ ...values, techRequirements, courseObjective, startDate: values.startDate.format("YYYY-MM-DD") });
  };

  return (
    <div>
      <Title level={1}>Create New Training Program</Title>
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 600, margin: "0 auto" }} initialValues={initialData}>
        <Form.Item name="name" label="Training Program Name" rules={[{ required: true, message: "Please enter the training program name" }]}>
          <Input placeholder="Enter the training program name" />
        </Form.Item>
        <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: "Please select the start date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="duration" label="Duration (in months)" rules={[{ required: true, message: "Please enter the duration" }]}>
          <Input placeholder="Enter the duration" type="number" />
        </Form.Item>
        <Form.Item name="totalMember" label="Total Members" rules={[{ required: true, message: "Please enter the total number of members" }]}>
          <Input placeholder="Enter the total number of members" type="number" />
        </Form.Item>
        <Form.Item name="attendeeNumber" label="Attendee Number" rules={[{ required: true, message: "Please enter the number of attendees" }]}>
          <Input placeholder="Enter the number of attendees" type="number" />
        </Form.Item>
        <Form.Item label="Technical Requirements">
          <ReactQuill value={techRequirements} onChange={setTechRequirements} placeholder="Enter the technical requirements" />
        </Form.Item>
        <Form.Item label="Course Objective">
          <ReactQuill value={courseObjective} onChange={setCourseObjective} placeholder="Enter the course objective" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Next</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewDetailTrainingProgram;
