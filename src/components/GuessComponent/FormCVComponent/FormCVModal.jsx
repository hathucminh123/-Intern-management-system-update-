import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, Typography, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CiLocationOn } from 'react-icons/ci';
import { storage, firestore } from '../../../firebase/config'; // Import your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary functions from Firebase storage
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

const { Title, Text } = Typography;

const FormCVModal = ({ visible, onClose, title, intern, job }) => {
  const [form] = Form.useForm();
  const [cvFile, setCvFile] = useState(null);

  const handleSubmit = async (values) => {
    console.log('Form values:', values); // Log the form values to inspect the structure

    try {
      if (!cvFile) {
        message.error('Please upload your CV!');
        return;
      }

      // Upload file to Firebase Storage
      const fileRef = ref(storage, cvFile.name);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      // Save form data to Firestore
      await addDoc(collection(firestore, 'applications'), {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        list: values.list,
        listjob: values.listjob,
        note: values.note,
        cvUrl: fileUrl,
      });

      message.success('Form submitted successfully!');
      form.resetFields();
      setCvFile(null); // Reset the file state
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
      title={`Apply for ${job?.name || 'the job'}`}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-h-[calc(100vh-48px)] overflow-hidden"
        initialValues={{ name: job?.name || '' }}
      >
        <div className="flex items-center justify-between bg-neutral-1 px-10 pt-8">
          <Title level={3}>{title}</Title>
        </div>

        <div className="px-8 pt-4">
          <Form.Item
            name="cvUrl"
            label={
              <div>
                <Text strong>CV đính kèm</Text>
                <div>Bạn chỉ có thể upload 1 file</div>
              </div>
            }
            rules={[{ required: true, message: 'Please upload your CV!' }]}
          >
            <Upload.Dragger
              name="files"
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
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Please enter your phone number!' }]}
          >
            <Input placeholder="Số điện thoại liên hệ" />
          </Form.Item>
          <Form.Item
            name="list"
            label="Những chương trình training program"
            rules={[{ required: true, message: 'Please select the program to assign the task to!' }]}
          >
            <Select placeholder="chọn training program" allowClear>
              {intern.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="listjob"
            label="vị trí muốn ứng tuyển"
            rules={[{ required: true, message: 'Please select the program to assign the task to!' }]}
          >
            <Select placeholder="chọn vị trí ứng tuyển" allowClear>
              {job && (
                <Select.Option value={job.name}>
                  {job.name}
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="note" label="Khác (nếu có)">
            <Input placeholder="Lời nhắn nhủ bạn muốn gửi tới" />
          </Form.Item>
        </div>
        <div className="px-8 pt-4">
          <Text strong>Địa chỉ làm việc tại GEEK Up</Text>
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
