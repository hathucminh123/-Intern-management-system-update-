import React, { useEffect,useState } from 'react';
import { Form, Modal, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import * as Resource from "../../../service/Resource";

const DetailModal = ({ isVisible, onClose, task, onUpdateTask }) => {
  const [form] = Form.useForm();
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(task);
  }, [task, form]);

  const handleBeforeUpload = (file) => {
    setCvFile(file);
    return false;
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      let fileUrl = task.filePath;

      if (cvFile) {
        const fileRef = ref(storage, cvFile.name);
        await uploadBytes(fileRef, cvFile);
        fileUrl = await getDownloadURL(fileRef);
      }

      const updatedTask = { 
        ...task, 
        ...values, 
        id:task.id,
        filePath: fileUrl,
      };
      
      await Resource.editResource(updatedTask);
      onUpdateTask(updatedTask);
      form.resetFields();
      setCvFile(null);
      onClose();
      message.success('Resource updated successfully!');
    } catch (error) {
      message.error("Failed to update resource: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCvFile(null);
    onClose();
  };

  return (
    <Modal
      title="View/Edit Resource"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="editResourceForm"
        layout="vertical"
        initialValues={task}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="filePath"
          label="Upload File"
          rules={[{ required: true, message: 'Please upload your file!' }]}
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
            <p className="ant-upload-text">Drag and drop a file here or click to upload</p>
            <p className="ant-upload-hint">(PDF, DOC, PNG, JPEG)</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
        
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailModal;
