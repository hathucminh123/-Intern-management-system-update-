import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, DatePicker, Select, Row, Col, message, Spin } from 'antd';
import ReactQuill from 'react-quill';
import { getIntern } from '../../api';
import * as Assessment from "../../service/Assessment";
import moment from 'moment';
import * as User from "../../service/authService" 

const DetailModal = ({ isVisible, onClose, task, onUpdateTask }) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState([]);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);

  const FetchUser = async () => {
    setLoading(true);
    try {
      const res = await User.fetchUser();
      setUser(res.events);
    } catch (error) {
      message.error('Fetch User data failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchUser();
  }, []);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        startDate: task.startDate ? moment(task.startDate) : null,
        endDate: task.endDate ? moment(task.endDate) : null,
      });
      setDescription(task.description);
    }
  }, [task, form]);

  const handleDescription = value => {
    setDescription(value);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedTask = {
        ...values,
        id: task.id,
        description: description,
      };
      await Assessment.EditAssessment(updatedTask);
      onUpdateTask(updatedTask);
      form.resetFields();
      onClose();
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit Task Details"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={1200}
    >
      <Spin spinning={loading}>
        <Form form={form} name="editTaskForm" initialValues={{ remember: true }}>
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <Form.Item
                label="Task Name"
                name="name"
                rules={[{ required: true, message: 'Please input the task name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: 'Please select the start date!' }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
              </Form.Item>

              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: 'Please select the end date!' }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select the status!' }]}
              >
                <Select placeholder="Select status" allowClear>
                  <Select.Option value="TODOS">TODOS</Select.Option>
                  <Select.Option value="ON-PROGRESS">ON-PROGRESS</Select.Option>
                  <Select.Option value="DONE">DONE</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the description of the work',
                  },
                ]}
              >
                <ReactQuill
                  style={{ height: '200px' }}
                  value={description}
                  onChange={handleDescription}
                  placeholder="Enter the Description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default DetailModal;
