import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Select, Card, Row, Col,List } from 'antd';
import { SaveOutlined, CloseOutlined,PlusOutlined ,EditOutlined ,DeleteOutlined  } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const ScheduleDetails = () => {
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm';

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">Detailed Schedule Meeting</h1>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter meeting title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Enter meeting description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Time" name="startTime">
              <DatePicker
                style={{ width: '100%' }}
                showTime={{ format: timeFormat }}
                format={`${dateFormat} ${timeFormat}`}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Time" name="endTime">
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
            <Form.Item label="Status" name="status">
              <Select placeholder="Select status">
                <Option value="scheduled">Scheduled</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Priority" name="priority">
              <Select placeholder="Select priority">
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Attendees" name="userMeetings">
              <Select mode="tags" style={{ width: '100%' }} placeholder="Add attendees">
                <Option value="John Doe">John Doe</Option>
                <Option value="Jane Smith">Jane Smith</Option>
              </Select>
            </Form.Item>
          </Col>

        </Row>
        <Card title="Action Items" className="mb-4">
        <List
          bordered
          dataSource={['Action Item 1', 'Action Item 2']}
          renderItem={item => (
            <List.Item className="flex justify-between">
              {item}
              <div>
                <Button shape="circle" icon={<EditOutlined />} className="mr-2" />
                <Button shape="circle" icon={<DeleteOutlined />} />
              </div>
            </List.Item>
          )}
        />
        <Input placeholder="Add new action item" className="mt-4" prefix={<PlusOutlined />} />
      </Card>
        <div className="flex justify-end">
          <Button type="primary" icon={<SaveOutlined />} className="mr-2">Save</Button>
          <Button type="default" icon={<CloseOutlined />}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default ScheduleDetails;
