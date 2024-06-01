import React, { useState } from "react";
import { Table, Button, Modal, Typography, Select } from "antd";

const { Title } = Typography;

const CvListComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCvImage, setSelectedCvImage] = useState("");
  const [data, setData] = useState([
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      otherLinks: "https://linkedin.com",
      status: "Received",
      cvImage:
        "https://marketplace.canva.com/EAFqT5-53BA/1/0/1131w/canva-white-and-green-simple-student-cv-resume-KZWMremeNF8.jpg",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654321",
      otherLinks: "",
      status: "Under Review",
      cvImage:
        "https://marketplace.canva.com/EAFqT5-53BA/1/0/1131w/canva-white-and-green-simple-student-cv-resume-KZWMremeNF8.jpg",
    },
    {
      key: "3",
      name: "Trần Thị C",
      email: "tranthib@example.com",
      phone: "0987654321",
      otherLinks: "",
      status: "Interview Scheduled",
      cvImage:
        "https://marketplace.canva.com/EAFqT5-53BA/1/0/1131w/canva-white-and-green-simple-student-cv-resume-KZWMremeNF8.jpg",
    },
    // Thêm nhiều dữ liệu hơn nếu cần
  ]);

  const showModal = (image) => {
    setSelectedCvImage(image);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (key, value) => {
    setData((prevData) =>
      prevData.map((item) => 
        item.key === key ? { ...item, status: value } : item
      )
    );
    console.log(data);
  };

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Link profolio",
      dataIndex: "otherLinks",
      key: "otherLinks",
      render: (text) => (text ? <a href={text}>{text}</a> : "N/A"),
      width: 250,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleChange(record.key, value)}
          options={[
            { value: 'UnderReview', label: 'Under Review' },
            { value: 'Received', label: 'Received' },
            { value: 'InterviewScheduled', label: 'Interview Scheduled' },
          ]}
        />
      ),
    },
    {
      title: "CV Image",
      key: "cvImage",
      render: (record) => (
        <Button type="primary" onClick={() => showModal(record.cvImage)}>
          Xem CV
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <div>
      <Title level={1}>Danh sách CV</Title>
      <Table columns={columns} dataSource={data} scroll={{ x: 1200 }} />
      <Modal
        title="CV Image"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <img
          src={selectedCvImage}
          alt="CV"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
};

export default CvListComponent;
