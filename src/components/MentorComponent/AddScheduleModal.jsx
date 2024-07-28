import React, { useEffect } from 'react';
import { Form, Modal, Input, DatePicker, Button, Row, Col, message, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import * as Meeting from "../../service/Schedule";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddScheduleModal = ({ visible, onClose, selectedDate, setSelectedDate, fetchSchedule, eventToEdit, setEventToEdit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (eventToEdit) {
      form.setFieldsValue({
        title: eventToEdit.title,
        description: eventToEdit.description,
        startTime: moment(eventToEdit.startTime),
        endTime: moment(eventToEdit.endTime),
        location: eventToEdit.location,
        minutes: eventToEdit.minutes,
        // status: eventToEdit.status,
        priority: eventToEdit.priority,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        startTime: selectedDate ? moment(selectedDate) : null,
        endTime: selectedDate ? moment(selectedDate).add(1, 'hours') : null,
      });
    }
  }, [eventToEdit, selectedDate, form]);

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();
      const { title, startTime, endTime, location, minutes, status, priority } = values;
      const description = form.getFieldValue('description');

      // if (!title || !description || !startTime || !endTime || !location || !minutes || !status || !priority) {
      //   message.error('Please fill in all fields');
      //   return;
      if (!title || !description || !startTime || !endTime || !location || !minutes || !priority) {
        message.error('Please fill in all fields');
        return;
      }

      const formattedStartTime = startTime.toDate();
      const formattedEndTime = endTime.toDate();

      if (eventToEdit) {
        const updatedEvent = {
          ...eventToEdit,
          title,
          description,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          location,
          minutes,
          status,
          priority
        };

        await Meeting.editNewSchedule(updatedEvent);
        setLoading(false);
        await fetchSchedule();
        message.success("Schedule updated successfully");
      } else {
        const newEvent = {
          id: uuidv4(),
          title,
          description,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          location,
          minutes,
          status,
          priority
        };

        await Meeting.createNewSchedule(newEvent);
        // setLoading(true);
        setLoading(false);
        await fetchSchedule();

        message.success("Schedule created successfully");
      }

      form.resetFields();
      onClose();
      setSelectedDate(null);
      setEventToEdit(null);
    } catch (error) {
      message.error('An error occurred while processing the event');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!eventToEdit) return;

      await Meeting.deleteNewSchedule(eventToEdit.id);
      await fetchSchedule();
      form.resetFields();
      onClose();
      setSelectedDate(null);
      setEventToEdit(null);
      message.success("Schedule deleted successfully");
    } catch (error) {
      message.error('Delete Meeting schedule failed');
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
    setSelectedDate(null);
    setEventToEdit(null);
  };

  return (
    <Modal
      title={eventToEdit ? 'Update Event' : 'Create Event'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} >
          Cancel
        </Button>,
        eventToEdit && (
          <Button key="delete" type="danger" onClick={handleDelete}>
            Delete
          </Button>
        ),
        <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
          {eventToEdit ? 'Update' : 'Create'}
        </Button>
      ]}
    >
      <Form form={form} layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Event Title' name='title' rules={[{ required: true, message: 'Please enter the event title' }]}>
              <Input placeholder='Enter event title' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Location' name='location' rules={[{ required: true, message: 'Please enter the event location' }]}>
              <Input placeholder='Enter event location' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Start Time' name='startTime' rules={[{ required: true, message: 'Please select the start time' }]}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='End Time' name='endTime' rules={[{ required: true, message: 'Please select the end time' }]}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
          {eventToEdit? (<Form.Item label='Status' name='status'>
              <Select placeholder='Enter event status' >
                <Select.Option value='Pending'>Pending</Select.Option>
                <Select.Option value='In Progress'>In Progress</Select.Option>
                <Select.Option value='Completed'>Completed</Select.Option>
              </Select>
            </Form.Item>):(
              <><Form.Item label='Status' name='status'>
              <Select placeholder='Enter event status' >
                <Select.Option value='Pending' >Pending</Select.Option>
                {/* <Select.Option value='In Progress'>In Progress</Select.Option>
                <Select.Option value='Completed'>Completed</Select.Option> */}
              </Select>
            </Form.Item> </>
            )}
        
          </Col>
          <Col span={12}>
            <Form.Item label='Priority' name='priority' rules={[{ required: true, message: 'Please enter the event priority' }]}>
              <Select placeholder='Enter event priority' >
                <Select.Option value='High'>High</Select.Option>
                <Select.Option value='Medium'>Medium</Select.Option>
                <Select.Option value='Low'>Low</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label='Description' name='description' rules={[{ required: true, message: 'Please enter the event description' }]}>
              <ReactQuill theme="snow" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label='Minutes' name='minutes' rules={[{ required: true, message: 'Please enter the event minutes' }]}>
              <Input.TextArea placeholder='Enter event minutes' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddScheduleModal;
