import React from 'react';
import { Form, Modal, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const DetailModal = ({ isVisible, onClose, task, onUpdateTask }) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedTask = { ...task, ...values, dateRange: values.dateRange ? [values.dateRange[0].startOf('day'), values.dateRange[1].endOf('day')] : task.dateRange };
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
          dateRange: task.dateRange ? [moment(task.dateRange[0]), moment(task.dateRange[1])] : [],
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
          label="RangePicker"
          name="dateRange"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Select placeholder="Chọn trạng thái" allowClear>
            <Option value="done">done</Option>
            <Option value="in progress">in progress</Option>
            <Option value="todos">todos</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailModal;
