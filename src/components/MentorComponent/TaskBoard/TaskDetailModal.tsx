import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskT } from "./Columns";
import { Typography } from "antd";

const { Text } = Typography;

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdateTask: (task: TaskT) => void;
    task: TaskT | null;
}

const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16);
};
const useRole =localStorage.getItem('role')?.toLocaleLowerCase();
const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
    isOpen,
    onClose,
    setOpen,
    handleUpdateTask,
    task,
}) => {
    const initialTaskData: TaskT = {
        id: uuidv4(),
        title: "",
        description: "",
        priority: "",
        deadline: 0,
        image: "",
        alt: "",
        tags: [],
        startDate: "",
        estimateTime: 0,
        endDate: "",
        actualTime: 0,
        userId: 0,
        owner: {
            id: 0,
            userName: "",
            firstName: null,
            lastName: "",
            email: "",
            phoneNumber: null,
            role: 0,
        },
    };

    const [taskData, setTaskData] = useState<TaskT>(initialTaskData);
    const [tagTitle, setTagTitle] = useState("");

    useEffect(() => {
        if (task) {
            setTaskData({
                ...task,
                endDate: formatDateForInput(task.endDate),
                startDate: formatDateForInput(task.startDate),
            });
        } else {
            setTaskData(initialTaskData);
        }
    }, [task]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: name === "deadline" || name === "estimateTime" || name === "actualTime" ? Number(value) : value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if ( e.target) {
                    setTaskData({ ...taskData, image: e.target.result as string });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const closeModal = () => {
        setOpen(false);
        onClose();
        setTaskData(initialTaskData);
    };

    const handleSubmit = () => {
        if (task) {
            handleUpdateTask(taskData);
        }
        closeModal();
    };

    return (
        <div className={`w-screen h-screen fixed top-0 left-0 ${isOpen ? "grid" : "hidden"} place-items-center`}>
            <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={closeModal}></div>
            <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
                <Text className="mr-100">Tên task</Text>
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                <Text className="mr-100">Nội dung</Text>
                <input
                    type="text"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                <Text className="mr-100">Tên người làm</Text>
                <input
                    type="text"
                    name="owner.userName"
                    onChange={handleChange}
                    value={taskData.owner.userName}
                    placeholder="Tên người làm"
                    className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                <Text>Ngày bắt đầu</Text>
                <input
                    type="datetime-local"
                    name="startDate"
                    value={taskData.startDate}
                    onChange={handleChange}
                    placeholder="Start Date"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                <Text>Ngày kết thúc</Text>
                <input
                    type="datetime-local"
                    name="endDate"
                    value={taskData.endDate}
                    onChange={handleChange}
                    placeholder="End Date"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                <Text className="mr-100">Priority</Text>
                <select
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                >
                    <option value="TODO">TODO</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="DONE">DONE</option>
                </select>

           
                <button
                    className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
                    onClick={handleSubmit}
                >
                    {task ? "Update Task" : "Submit Task"}
                </button>
               
            </div>
        </div>
    );
};

export default TaskDetailModal;
