import React, { useState } from 'react';
import { Tabs } from 'antd';
import TaskCompleted from './TaskCompleted';
import InternTaskView from './MentorTaskView';

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

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default TaskPerformance;
