import React, { useEffect, useState } from 'react';
import { Tabs, Layout, Typography, message } from 'antd';
import TaskCompleted from './TaskCompleted';
import Boards from './TaskBoard/Board';
import * as Assessment from "../../service/Assessment";

const { Header, Content } = Layout;
const { Title } = Typography;

const TaskPerformance = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAssessment = async () => {
    try {
      const res = await Assessment.GetAssessment();
      setTasks(res.events);
    } catch (error) {
      message.error("Fetch Assessment failed");
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, []);

  // const handleAddTask = (newTask) => {
  //   setTasks((prevTasks) => [...prevTasks, { ...newTask, key: prevTasks.length + 1, completed: false, feedback: null, grade: null }]);
  // };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) => prev.map(item => item.id === updatedTask.id ? updatedTask : item));
  };


  const handleCompleteTask = (completedTask) => {
    handleUpdateTask(completedTask);
  };

  const items = [
    {
      key: '1',
      label: 'Task List',
      children: (
        <TaskCompleted tasks={tasks} onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} fetchAssessment={fetchAssessment} />
      ),
    },
    // {
    //   key: '2',
    //   label: 'Task Board',
    //   children: <Boards />,
    // },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Task</Title>
      </Header>
      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <Tabs defaultActiveKey="1" items={items} />
      </Content>
    </Layout>
  );
};

export default TaskPerformance;
