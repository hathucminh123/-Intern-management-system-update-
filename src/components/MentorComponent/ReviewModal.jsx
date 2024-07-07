import React from 'react';
import { Modal, Form, Input, Rate, List, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const ReviewModal = ({ isVisible, onClose, task, onReviewTask }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        onReviewTask(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const downloadFile = (fileUrl) => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('File URL is not valid.');
    }
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

      {task.files && task.files.length > 0 && (
        <div>
          <h3>Attached Files</h3>
          <List
            dataSource={task.files}
            renderItem={(file) => (
              <List.Item>
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={() => downloadFile(file.url)}
                >
                  {file.name}
                </Button>
              </List.Item>  
            )}
          />
        </div>
      )}
    </Modal>
  );
};

export default ReviewModal;
