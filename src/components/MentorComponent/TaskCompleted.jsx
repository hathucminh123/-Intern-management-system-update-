import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Button, Space, Table, Typography, Input, Popover, DatePicker, Select, Dropdown, Menu, message, Spin,
  Row, Col, Modal, Form
} from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import ReviewModal from './ReviewModal';
import UpdateModal from './UpdateModal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import * as Assessment from "../../service/Assessment";
import * as User from "../../service/authService";

const TaskCompleted = ({ tasks, onAddTask, onUpdateTask, fetchAssessment, training, selectedTrainingId, setSelectedTrainingId }) => {
  const { Title, Text } = Typography;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [taskToReview, setTaskToReview] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [grading, setGrading] = useState(null);
  const [user, setUser] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [assignedToFilter, setAssignedToFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGradingModalVisible, setIsGradingModalVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const userRole = localStorage.getItem('role');

  const fetchUsers = useCallback(async () => {
    try {
      const res = await User.fetchUser();
      const FilterUser = res.events.filter(role => role.role === 0);
      setUser(FilterUser);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
    fetchAssessment();
    navigate(`/${userRole}/taskDetail/${task.id}`, { state: { task, training, selectedTrainingId } });
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

  const handleSelected = (programId) => {
    setSelectedTrainingId(programId);
  };

  const handleUpdateTask = (task) => {
    setTaskToUpdate(task);
    setOpenUpdateModal(true);
  };

  const handleGrading = (id) => {
    setGrading(id);
    setIsGradingModalVisible(true);
  };

  const handleUpdateGrading = async (values) => {
    const StatusData = {
      id: grading,
      point: parseInt(values.point)
    };
    try {
      await Assessment.GradingAssessmentStatus(StatusData);
      message.success('Task graded successfully');
      setIsGradingModalVisible(false);
      form.resetFields();
      fetchAssessment();
    } catch (error) {
      message.error('Point must be between 0 and 10.');
    }
  };

  const handleUpdateTaskSubmit = async (values) => {
    try {
      const updatedTask = { ...taskToUpdate, ...values, id: taskToUpdate.id };
      await Assessment.EditAssessmentStatus(updatedTask);
      onUpdateTask(updatedTask);
      setOpenUpdateModal(false);
      fetchAssessment();
    } catch (error) {
      message.error("Failed to update task");
    }
  };

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const taskNameMatch = task.name ? task.name.toLowerCase().includes(searchText.toLowerCase()) : false;
    const startDateMatch = dateRange[0] ? moment(task.startDate).isBetween(dateRange[0], dateRange[1], 'days', '[]') : true;
    const endDateMatch = dateRange[0] ? moment(task.endDate).isBetween(dateRange[0], dateRange[1], 'days', '[]') : true;
    const assignedToMatch = assignedToFilter ? task.owner?.userName === assignedToFilter : true;

    return taskNameMatch && startDateMatch && endDateMatch && assignedToMatch;
  }), [tasks, searchText, dateRange, assignedToFilter]);

  const content = useMemo(() => (
    <Space direction="vertical">
      <div>
        <Text strong>Assigned To:</Text>
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
  ), [handleAssignedToChange, user]);

  const menu = useCallback((record) => (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" onClick={() => handleDetails(record)}>View</Button>
      </Menu.Item>
      {userRole === "mentor" && (
        <>
          <Menu.Item key="3">
            <Button type="link" onClick={() => handleDeleteTask(record.id)}>Delete</Button>
          </Menu.Item>
             {record.assessmentStatus ==='Completed' && (
 <Menu.Item key="2">
 <Button type="link" onClick={() => handleGrading(record.id)}>Grading</Button>
</Menu.Item>
             )} 
              
         
        </>
      )}
      {record.completed && (
        <Menu.Item key="4">
          <Button type="link" onClick={() => handleOpenReviewModal(record)}>Review</Button>
        </Menu.Item>
      )}
    </Menu>
  ), [handleDetails, handleDeleteTask, userRole, handleOpenReviewModal]);

  const columns = useMemo(() => {
    const baseColumns = [
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
        title: 'In-Progress date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (text, record) => {
          let date = record.startDate;
          if (date === "0001-01-01T00:00:00") {
            date = null;
          } else {
            date = moment(record.startDate).format("YYYY-MM-DD HH:mm");
          }
          return <span>{date}</span>;
        }
      },
      {
        title: 'Completed date',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (text, record) => {
          let date = record.endDate;
          if (date === "0001-01-01T00:00:00") {
            date = null;
          } else {
            date = moment(record.endDate).format("YYYY-MM-DD HH:mm");
          }
          return <span>{date}</span>;
        }
      },
      {
        title: 'Deadline',
        dataIndex: 'deadline',
        key: 'deadline',
        render: (text, record) => moment(record.deadline).format("YYYY-MM-DD HH:mm")
      },
      {
        title: 'Status',
        dataIndex: 'assessmentStatus',
        key: 'assessmentStatus',
        render: (text, record) => (<Text>{record.assessmentStatus}</Text>)
      },
      {
        title: 'Grade',
        dataIndex: 'point',
        key: 'point',
        render: (text, record) => {
          var point = record.point;
          if(point === 0){
                  point=null

          }else{
            (<Text>{record.point}</Text>)}

            return (<Text >{point}</Text>)
          }
       

        
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Dropdown overlay={menu(record)}>
            <Button type="link">
              More <DownOutlined />
            </Button>
          </Dropdown>
        ),
      },
    ];

    if (userRole === "intern") {
      baseColumns.push({
        title: 'Update Progress Status',
        key: 'update',
        render: (text, record) => (
          <Button type="link" onClick={() => handleUpdateTask(record)}>Update</Button>
        ),
      });
    }

    return baseColumns;
  }, [menu, userRole]);

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
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
          onClose={() => {
            setOpenDetailModal(false);
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
      <UpdateModal
        isVisible={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        task={taskToUpdate}
        onSubmit={handleUpdateTaskSubmit}
      />
      <Modal
        title="Grading Task"
        visible={isGradingModalVisible}
        onCancel={() => setIsGradingModalVisible(false)}
        footer={null}
        style={{ top: 100 }}
        width={600}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <Form form={form} onFinish={handleUpdateGrading}>
          <Form.Item
            name="point"
            rules={[{ required: true, message: 'Please enter the grade!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Select
        placeholder="Select a training program"
        allowClear
        onChange={handleSelected}
        style={{ width: '800px', marginBottom: '20px' }}
      >
        {training.map((train) => (
          <Select.Option key={train.id} value={train.id}>
            <Row gutter={[16, 16]}>
              <Col span={12}>{train.name}</Col>
              <Col span={12}>{moment(train.startDate).format('YYYY-MM-DD')} - {moment(train.endDate).format('YYYY-MM-DD')}</Col>
            </Row>
          </Select.Option>
        ))}
      </Select>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Search by task name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <Space>
          <Popover content={content}>
            <Button icon={<FilterOutlined />} />
          </Popover>
          {userRole === "mentor" && (
            <Button type="primary" onClick={() => setOpenAddModal(true)}>Create Task</Button>
          )}
        </Space>
      </div>
      <Spin spinning={loading}>
        <Table
          className="shadow-lg"
          dataSource={filteredTasks}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Spin>
    </div>
  );
};

export default TaskCompleted;
