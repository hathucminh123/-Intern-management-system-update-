import React, { useState, useEffect } from 'react';
import {
  Button, Space, Table, Typography, Input, Popover, DatePicker, Select, Tag, Dropdown, Menu, message
} from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import ReviewModal from './ReviewModal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import * as Assessment from "../../service/Assessment";
import * as User from "../../service/authService";

const TaskCompleted = ({ tasks, onAddTask, onUpdateTask, fetchAssessment }) => {
  const { Text, Title } = Typography;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [taskToReview, setTaskToReview] = useState(null);
  const [user, setUser] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [assignedToFilter, setAssignedToFilter] = useState('');
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const userRole = localStorage.getItem('role');

  const fetchUsers = async () => {
    try {
      const res = await User.fetchUser();
      setUser(res.events);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await Assessment.DeleteAssessment(id);
      message.success("Assessment deleted successfully");
      fetchAssessment();
    } catch (error) {
      message.error("Failed to delete assessment");
    }
  };

  const handleOpenDetailModal = (task) => {
    setSelectedTask(task);
    setOpenDetailModal(true);
  };

  const handleDetails = (task) => {
    navigate(`/${userRole}/taskDetail/${task.id}`, { state: { task } });
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

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dateStrings);
  };

  const handleAssignedToChange = (value) => {
    setAssignedToFilter(value);
  };

  const filteredTasks = tasks.filter(task => {
    const taskNameMatch = task.name ? task.name.toLowerCase().includes(searchText.toLowerCase()) : false;
    const startDateMatch = dateRange[0] ? moment(task.startDate).isBetween(dateRange[0], dateRange[1], 'days', '[]') : true;
    const endDateMatch = dateRange[0] ? moment(task.endDate).isBetween(dateRange[0], dateRange[1], 'days', '[]') : true;
    const assignedToMatch = assignedToFilter ? task.owner?.userName === assignedToFilter : true;

    return taskNameMatch && startDateMatch && endDateMatch && assignedToMatch;
  });

  const content = (
    <Space direction="vertical">
      <div>
        Date Range:
        <RangePicker onChange={handleDateRangeChange} />
      </div>
      <div>
        Assigned To:
        <Select
          placeholder="Choose user"
          allowClear
          onChange={handleAssignedToChange}
          style={{ width: '100%' }}
        >
          {user.map(item => (
            <Select.Option key={item.id} value={item.userName}>{item.userName}</Select.Option>
          ))}
        </Select>
      </div>
    </Space>
  );

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={() => handleDetails(record)}>View</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={() => handleOpenDetailModal(record)}>Edit</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button onClick={() => handleDeleteTask(record.id)}>Delete</Button>
      </Menu.Item>
      {record.completed && (
        <Menu.Item key="4">
          <Button onClick={() => handleOpenReviewModal(record)}>Review</Button>
        </Menu.Item>
      )}
    </Menu>
  );

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Assigned To',
      dataIndex: 'owner',
      key: 'owner',
      render: (owner) => owner ? <span>{owner.userName}</span> : 'N/A',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : '',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : '',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          {record.status.toUpperCase() === "DONE" && (
            <Tag color='green'>
              {record.status.toUpperCase()}
            </Tag>
          )}
          {record.status.toUpperCase() === "ON-PROGRESS" && (
            <Tag color='geekblue'>
              {record.status.toUpperCase()}
            </Tag>
          )}
          {record.status.toUpperCase() === "TODOS" && (
            <Tag color='blue'>
              {record.status.toUpperCase()}
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)}>
            <Button>
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  if (tasks.some(task => task.feedback)) {
    columns.splice(columns.findIndex(column => column.key === 'endDate') + 1, 0, {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    });
  }

  if (tasks.some(task => task.files)) {
    const feedbackColumnIndex = columns.findIndex(column => column.key === 'feedback');
    columns.splice(feedbackColumnIndex + 1, 0, {
      title: 'Files',
      dataIndex: 'files',
      key: 'files',
      render: (files) => (
        <Space>
          {files.map(file => (
            <Tag color="blue" key={file.name}>
              {file.name}
            </Tag>
          ))}
        </Space>
      ),
    });
  }

  return (
    <>
      <AddModal
        isVisible={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          fetchAssessment();  
        }}
        onAddTask={(newTask) => {
          onAddTask(newTask);
          fetchAssessment();  
        }}
      />
      {selectedTask && (
        <DetailModal
          isVisible={openDetailModal}
          onClose={() => {setOpenDetailModal(false);
            fetchAssessment();
          }}
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
      <div style={{ marginBottom: '20px' }}>
        <Input.Search
          placeholder="Search by task name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px', marginRight: '30px' }}
        />
        {userRole === "mentor" && (
          <Button style={{ marginRight: '10px' }} type="primary" onClick={() => setOpenAddModal(true)}>Create Task</Button>
        )}
        <Popover content={content}>
          <Button style={{ marginRight: '30px' }} icon={<FilterOutlined />} />
        </Popover>
      </div>
      <Table className="shadow-lg" dataSource={filteredTasks} columns={columns} />
    </>
  );
};

export default TaskCompleted;
