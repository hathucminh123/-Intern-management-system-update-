import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Columns, TaskT } from "./Columns";
import { initialTasks } from "./data";
import { AddOutline } from "react-ionicons";
import { onDragEnd } from "./onDragEnd";
import AddTaskModal from "./AddTaskModal";
import Task from "./Task";
import TaskDetailModal from "./TaskDetailModal";
import { Layout, message } from "antd";
import { GetAssessment } from "../../../service/Assessment";
import { v4 as uuidv4 } from "uuid";
import { Taskk } from "../../../assets/data/data";

const { Header, Content } = Layout;

const Boards: React.FC = () => {
    const [columns, setColumns] = useState<Columns>(initialTasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<TaskT | null>(null);
    const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
    const userRole = localStorage.getItem('role')?.toLocaleLowerCase();
    console.log("asda",userRole)
    const openModal = useCallback((columnId: string) => {
        setSelectedColumn(columnId);
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const handleAddTask = useCallback((taskData: TaskT) => {
        setColumns(prevColumns => {
            const newBoard = { ...prevColumns };
            newBoard[selectedColumn].items.push(taskData);
            return newBoard;
        });
    }, [selectedColumn]);

    const handleUpdateTask = useCallback((updatedTask: TaskT) => {
        setColumns(prevColumns => {
            const newBoard = { ...prevColumns };
            const column = newBoard[selectedColumn];
            const taskIndex = column.items.findIndex((task: TaskT) => task.id === updatedTask.id);
            if (taskIndex !== -1) {
                column.items[taskIndex] = updatedTask;
            }
            return newBoard;
        });
    }, [selectedColumn]);

    const openTaskDetailModal = useCallback((task: TaskT, columnId: string) => {
        setSelectedTask(task);
        setSelectedColumn(columnId);
        setTaskDetailModalOpen(true);
    }, []);

    const closeTaskDetailModal = useCallback(() => {
        setTaskDetailModalOpen(false);
    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            // const res = await GetAssessment();
            // const events = res?.events || [];
            const events= Taskk ||[]

            const newTasks: Columns = events.reduce((acc: Columns, event: any) => {
                const column = acc[event.status] || { name: event.status, items: [] };
                const task: TaskT = {
                    id: uuidv4(),
                    title: event.name,
                    description: event.description,
                    priority: event.status, // Assuming priority is not provided in the form, setting a default value
                    deadline: event.estimateTime,
                    image: "", // Assuming image is not provided in the form
                    alt: "", // Assuming alt text is not provided in the form
                    startDate: event.startDate,
                    estimateTime: event.estimateTime,
                    endDate: event.endDate,
                    actualTime: event.actualTime,
                    userId: event.userId,
                    owner: {
                        id: event.owner.id,
                        userName: event.owner.userName,
                        firstName: event.owner.firstName,
                        lastName: event.owner.lastName,
                        email: event.owner.email,
                        phoneNumber: event.owner.phoneNumber,
                        role: event.owner.role
                    },
                    tags: [], // Assuming tags are not provided in the form
                };
                column.items.push(task);
                acc[event.status] = column;
                return acc;
            }, {});

            setColumns(newTasks);
        } catch (error) {
            message.error("Fails: " + error.message);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <Layout>
       
        <Content style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '80vh' }}>
                <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
                    <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
                        {Object.entries(columns).map(([columnId, column]: [string, any]) => (
                            <div className="w-full flex flex-col gap-0" key={columnId}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="flex flex-col md:w-[250px] w-[250px] gap-3 items-center py-5"
                                        >
                                            <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                                             Trạng thái:  {column.name}
                                            </div>
                                            {column.items.map((task: any, index: any) => (
                                                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                                                    {(provided: any) => (
                                                        <Task
                                                            provided={provided}
                                                            task={task}
                                                            onClick={() => openTaskDetailModal(task, columnId)}
                                                        />
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                             {  userRole ==="mentor" &&(
                                <div
                                    onClick={() => openModal(columnId)}
                                    className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[250px] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                                >
                                    <AddOutline color={"#555"} />
                                    Add Task
                                </div>
)}
                            </div>
                        ))}
                    </div>
                </DragDropContext>

                <AddTaskModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    setOpen={setModalOpen}
                    handleAddTask={handleAddTask}
                />
                <TaskDetailModal
                    isOpen={taskDetailModalOpen}
                    onClose={closeTaskDetailModal}
                    setOpen={setTaskDetailModalOpen}
                    handleUpdateTask={handleUpdateTask}
                    task={selectedTask}
                />
            </Content>
        </Layout>
    );
};

export default Boards;
