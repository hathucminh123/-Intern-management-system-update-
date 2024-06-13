import React, { useState } from 'react';
import { Button, message, Steps, Layout } from 'antd';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import NewDetailTrainingProgram from './NewDetailTrainingProgram';
import OutLine from './OutLine';
import Other from './Other';

const { Header, Content } = Layout;

const CreateTrainingProgram = () => {
  const [current, setCurrent] = useState(0);
  const [trainingProgram, setTrainingProgram] = useState({});
  const [trainingProgramId, setTrainingProgramId] = useState(null);

  const next = (data) => {
    setTrainingProgram({ ...trainingProgram, ...data });
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  const resetForm = () => {
    setCurrent(0);
    setTrainingProgram({});
    setTrainingProgramId(null);
  };

  const handleNext = async (data) => {
    const updatedProgram = { ...trainingProgram, ...data };
    if (!trainingProgramId) {
      try {
        const docRef = await addDoc(collection(firestore, "trainingPrograms"), updatedProgram);
        setTrainingProgramId(docRef.id);
        message.success('Training Program initial step completed successfully!');
      } catch (error) {
        message.error('Failed to create Training Program!');
        console.error("Error creating document: ", error);
        return;
      }
    }
    setTrainingProgram(updatedProgram);
    next();
  };

  const handleDone = async (data) => {
    try {
      const updatedProgram = { ...trainingProgram, ...data };
      if (trainingProgramId) {
        const docRef = doc(firestore, "trainingPrograms", trainingProgramId);
        await updateDoc(docRef, updatedProgram);
        message.success('Training Program completed successfully!');
      }
      resetForm();
    } catch (error) {
      message.error('Failed to complete Training Program!');
      console.error("Error updating document: ", error);
    }
  };

  const steps = [
    { title: 'General', content: <NewDetailTrainingProgram onNext={handleNext} initialData={trainingProgram} /> },
    { title: 'Outline', content: <OutLine trainingProgramId={trainingProgramId} onNext={next} /> },
    { title: 'Other', content: <Other trainingProgramId={trainingProgramId} onDone={handleDone} /> },
  ];

  return (
    <Layout>
      <Header style={{ color: 'white' }}>Create Training Program</Header>
      <Content style={{ padding: '24px', minHeight: '80vh' }}>
        <Steps current={current}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
        </Steps>
        <div style={{ marginTop: 16 }}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && <Button style={{ margin: '0 8px' }} onClick={prev}>Previous</Button>}
          {current < steps.length - 1 && <Button type="primary" onClick={() => steps[current].content.props.onNext(trainingProgram)}>Next</Button>}
          {current === steps.length - 1 && <Button type="primary" onClick={() => steps[current].content.props.onDone(trainingProgram)}>Done</Button>}
        </div>
      </Content>
    </Layout>
  );
};

export default CreateTrainingProgram;
