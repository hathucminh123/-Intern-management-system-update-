import React, { useState } from "react";
import { Table, Button, Modal, Typography } from "antd";

const { Title } = Typography;

const CvListComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCvImage, setSelectedCvImage] = useState("");

  const showModal = (image) => {
    setSelectedCvImage(image);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      title: "Khác",
      dataIndex: "order",
      key: "order",
      width: 150,
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

  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      otherLinks: "https://linkedin.com",
      order: "abc",
      cvImage:
        "https://marketplace.canva.com/EAFqT5-53BA/1/0/1131w/canva-white-and-green-simple-student-cv-resume-KZWMremeNF8.jpg",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654321",
      otherLinks: "",
      order: "abc",
      cvImage:
        "https://marketplace.canva.com/EAFqT5-53BA/1/0/1131w/canva-white-and-green-simple-student-cv-resume-KZWMremeNF8.jpg",
    },
    // Thêm nhiều dữ liệu hơn nếu cần
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