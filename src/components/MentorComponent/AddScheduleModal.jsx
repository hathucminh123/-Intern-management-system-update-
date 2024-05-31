import React, { useEffect } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const AddScheduleModal = ({ visible, onClose, selectedDate, setSelectedDate, setEvents, events, eventToEdit, setEventToEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (eventToEdit) {
      form.setFieldsValue({
        title: eventToEdit.title,
        description: eventToEdit.description,
        date: eventToEdit.start
      });
    } else {
      form.resetFields();
    }
  }, [eventToEdit, form]);

  const handleOk = () => {
    const { title, description } = form.getFieldsValue();
    if (eventToEdit) {
      // Update the event
      const updatedEvent = {
        ...eventToEdit,
        title,
        description,
        start: selectedDate,
        end: moment(selectedDate).add(1, 'hours').toDate()
      };
      const updatedEvents = events.map(event => (event.id === eventToEdit.id ? updatedEvent : event));
      setEvents(updatedEvents);
      console.log('Updated Event:', updatedEvent); // Log the updated event details
    } else {
      // Add new event
      const newEvent = {
        id: uuidv4(),
        title,
        description,
        start: selectedDate,
        end: moment(selectedDate).add(1, 'hours').toDate()
      };
      setEvents([...events, newEvent]);
      console.log('New Event:', newEvent); // Log the new event details
    }
    form.resetFields();
    onClose();
    setSelectedDate(null);
    setEventToEdit(null);
  };

  const handleDelete = () => {
    const updatedEvents = events.filter(event => event.id !== eventToEdit.id);
    setEvents(updatedEvents);
    form.resetFields();
    onClose();
    setSelectedDate(null);
    setEventToEdit(null);
    console.log('Deleted Event:', eventToEdit); // Log the deleted event details
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
    setSelectedDate(null);
    setEventToEdit(null);
  };

  return (
    <Modal
      title={eventToEdit ? 'Cập Nhật Sự Kiện' : 'Tạo Sự Kiện'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        eventToEdit && (
          <Button key="delete" type="danger" onClick={handleDelete}>
            Xóa
          </Button>
        ),
        <Button key="submit" type="primary" onClick={handleOk}>
          {eventToEdit ? 'Cập Nhật' : 'Tạo'}
        </Button>
      ]}
    >
      <Form form={form} layout='vertical'>
        <Form.Item label='Loại Sự Kiện' name='title'>
          <Input placeholder='Nhập loại sự kiện' />
        </Form.Item>
        <Form.Item label='Nội Dung' name='description'>
          <Input.TextArea placeholder='Nhập nội dung sự kiện' />
        </Form.Item>
        <Form.Item label='Ngày' name='date'>
          <Input value={selectedDate ? selectedDate.toString() : ''} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddScheduleModal;
