import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import * as KPI from '../../service/KPIService';
import * as User from '../../service/User'

const ReportKpiModal = ({ isVisible, onClose, task, onUpdateTask, fetchAllTraining, userId, programId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userRole = localStorage.getItem('role')?.toLowerCase();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const newReport = {
        userId: userId,
        programId: programId,
        userResultDetails: [
          {
            kpiId: task.id,
            value: values.value,
          },
        ],
      };

      await User.PostReportStudent(newReport);

      message.success('KPI updated successfully!');
      onUpdateTask(newReport);
      fetchAllTraining();
      onClose();
    } catch (error) {
      message.error('Error updating KPI: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      title="KPI Detail"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={task}>
        {userRole === 'mentor' && (
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please enter the value' }]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ReportKpiModal;
