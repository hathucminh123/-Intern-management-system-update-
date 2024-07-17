import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, Typography, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CiLocationOn } from 'react-icons/ci';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createNewCandidate } from '../../../service/Candidate';
import { v4 as uuidv4 } from 'uuid';

const { Title, Text } = Typography;

const FormCVModal = ({ visible, onClose, title, intern, job }) => {
  const [form] = Form.useForm();
  const [cvFile, setCvFile] = useState(null);

  const handleSubmit = async (values) => {
    console.log('Form values:', values);

    try {
      if (!cvFile) {
        message.error('Please upload your CV!');
        return;
      }

      // Upload file to Firebase Storage
      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      // Prepare candidate data
      const candidateData = {
        ...values,
        firstName: values.fullName.split(' ')[0],
        lastName: values.fullName.split(' ').slice(1).join(' '),
        id: uuidv4(),
        cvPath: fileUrl,
      };

      // Create a new candidate using the provided API
      await createNewCandidate(candidateData);

      message.success('Form submitted successfully!');
      form.resetFields();
      setCvFile(null);
      onClose();
    } catch (error) {
      message.error('Error submitting form. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      width={1200}
      title={`Ứng tuyển cho vị trí ${job?.name || 'the job'}`}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: job?.name || '', list: intern?.name }}
      >
        <div className="flex items-center justify-between bg-neutral-1 px-10 pt-8">
          <Title level={3}>chiến dịch thực tập: {title}</Title>
        </div>

        <div className="px-8 pt-4">
          <Form.Item
            name="cvPath"
            label={
              <div>
                <Text strong>CV đính kèm</Text>
                <div>Bạn chỉ có thể upload 1 file</div>
              </div>
            }
            rules={[{ required: true, message: 'Please upload your CV!' }]}
          >
            <Upload.Dragger
              name="cvPath"
              multiple={false}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              beforeUpload={handleBeforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Kéo thả file vào đây hoặc tải lên</p>
              <p className="ant-upload-hint">(PDF, DOC, PNG, JPEG)</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Please enter your full name!' }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Email liên hệ" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Please enter your phone number!' }]}
          >
            <Input placeholder="Số điện thoại liên hệ" />
          </Form.Item>
          <Form.Item
            name="education"
            label="Trường bạn đang học"
            rules={[{ required: true, message: 'Please enter your school!' }]}
          >
            <Input placeholder="Nhập trường bạn đang học" />
          </Form.Item>
          <Form.Item
            name="campaignId"
            initialValue={intern?.id}
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="jobId"
            initialValue={job?.id}
            hidden
          >
            <Input />
          </Form.Item>
        </div>
        <div className="px-8 pt-4">
          <Text strong>Địa chỉ làm việc tại FPT University</Text>
          <div className="pt-2">
            <div className="flex items-center">
              <CiLocationOn />
              <Text className="ml-1 text-neutral-10">CN1: Đại học quốc gia</Text>
            </div>
            <div className="flex items-center">
              <CiLocationOn />
              <Text className="ml-1 text-neutral-10">
                CN2: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
              </Text>
            </div>
          </div>
        </div>
        <div className="px-8 pt-4">
          <Button type="primary" htmlType="submit">
            Nộp đơn
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormCVModal;
