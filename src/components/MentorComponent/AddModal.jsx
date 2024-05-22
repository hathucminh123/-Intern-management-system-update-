  import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, DatePicker,Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { getIntern } from '../../api';

const AddModal = ({ isVisible, onClose, onAddTask }) => {
  const [form] = Form.useForm();
  const [user,setUser]=useState([]);

  useEffect(() => {

    getIntern()
        .then(res => {
            setUser(res.users.splice(0, 20));
            
        })
        .catch(err => {
            setError(err);
            
        });
}, []);
console.log('user',user)
console.log('setUser',setUser)
  const { RangePicker } = DatePicker;
const {Option}=Select;
  const handleOk = () => {
    form.validateFields().then((values) => {
      const newTask = { id: uuidv4(), ...values };
      onAddTask(newTask); // Call the function to add the task
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
      placeholder="chọn người dùng"
      allowClear
      
      >
      items={user.map((item) => (
      <Select.Option key={item.id} value={item.firstName}>{item.firstName}</Select.Option>
    ))}


      </Select>
        </Form.Item>

        <Form.Item
            label="RangePicker"
            name="dateRange"
           rules={[{required: true,message: 'Please input!',
        },
      ]}
    >
      <RangePicker />
    </Form.Item>
    <Form.Item
            label="Status"
            name="status"
           rules={[{required: true,message: 'Please input!',
        },
      ]}
    >

      <Select
      placeholder="chon trang thai"
      allowClear
      
      >
        <Option value="done">done</Option>
        <Option value="in progress">in progress</Option>
        <Option value="todos">todos</Option>

      </Select>
 
    </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
