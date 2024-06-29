import React, { useState } from 'react';
import { Tabs,Layout ,Typography} from 'antd';
import TaskCompleted from './TaskCompleted';
import InternTaskView from './MentorTaskView';
 import Boards from './TaskBoard/Board';
const { Header, Content, Footer } = Layout;
const {Text,Title}= Typography

const TaskPerformance = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    console.log('newTask',newTask)
    setTasks((prevTasks) => [...prevTasks, { ...newTask, key: prevTasks.length + 1, completed: false, feedback: null, grade: null }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.key === updatedTask.key ? updatedTask : task)));
  };

  const handleCompleteTask = (completedTask) => {
    handleUpdateTask(completedTask);
  };

  const items = [
    {
      key: '1',
      label: 'Task List',
      children: (
        <TaskCompleted tasks={tasks} onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} />
      ),
    },
    {
      key: '2',
      label: 'Task Board',
      children: (
        // <InternTaskView tasks={tasks} onCompleteTask={handleCompleteTask} />
        <Boards/>
      ),
    },
  ];

  return (
    <Layout>
    <Header style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
      <Title level={3} style={{ margin: 0 }}>Task</Title>
    </Header>
    <Content style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
  <Tabs defaultActiveKey="1" items={items} />;
  </Content>

</Layout>
  )
};

export default TaskPerformance;
