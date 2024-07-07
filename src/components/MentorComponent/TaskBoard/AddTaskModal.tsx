import React, { useEffect, useState } from "react";
import { getRandomColors } from "./getRandomColors";
import { v4 as uuidv4 } from "uuid";
import { AddAssessment } from "../../../service/Assessment";
import { message,Typography } from "antd";

const {Text,Title} =Typography

interface Tag {
    title: string;
    bg: string;
    text: string;
}

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddTask: (taskData: any) => void;
}

const AddTaskModal = ({ isOpen, onClose, setOpen, handleAddTask }: AddModalProps) => {
    const initialTaskData = {
        id: uuidv4(),
        name: "",
        description: "",
        startDate: "",
        estimateTime: 0, // Khởi tạo với một giá trị số nguyên
        endDate: "",
        actualTime: 0,
        userId: 1,
        status: [] as Tag[],
    };

    const [taskData, setTaskData] = useState(initialTaskData);
    const [tagTitle, setTagTitle] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleAddTag = () => {
        if (tagTitle.trim() !== "") {
            const { bg, text } = getRandomColors();
            const newTag: Tag = { title: tagTitle.trim(), bg, text };
            setTaskData({ ...taskData, status: [...taskData.status, newTag] });
            setTagTitle("");
        }
    };
    const handleRemoveTag = (index: number) => {
        const newStatus = taskData.status.filter((_, i) => i !== index);
        setTaskData({ ...taskData, status: newStatus });
      };

    const closeModal = () => {
        setOpen(false);
        onClose();
        setTaskData(initialTaskData);
    };

    const handleSubmit = async () => {
        const formattedTaskData = {
            ...taskData,
            status: taskData.status.map(tag => tag.title).join(", "), // Chuyển đổi mảng tag thành chuỗi
            startDate: new Date(taskData.startDate).toISOString(),
            endDate: new Date(taskData.endDate).toISOString(),
        };

        try {
            const response = await AddAssessment(formattedTaskData);
            message.success("Task created successfully");
            console.log(response);
        } catch (error: any) {
            message.error(`Error: ${error.message}`);
            console.error("Error creating task:", error);
        }

        closeModal();
        window.location.reload();
    };

    return (
        <div
            className={`w-screen h-screen  place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"
                }`}
        >
            <div
                className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
                onClick={closeModal}
            ></div>
            <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50  items-center gap-3 px-5 py-6">
            <Text className="mr-100">Tên task</Text>
                <input
                    type="text"
                    name="name"
                    value={taskData.name}
                    onChange={handleChange}
                    placeholder="Name"
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
                   <Text className="mr-100">Ngày bắt đầu</Text>
                <input
                    type="datetime-local"
                    name="startDate"
                    value={taskData.startDate}
                    onChange={handleChange}
                    placeholder="Start Date"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                    {/* <Text className="mr-100">Thời gian dự kiến</Text>
                <input
                    type="number"
                    name="estimateTime"
                    value={taskData.estimateTime}
                    onChange={handleChange}
                    placeholder="Estimate Time (hours)"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                />
                    <Text className="mr-100">Thời gian Thực tế</Text>
                <input
                    type="number"
                    name="actualTime"
                    value={taskData.actualTime}
                    onChange={handleChange}
                    placeholder="Actual Time (hours)"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                /> */}
                   <Text className="mr-100">Giao task cho</Text>
                <select
                    name="userId"
                    onChange={handleChange}
                    value={taskData.userId}
                    className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                >
                    <option value={1}>HRAcount</option>
                    {/* Thêm các tùy chọn khác nếu cần */}
                </select>
                <Text className="mr-100">Deadline</Text>
                <input
                    type="datetime-local"
                    name="endDate"
                    value={taskData.endDate}
                    onChange={handleChange}
                    placeholder="End Date"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                  <Text className="mr-100">Trạng thái</Text>
                <select
                    name="status"
                   
                    value={tagTitle}
                    onChange={(e) => setTagTitle(e.target.value)}
                    
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                > 
                <option value="TODO">TODO</option>
                <option value="In-Progress">In-Progress</option>
                <option value="DONE">DONE</option>
                </select>
                <button
                    className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
                    onClick={handleAddTag}
                >
                    Add Tag
                </button>
                <div className="w-full">
                    {taskData.status && <span>Tags:</span>}
                    {taskData.status.map((tag, index) => (
                        <div
                        key={index}
                        className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md cursor-pointer"
                        style={{ backgroundColor: tag.bg, color: tag.text }}
                        onClick={() => handleRemoveTag(index)}
                      >
                        {tag.title}
                      </div>
                    ))}
                </div>
                <button
                    className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
                    onClick={handleSubmit}
                >
                    Submit Task
                </button>
            </div>
        </div>
    );
};

export default AddTaskModal;
