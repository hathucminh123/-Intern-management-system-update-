import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, DatePicker, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { getIntern } from '../../api';

const AddModal = ({ isVisible, onClose, onAddTask }) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIntern()
      .then(res => {
        setUser(res.users.splice(0, 20));
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newTask = { 
        id: uuidv4(), 
        ...values, 
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null
      };
      onAddTask(newTask);
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
      title="Add New Task"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="createTaskForm"
        initialValues={{ remember: true }}
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
          <Select
            placeholder="Select user"
            allowClear
          >
            {user.map((item) => (
              <Option key={item.id} value={item.firstName}>{item.firstName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please select the start date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: 'Please select the end date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select
            placeholder="Select status"
            allowClear
          >
         
            <Option value="Pending">Pending</Option>
          
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
