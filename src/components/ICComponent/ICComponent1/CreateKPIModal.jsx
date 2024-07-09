import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import * as KPI from '../../../service/KPIService';

const CreateKPIModal = ({ isVisible, onClose, onAddKPI,fetchList }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const newKPI = {
        ...values
      };

      const createdKPI = await KPI.createNewKPI(newKPI);

      message.success('KPI created successfully!');
      onAddKPI(createdKPI);
      form.resetFields();
      fetchList();
      onClose();
    } catch (error) {
      message.error('Error creating KPI: ' + error.message);
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
      title="Create KPI"
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
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Grade Category"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item
          name="descition"
          label="Grade Item"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Weight"
          rules={[{ required: true, message: 'Please enter the type' }]}
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
      </Form>
    </Modal>
  );
};

export default CreateKPIModal;
