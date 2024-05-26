// AddScheduleModal.js
import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/calendarSlice';
import { v4 as uuidv4 } from 'uuid';

const AddScheduleModal = ({ visible, onClose, selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    const { types, events } = form.getFieldsValue();
    const newEvent = { id: uuidv4(), types, events, date: selectedDate };
    dispatch(addEvent(newEvent));
    form.resetFields();
    onClose();
    setSelectedDate(null); // Reset selected date after adding event
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
    setSelectedDate(null); // Reset selected date on modal close
  };

  return (
    <Modal
      title='Tạo Sự Kiện'
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout='vertical'>
        <Form.Item label='Loại Sự Kiện' name='types'>
          <Input placeholder='Nhập loại sự kiện' />
        </Form.Item>
        <Form.Item label='Nội Dung' name='events'>
          <Input.TextArea placeholder='Nhập nội dung sự kiện' />
        </Form.Item>
        <Form.Item label='Ngày'name='date'>
          <Input value={selectedDate} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddScheduleModal;
