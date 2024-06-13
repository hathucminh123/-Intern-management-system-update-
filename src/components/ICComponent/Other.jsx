import React, { useState } from "react";
import { Form, Typography, Button, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Title } = Typography;

const Other = ({ onDone }) => {
  const [form] = Form.useForm();
  const [trainingDeliveryPrinciple, setTrainingDeliveryPrinciple] = useState("");

  const handleTrainingDeliveryPrinciple = (value) => {
    setTrainingDeliveryPrinciple(value);
  };

  const onFinish = (values) => {
    if (!trainingDeliveryPrinciple) {
      message.error('Please enter the training delivery principle');
      return;
    }
    onDone({ ...values, trainingDeliveryPrinciple });
  };

  return (
    <div>
      <Title level={1}>Other</Title>
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 600, margin: "0 auto" }}>
        <Form.Item name="trainingDeliveryPrinciple" label="Training Delivery Principle" rules={[{ required: true, message: "Please enter the training delivery principle" }]}>
          <ReactQuill value={trainingDeliveryPrinciple} onChange={handleTrainingDeliveryPrinciple} placeholder="Enter the training delivery principle" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Other;
