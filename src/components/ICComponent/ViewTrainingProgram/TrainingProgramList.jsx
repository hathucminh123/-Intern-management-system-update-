import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, message, Modal, Tabs } from "antd";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import ResourceList from "./ResourceList";

const { Title } = Typography;
const { TabPane } = Tabs;

const fetchTrainingPrograms = async () => {
  const trainingPrograms = [];
  const querySnapshot = await getDocs(collection(firestore, "trainingPrograms"));
  querySnapshot.forEach((doc) => {
    trainingPrograms.push({ id: doc.id, ...doc.data() });
  });
  return trainingPrograms;
};

const fetchTrainingProgramDetails = async (id) => {
  const docRef = doc(firestore, "trainingPrograms", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("No such document!");
  }
};

const fetchResources = async (trainingProgramId) => {
  const resources = [];
  const querySnapshot = await getDocs(collection(firestore, "trainingPrograms", trainingProgramId, "resources"));
  querySnapshot.forEach((doc) => {
    resources.push({ id: doc.id, ...doc.data() });
  });
  return resources;
};

const TrainingProgramList = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [resources, setResources] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getTrainingPrograms = async () => {
      try {
        const programs = await fetchTrainingPrograms();
        setTrainingPrograms(programs);
      } catch (error) {
        message.error("Failed to fetch training programs");
        console.error("Error fetching training programs: ", error);
      }
    };

    getTrainingPrograms();
  }, []);

  const handleCardClick = async (id) => {
    try {
      const programDetails = await fetchTrainingProgramDetails(id);
      const programResources = await fetchResources(id);
      setSelectedProgram(programDetails);
      setResources(programResources);
      setVisible(true);
    } catch (error) {
      message.error("Failed to fetch training program details");
      console.error("Error fetching training program details: ", error);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      const resourceDocRef = doc(firestore, "trainingPrograms", selectedProgram.id, "resources", resourceId);
      await deleteDoc(resourceDocRef);
      setResources(resources.filter(resource => resource.id !== resourceId));
      message.success("Resource deleted successfully!");
    } catch (error) {
      message.error("Failed to delete resource!");
      console.error("Error deleting resource:", error);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setSelectedProgram(null);
    setResources([]);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Training Programs</Title>
      <Row gutter={[16, 16]}>
        {trainingPrograms.map((program) => (
          <Col key={program.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={program.name} bordered={false} onClick={() => handleCardClick(program.id)}>
              <p><strong>Duration:</strong> {program.duration} months</p>
              <p><strong>Start Date:</strong> {program.startDate}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedProgram && (
        <Modal
          title={selectedProgram.name}
          visible={visible}
          onCancel={handleClose}
          footer={null}
          width={800}
          style={{cursor:'pointer'}}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <p><strong>Name:</strong> {selectedProgram.name}</p>
              <p><strong>Duration:</strong> {selectedProgram.duration} months</p>
              <p><strong>Start Date:</strong> {selectedProgram.startDate}</p>
              <p><strong>Total Members:</strong> {selectedProgram.totalMember}</p>
              <p><strong>Attendee Number:</strong> {selectedProgram.attendeeNumber}</p>

              <p><strong>Technical Requirements:</strong>    <div dangerouslySetInnerHTML={{ __html: selectedProgram.techRequirements}} /></p>

              <p><strong>Course Objective:</strong>    <div dangerouslySetInnerHTML={{ __html: selectedProgram.courseObjective}} /></p>
            </TabPane>
            <TabPane tab="Outline" key="2">
              <ResourceList resources={selectedProgram.resources} onDelete={handleDeleteResource} />
            </TabPane>
            <TabPane tab="Other" key="3">

              <p><strong>Training Delivery Principle:</strong>   <div dangerouslySetInnerHTML={{ __html: selectedProgram.trainingDeliveryPrinciple}} /></p>
            </TabPane>
          </Tabs>
        </Modal>
      )}
    </div>
  );
};

export default TrainingProgramList;
