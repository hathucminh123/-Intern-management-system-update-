import React, { useEffect } from 'react';
import { Form, Modal, Input, message } from 'antd';
import * as Resource from "../../../service/Resource";

const DetailModal = ({ isVisible, onClose, task, onUpdateTask }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(task);
  }, [task, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedTask = { 
        ...task, 
        ...values, 
        id: task.id,
      };
      await Resource.editResource(updatedTask);
      onUpdateTask(updatedTask);
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Failed to update resource: " + error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="View/Edit Task"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="editTaskForm"
        initialValues={task}
        layout="vertical"
      >
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true, message: 'Please input the resource name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="File"
          name="filePath"
          rules={[{ required: true, message: 'Please select the file' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailModal;
