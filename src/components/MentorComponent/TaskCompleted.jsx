import React, { useState, useEffect, Children } from 'react';
import { Button, Space, Table, Typography, Input, Modal, Form, Rate, Popover, DatePicker,Select,Tag ,Dropdown,Menu } from 'antd';
import {
  FilterOutlined,
  DownOutlined 
} from '@ant-design/icons';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import ReviewModal from './ReviewModal';
import { getIntern } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { gettest1 } from'../../redux/userSlice';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
const TaskCompleted = ({ tasks, onAddTask, onUpdateTask }) => {
  const {Text,Title}=Typography
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [taskToReview, setTaskToReview] = useState(null);
  const [user, setUser] = useState([]);
  const navigate =useNavigate();
  // const test = useSelector((state) => state.user.test);
  // console.log('hiep',test);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(gettest1())
    getIntern()
      .then(res => {
        setUser(res.users.splice(0, 20));
      })
      .catch(err => {
        setError(err);
      });
  }, []);
  const handleDeleteTask = (key) => {
    onUpdateTask(tasks.filter((task) => task.key !== key));
  };

  const handleOpenDetailModal = (task) => {
    console.log('task', task)
    setSelectedTask(task);
    setOpenDetailModal(true);
  };

  const handleDetails =(task)=>{
    navigate(`/mentor/taskDetail/${task.id}`,{state : {task}}) 
  }

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

  let value
  {tasks.map((task)=>(
    value=task
  ))}
  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">
        {/* <Button onClick={() => handleOpenDetailModal(record)}>View/Edit</Button> */}
        <Button onClick={() => handleDetails(record)}>View/Edit</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button  onClick={() => handleDeleteTask(record.key)}>Delete</Button>
      </Menu.Item>
      {record.completed && (
        <Menu.Item key="3">
          <Button onClick={() => handleOpenReviewModal(record)}>Review</Button>
        </Menu.Item>
      )}
    </Menu>
  );

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
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
      render: (text,record) => (
      
       <span>
        {record.status.toUpperCase() === "DONE" &&
        (
          <Tag color='green'>
             {record.status.toUpperCase()}
          </Tag>
        
        )}
         {record.status.toUpperCase() === "ON-PROGRESS" &&
        (
          <Tag color='geekblue'>
             {record.status.toUpperCase()}
          </Tag>
        
        )}
           {record.status.toUpperCase() === "TODOS" &&
        (
          <Tag color='blue'>
             {record.status.toUpperCase()}
          </Tag>
        
        )}
        </span>
        
      ),
    },
    // {
    //   title: 'Feedback',
    //   dataIndex: 'feedback',
    //   key: 'feedback',
    // },
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


  const content = (
    <Space>
      <div>
      start Date  : <DatePicker />
      </div>
      <div>
      End Date   : <DatePicker />
      </div>
      <div>
      Assigned To
      <Select
        placeholder="chọn người dùng"
        allowClear

      >
       
       {user.map((item) => (
          <Select.Option key={item.id} value={item.firstName}>{item.firstName}</Select.Option>
        ))}
    


      </Select>
      </div>
    </Space>
  );

  if (value?.feedback){
    const endDateColumnIndex = columns.findIndex(column => column.key === 'endDate');
    if (endDateColumnIndex !== -1) {
      columns.splice(endDateColumnIndex + 1, 0, {
        title: 'Feedback',
        dataIndex: 'feedback',
        key: 'feedback',
      });
  
    }
  }
  
  if (value?.files) {
    const feedbackColumnIndex = columns.findIndex(column => column.key === 'feedback');
    if (feedbackColumnIndex !== -1) {
      const filesColumn = {
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
      };
      columns.splice(feedbackColumnIndex + 1, 0, filesColumn);
    }
  }
  return (
    <>
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
      <div style={{ marginBottom: '20px' }}>
        <Input.Search
          placeholder="Search by task name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px', marginRight: '30px' }}
        />
        <Button style={{ marginRight: '10px' }} type="primary" onClick={() => setOpenAddModal(true)}>Create Task</Button>
        <Popover content={content}>
          <Button style={{ marginRight: '30px' }} icon={<FilterOutlined />} />
        </Popover>
      </div>

      <Table   className="shadow-lg" dataSource={filteredTasks} columns={columns} />
    </>
  );
};

export default TaskCompleted;