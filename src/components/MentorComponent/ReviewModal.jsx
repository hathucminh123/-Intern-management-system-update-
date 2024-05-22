import React from 'react';
import { Modal, Form, Input, Rate } from 'antd';

const ReviewModal = ({ isVisible, onClose, task, onReviewTask }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onReviewTask(values);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Review Task"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="reviewTaskForm"
        initialValues={{
          feedback: task.feedback,
          grade: task.grade,
        }}
      >
        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[{ required: true, message: 'Please provide feedback!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ required: true, message: 'Please provide a grade!' }]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
