import React, { useState, useEffect } from "react";
import { Button, Typography, message } from "antd";
import { collection, addDoc, getDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import ResourceModal from "./ResourceModal";
import ResourceList from "./ResourceList";

const { Title } = Typography;

const OutLine = ({ trainingProgramId, onNext }) => {
  const [resources, setResources] = useState([]);
  const [trainingProgram, setTrainingProgram] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      if (!trainingProgramId) return;
      const resourcesRef = collection(firestore, "trainingPrograms", trainingProgramId, "resources");
      const querySnapshot = await getDocs(resourcesRef);
      setResources(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    const fetchTrainingProgram = async () => {
      if (!trainingProgramId) return;
      const docRef = doc(firestore, "trainingPrograms", trainingProgramId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setTrainingProgram(docSnap.data());
      else message.error("Training Program not found!");
    };

    fetchResources();
    fetchTrainingProgram();
  }, [trainingProgramId]);

  const handleCreate = async (resource) => {
    if (!trainingProgramId) {
      message.error("Training Program ID is not set. Please complete the previous steps.");
      return;
    }
    try {
      const resourcesRef = collection(firestore, "trainingPrograms", trainingProgramId, "resources");
      const docRef = await addDoc(resourcesRef, resource);
      setResources([...resources, { ...resource, id: docRef.id }]);
      setVisible(false);
      message.success("Resource created successfully!");
    } catch (error) {
      message.error("Failed to create resource!");
      console.error("Error adding resource:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resourceDocRef = doc(firestore, "trainingPrograms", trainingProgramId, "resources", id);
      await deleteDoc(resourceDocRef);
      setResources(resources.filter(resource => resource.id !== id));
      message.success("Resource deleted successfully!");
    } catch (error) {
      message.error("Failed to delete resource!");
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div>
      <Title level={2}>Training Program Details</Title>
      <div>
        <p><strong>Name:</strong> {trainingProgram.name}</p>
        <p><strong>Start Date:</strong> {trainingProgram.startDate}</p>
        <p><strong>Duration:</strong> {trainingProgram.duration}</p>
        <p><strong>Total Members:</strong> {trainingProgram.totalMember}</p>
        <p><strong>Attendee Number:</strong> {trainingProgram.attendeeNumber}</p>
        <p><strong>Technical Requirements:</strong> {trainingProgram.techRequirements}</p>
        <p><strong>Course Objective:</strong> {trainingProgram.courseObjective}</p>
      </div>
      <Title level={2}>Resource Management</Title>
      <Button type="primary" onClick={() => setVisible(true)}>New Resource</Button>
      <ResourceList resources={resources} onDelete={handleDelete} />
      <ResourceModal visible={visible} onCreate={handleCreate} onCancel={() => setVisible(false)} />
      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={() => onNext({ resources })}>Submit</Button>
      </div>
    </div>
  );
};

export default OutLine;
