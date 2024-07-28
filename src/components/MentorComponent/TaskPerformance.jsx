import React, { useEffect, useState } from 'react';
import { Tabs, Layout, Typography, message, Spin } from 'antd';
import TaskCompleted from './TaskCompleted';
import * as Assessment from "../../service/Assessment";
import * as Training from "../../service/TrainingPrograms";

const { Header, Content } = Layout;
const { Title } = Typography;

const TaskPerformance = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);

  // Fetch training programs with proper error handling
  const fetchTraining = async () => {
    try {
      setLoading(true);
      const res = await Training.fetchTrainingUser(localStorage.getItem('userId').toLowerCase());
      setTraining(res.events);
    } catch (error) {
      message.error('Failed to fetch training programs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch assessments based on selected training ID
  const fetchAssessment = async (trainingId) => {
    if (!trainingId) return;
    setLoading(true);
    try {
      const res = await Assessment.GetAssessmentbyTraining(trainingId);
      setTasks(res.events);
    } catch (error) {
      message.error("Failed to fetch assessments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraining();
  }, []);

  useEffect(() => {
    if (selectedTrainingId) {
      fetchAssessment(selectedTrainingId);
    }
  }, [selectedTrainingId]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };

  const items = [
    {
      key: '1',
      label: 'Task List',
      children: (
        <TaskCompleted
          tasks={tasks}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          fetchAssessment={() => fetchAssessment(selectedTrainingId)}
          training={training}
          setSelectedTrainingId={setSelectedTrainingId}
          selectedTrainingId={selectedTrainingId}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Task</Title>
      </Header>
      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <Spin spinning={loading}>
          <Tabs defaultActiveKey="1" items={items} />
        </Spin>
      </Content>
    </Layout>
  );
};

export default TaskPerformance;