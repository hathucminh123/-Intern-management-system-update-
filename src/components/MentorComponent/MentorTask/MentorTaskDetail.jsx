import React, { useState } from "react";
import { Button, Modal } from "antd";
import MentorTaskContent from "../MentorTask/MentorTaskContent";

const MentorTaskDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MentorTaskContent />
      </Modal>
    </>
  );
};
export default MentorTaskDetail;
