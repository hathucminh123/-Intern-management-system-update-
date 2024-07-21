import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Select, Row, Col, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Assessment from "../../service/Assessment";
import * as Training from "../../service/TrainingPrograms";
import * as User from "../../service/authService";

const AddModal = ({ isVisible, onClose, onAddTask }) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState([]);
  const [description, setDescription] = useState('');
  const [trainingPrograms, setTrainingPrograms] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await User.fetchUser();
      const filter = res.events.filter((role) => role.role === 0);
      setUser(filter);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchTrainingPrograms = async () => {
    try {
      const res = await Training.fetchTrainingUser(localStorage.getItem("userId").toLowerCase());
      setTrainingPrograms(res.events);
    } catch (error) {
      message.error("Failed to fetch training programs");
    }
  };

  useEffect(() => {
    fetchTrainingPrograms();
  }, []);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newTask = {
        ...values,
        description: description,
      };
      await Assessment.AddAssessment(newTask);
      onAddTask(newTask);
      form.resetFields();
      onClose();
    } catch (error) {
      console.log('Validation Failed:', error);
    }
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
      destroyOnClose
      width={1200}
    >
      <Form form={form} name="createTaskForm" layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Task Name"
              name="name"
              rules={[{ required: true, message: 'Please input the task name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Assigned To"
              name="userId"
              rules={[{ required: true, message: 'Please select the person to assign the task to!' }]}
            >
              <Select placeholder="Select user" allowClear>
                {user.map((u) => (
                  <Select.Option key={u.id} value={u.id}>
                    {u.userName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Training Program"
              name="trainingProgramId"
              rules={[{ required: true, message: 'Please select the training program!' }]}
            >
              <Select placeholder="Select training program" allowClear>
                {trainingPrograms.map((tp) => (
                  <Select.Option key={tp.id} value={tp.id}>
                    {tp.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description of the work!' }]}
            >
              <ReactQuill
                style={{ height: '200px' }}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter the description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddModal;
