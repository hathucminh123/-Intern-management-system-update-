import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import * as KPI from '../../../service/KPIService';

const DetailKPIModal = ({ isVisible, onClose, task, onUpdateTask }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      
      const updatedTask = { ...task, ...values };
      await KPI.editKPI( updatedTask);
      
      message.success('KPI updated successfully!');
      onUpdateTask(updatedTask);
      onClose();
    } catch (error) {
      message.error('Error updating KPI: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      title="KPI Detail"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={task}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="value"
          label="Value"
          rules={[{ required: true, message: 'Please enter the value' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descition"
          label="Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please enter the type' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailKPIModal;
