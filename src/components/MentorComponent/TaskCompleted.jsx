import React, { useState } from 'react';
import { Button, Space, Table, Typography, Input, Modal, Form, Rate } from 'antd';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import ReviewModal from './ReviewModal';

const TaskCompleted = ({ tasks, onAddTask, onUpdateTask }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [taskToReview, setTaskToReview] = useState(null);

  const handleDeleteTask = (key) => {
    onUpdateTask(tasks.filter((task) => task.key !== key));
  };

  const handleOpenDetailModal = (task) => {
    console.log('task',task)
    setSelectedTask(task);
    setOpenDetailModal(true);
  };

  const handleOpenReviewModal = (task) => {
    setTaskToReview(task);
    setOpenReviewModal(true);
  };

  const handleReviewTask = (values) => {
    const updatedTask = { ...taskToReview, feedback: values.feedback, grade: values.grade };
    onUpdateTask(updatedTask);
    setOpenReviewModal(false);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.taskName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Date Range',
      dataIndex: 'dateRange',
      key: 'dateRange',
      render: (range) => range && range.map(date => date.format('YYYY-MM-DD')).join(' To '),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button>
          <Button danger onClick={() => handleDeleteTask(record.key)}>Delete</Button>
          {record.completed && <Button onClick={() => handleOpenReviewModal(record)}>Review</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px'}}>
    
      <Space direction='horizontal' size={1000}>
        <Typography.Title level={1}>Create New Task</Typography.Title>
        <Button type="primary" onClick={() => setOpenAddModal(true)}>Create Task</Button>
      </Space>
      <AddModal
        isVisible={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddTask={onAddTask}
      />
      {selectedTask && (
        <DetailModal
          isVisible={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          task={selectedTask}
          onUpdateTask={onUpdateTask}
        />
      )}
      {taskToReview && (
        <ReviewModal
          isVisible={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          task={taskToReview}
          onReviewTask={handleReviewTask}
        />
      )}
   <div>
      <Input.Search
        placeholder="Search by task name"
        value={searchText}
        onChange={handleSearch}
        style={{ margin: '20px 0', width: '300px' }}
      />
     
     
      <Table dataSource={filteredTasks} columns={columns} />
   
      
  
      </div>
    </div>
  );
};

export default TaskCompleted;
