import React from 'react';
import { Form, Modal, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const DetailModal = ({ isVisible, onClose, task, onUpdateTask }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedTask = { 
        ...task, 
        ...values, 
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : task.startDate,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : task.endDate 
      };
      onUpdateTask(updatedTask);
      form.resetFields();
      onClose();
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
      title="View/Edit Task"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="editTaskForm"
        initialValues={{
          taskName: task.taskName,
          description: task.description,
          assignedTo: task.assignedTo,
          startDate: task.startDate ? moment(task.startDate) : null,
          endDate: task.endDate ? moment(task.endDate) : null,
          status: task.status,
        }}
      >
        <Form.Item
          label="Task Name"
          name="taskName"
          rules={[{ required: true, message: 'Please input the task name!' }]}
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
          label="Assigned To"
          name="assignedTo"
          rules={[{ required: true, message: 'Please select the person to assign the task to!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please select the start date!' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: 'Please select the end date!' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select placeholder="Chọn trạng thái" allowClear>
            <Option value="done">Done</Option>
            <Option value="in progress">In Progress</Option>
            <Option value="todos">To Do</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailModal;
