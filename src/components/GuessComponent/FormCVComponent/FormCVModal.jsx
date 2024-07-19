import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CiLocationOn } from 'react-icons/ci';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createNewCandidate } from '../../../service/Candidate';
import { v4 as uuidv4 } from 'uuid';
import * as UserProfile from "../../../service/authService";
import './formcss.css'

const { Title, Text } = Typography;

const FormCVModal = ({ visible, onClose, title, intern, job, onApplicationSuccess }) => {
  const [form] = Form.useForm();
  const [cvFile, setCvFile] = useState(null);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
          const res = await UserProfile.fetchUserProfile(userId.toLowerCase());
          setUserProfile(res.events);
        } else {
          // message.error('User ID not found in session storage');
        }
      } catch (error) {
        message.error('Fetch User Profile failed');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (!cvFile) {
        message.error('Please upload your CV!');
        return;
      }

      const fileRef = ref(storage, `${uuidv4()}-${cvFile.name}`);
      await uploadBytes(fileRef, cvFile);
      const fileUrl = await getDownloadURL(fileRef);

      const candidateData = {
        ...values,
        firstName: values.fullName.split(' ')[0],
        lastName: values.fullName.split(' ').slice(1).join(' '),
        id: uuidv4(),
        cvPath: fileUrl,
      };

      await createNewCandidate(candidateData);

      message.success('Form submitted successfully!');
      onApplicationSuccess();
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
      bodyStyle={{ padding: 0 }}
    >
      <div className="modal-header">
        <Title level={3} className="modal-title">
          {`Ứng tuyển cho vị trí ${job?.name || 'the job'} trong ${title}`}
        </Title>
      </div>
      <div className="modal-body">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name: job?.name || '', list: intern?.name }}
        >
          <div className="modal-content">
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
              initialValue={userProfile.userName}
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
              initialValue={userProfile.email}
            >
              <Input placeholder="Email liên hệ" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Please enter your phone number!' }]}
              initialValue={userProfile.phoneNumber}
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
          <div className="modal-footer">
            <Text strong>Địa chỉ làm việc tại FPT University</Text>
            <div className="pt-2">
              <div className="flex items-center">
                <CiLocationOn />
                <Text className="ml-1 text-neutral-10">Chi nhánh 1: Đại học quốc gia</Text>
              </div>
              <div className="flex items-center">
                <CiLocationOn />
                <Text className="ml-1 text-neutral-10">
                  Chi nhánh 2: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                </Text>
              </div>
            </div>
            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
              Ứng tuyển
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default FormCVModal;
