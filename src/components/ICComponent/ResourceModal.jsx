import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const ResourceModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const handleUpload = (info) => {
    setFile(info.file);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const storage = getStorage();
      const fileRef = ref(storage, `resources/${uuidv4()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      form.resetFields();
      onCreate({ ...values, file: { name: file.name, url: fileURL } });
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create a new resource"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical" name="resource_form">
        <Form.Item
          name="name"
          label="Resource Name"
          rules={[{ required: true, message: "Please input the resource name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="file"
          label="Upload File"
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Upload beforeUpload={() => false} onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResourceModal;
