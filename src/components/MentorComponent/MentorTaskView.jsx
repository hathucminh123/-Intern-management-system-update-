import React, { useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, Rate, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const InternTaskView = ({ tasks, onCompleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCompleteTask = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const updatedTask = {
        ...selectedTask,
        completed: true,
        feedback: values.feedback,
        status: 'complete',
        files: values.upload ? values.upload.fileList : []
      };
      onCompleteTask(updatedTask);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : '',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'rate',
      dataIndex: 'grade',
      key: 'grade',
      render: (text, record) => (
        <Space size="middle">
          {record?.grade && <Rate value={record.grade} />}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          {!record.completed && <Button onClick={() => handleCompleteTask(record)}>Complete</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2}>Intern Tasks</Typography.Title>
      <Table dataSource={tasks} columns={columns} rowKey="id" />
      <Modal
        title="Complete Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: 'Please provide feedback!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload File"
          >
            <Upload
              beforeUpload={() => false}
              multiple={true}
              listType="text"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InternTaskView;
