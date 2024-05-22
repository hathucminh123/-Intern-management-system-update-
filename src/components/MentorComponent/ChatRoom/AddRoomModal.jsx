import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addRoom, setIsAddRoomVisible } from '../../../redux/roomSlice';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique ids

export default function AddRoomModal({ isVisible, onClose }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    // Get form values
    const { name, description } = form.getFieldsValue();

    // Generate a unique id for the new room
    const newRoom = { id: uuidv4(), name, description };

    // Add new room to Redux store
    dispatch(addRoom(newRoom));

    // Reset form values
    form.resetFields();

    // Close the modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form values
    form.resetFields();

    // Close the modal
    onClose();
  };

  return (
    <Modal
      title='Tạo phòng'
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout='vertical'>
        <Form.Item label='Tên phòng' name='name'>
          <Input placeholder='Nhập tên phòng' />
        </Form.Item>
        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Nhập mô tả' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
