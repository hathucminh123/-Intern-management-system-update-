import React, { useState } from 'react';
import { Tabs,Layout } from 'antd';
import TaskCompleted from './TaskCompleted';
import InternTaskView from './MentorTaskView';
 
const { Header, Content, Footer } = Layout;

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
      label: 'Task Manager',
      children: (
        <TaskCompleted tasks={tasks} onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} />
      ),
    },
    {
      key: '2',
      label: 'Intern View',
      children: (
        <InternTaskView tasks={tasks} onCompleteTask={handleCompleteTask} />
      ),
    },
  ];

  return (
  <Layout>
  <Header style={{ color: 'white' }}>Task</Header>
  <Content style={{ padding: '24px', minHeight: '80vh' }}>
  <Tabs defaultActiveKey="1" items={items} />;
  </Content>

</Layout>
  )
};

export default TaskPerformance;
