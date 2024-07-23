import React, { useEffect } from 'react';
import { Modal, Form, Select } from 'antd';
import PropTypes from 'prop-types';

const UpdateModal = ({ isVisible, onClose, task, onSubmit }) => {
 const [form] = Form.useForm();

 useEffect(() => {
 if (task) {
 form.setFieldsValue({
 status: task.status,
 });
 }
 }, [task, form]);

 const handleOk = async () => {
 try {
 const values = await form.validateFields();
 onSubmit(values);
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
 title="Update Task"
 open={isVisible}
 onOk={handleOk}
 onCancel={handleCancel}
 >
 <Form form={form} layout="vertical">
 <Form.Item
 label="Status"
 name="status"
 rules={[{ required: true, message: 'Please select the status!' }]}
 >
 <Select>
 <Select.Option value={0}>Pending</Select.Option>
 <Select.Option value={2}>Completed</Select.Option>
 </Select>
 </Form.Item>
 </Form>
 </Modal>
 );
};

UpdateModal.propTypes = {
 isVisible: PropTypes.bool.isRequired,
 onClose: PropTypes.func.isRequired,
 task: PropTypes.object,
 onSubmit: PropTypes.func.isRequired,
};

UpdateModal.defaultProps = {
  task: null,
};

export default UpdateModal;