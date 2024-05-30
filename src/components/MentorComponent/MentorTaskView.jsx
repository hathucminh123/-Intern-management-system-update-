import React, { useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, Rate } from 'antd';

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
      const updatedTask = { ...selectedTask, completed: true, feedback: values.feedback, status: 'complete' };
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
      title: 'Date Range',
      dataIndex: 'dateRange',
      key: 'dateRange',
      render: (range) => range && range.map(date => date.format('YYYY-MM-DD')).join(' To '),
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
         {console.log('record',record)}
          {record?.grade && <Rate value={record.grade}/>}
          
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
    <div>
    <div direction='vertical' size={100} style={{ padding: '20px' }}>
      <Typography.Text style={{ fontSize: '2rem' }}>Intern Tasks</Typography.Text>
      <Table dataSource={tasks} columns={columns} />
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
        </Form>
      </Modal>
    </div>
    </div>
  );
};

export default InternTaskView;
