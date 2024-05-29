import React from 'react';
import { Modal, Form, Input, Button, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CiLocationOn } from "react-icons/ci"

const { Title, Text } = Typography;

const FormCVModal = ({ visible, onClose ,title}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    // You might want to handle form submission logic here
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      width={1200}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-h-[calc(100vh-48px)] overflow-hidden"
      >
        <div className="flex items-center justify-between bg-neutral-1 px-10 pt-8">
          <Title level={3}>{title}</Title>
        
        </div>
        <div className="px-8 pt-4">
          <Form.Item
            name="cv"
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
              beforeUpload={() => false}
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
            rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
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
            name="portfolio"
            label="Link portfolio"
          >
            <Input placeholder="Link portfolio của bạn" />
          </Form.Item>
          <Form.Item
            name="note"
            label="Khác (nếu có)"
          >
            <Input placeholder="Lời nhắn nhủ bạn muốn gửi tới" />
          </Form.Item>
        </div>
        <div className="px-8 pt-4">
          <Text strong>Địa chỉ làm việc tại GEEK Up</Text>
          <div className="pt-2">
            <div className="flex items-center">
            <CiLocationOn/>
              <Text className="ml-1 text-neutral-10">CN1: Đại học quốc gia</Text>
            </div>
            <div className="flex items-center">
            <CiLocationOn/>
              <Text className="ml-1 text-neutral-10">CN2: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</Text>
            </div>
          </div>
        </div>
        <div className="px-8 pt-4">
          <Button type="primary" htmlType="submit">Nộp đơn</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormCVModal;
 
