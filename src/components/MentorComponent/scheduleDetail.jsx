import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Card, Row, Col, List, message, Space } from 'antd';
import { SaveOutlined, CloseOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as User from '../../service/authService';
import * as Meeting from '../../service/Schedule';

const { TextArea } = Input;
const { Option } = Select;

const ScheduleDetails = () => {
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm';
  const [form] = useForm();
  const { state } = useLocation();
  const schedule = state?.item;
  const [users, setUsers] = useState([]);
  const [actionItems, setActionItems] = useState([]);
  const [description, setDescription] = useState('');

  if (!schedule) {
    return <div>Job detail not found</div>;
  }

  const fetchUser = async () => {
    try {
      const res = await User.fetchUser();
      setUsers(res.events);
    } catch (error) {
      message.error("Fetch User Failed ..");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        ...schedule,
        startTime: moment(schedule.startTime, `${dateFormat} ${timeFormat}`),
        endTime: moment(schedule.endTime, `${dateFormat} ${timeFormat}`)
      });
      setDescription(schedule.description || '');
      setActionItems(schedule.userMeetings || []);
    }
  }, [form, schedule]);

  const onFinish = async (values) => {
    console.log('Form Values:', values);
    try {
      await Meeting.updateSchedule(schedule.id, { ...values, description });
      message.success("Schedule updated successfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to update schedule");
    }
  };

  const handleAddUser = async (userId) => {
    try {
      await Meeting.createUserNewSchedule(schedule.id, userId);
      message.success("User added successfully");
      setActionItems([...actionItems, users.find(user => user.id === userId)]);
    } catch (error) {
      message.error("Failed to add user");
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await Meeting.deleteUserNewSchedule(schedule.id, userId);
      message.success("User removed successfully");
      setActionItems(actionItems.filter((item) => item.id !== userId));
    } catch (error) {
      message.error("Failed to remove user");
    }
  };

  const userRole =localStorage.getItem('role')

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">Detailed Schedule Meeting</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Card title="Meeting Details" className="mb-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the meeting title' }]}>
                <Input placeholder="Enter meeting title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <ReactQuill value={description} onChange={setDescription} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Time" name="startTime" rules={[{ required: true, message: 'Please select the start time' }]}>
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: timeFormat }}
                  format={`${dateFormat} ${timeFormat}`}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Time" name="endTime" rules={[{ required: true, message: 'Please select the end time' }]}>
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: timeFormat }}
                  format={`${dateFormat} ${timeFormat}`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Location" name="location">
                <Input placeholder="Enter meeting location" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Minutes" name="minutes">
                <TextArea rows={4} placeholder="Enter meeting minutes" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the status' }]}>
                <Select placeholder="Select status">
                  <Option value="scheduled">Scheduled</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select the priority' }]}>
                <Select placeholder="Select priority">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Action Attendees" className="mb-4">
          <List
            className='shadow-lg'
            bordered
            dataSource={actionItems}
            renderItem={(item) => (
              <List.Item className="flex justify-between">
                <Space direction='vertical'>
                  <strong>UserName:</strong> {item.userName}
                  <strong>Email:</strong> {item.email}
                </Space>
           {(userRole ==="mentor" || userRole === "hrmanager" || userRole=== "internshipcoordinators") &&(
 <div>
 <Button shape="circle" className="justify-end" icon={<DeleteOutlined />} onClick={() => handleRemoveUser(item.id)} />
</div>
           )}     
               
              </List.Item>
            )}
          />
          <Select
            placeholder="Add new attendee"
            className="mt-4"
            suffixIcon={<PlusOutlined />}
            onChange={handleAddUser}
          >
            {users.map((item) => (
              <Option key={item.id} value={item.id}>{item.userName}</Option>
            ))}
          </Select>
        </Card>
        {/* <div className="flex justify-end">
          <Button type="primary" icon={<SaveOutlined />} className="mr-2" htmlType="submit">Save</Button>
          <Button type="default" icon={<CloseOutlined />}>Cancel</Button>
        </div> */}
      </Form>
    </div>
  );
};

export default ScheduleDetails;
