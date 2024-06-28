import { TimeOutline } from "react-ionicons";
import { TaskT } from "./Columns";
import React, { useEffect, useState } from "react";

interface TaskProps {
    task: TaskT;
    provided: any;
    onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ task, provided, onClick }) => {
    const { title, description, startDate, endDate, image, alt, tags } = task;

    const [currentDate, setCurrentDate] = useState(new Date());
    const endDateObj = new Date(endDate);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const calculateDifference = (date1, date2) => {
        const diffInMs = date2 - date1;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        const remainingHours = diffInHours % 24;
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;

        return {
            days: diffInDays,
            hours: remainingHours,
            minutes: remainingMinutes,
            seconds: remainingSeconds,
        };
    };

    const { days, hours, minutes, seconds } = calculateDifference(currentDate, endDateObj);

    const progressClass = days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0
        ? "w-[60px] bg-red-500"
        : days === 1 && hours === 0 && minutes === 0 && seconds === 0
            ? "w-[100px] bg-orange-500"
            : "w-[180px] bg-blue-500";

    return (
        <div
            ref={provided.innerRef}
            draggable={true}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
            onClick={onClick}
        >
            {/* {image && alt && (
                <img
                    src={image}
                    alt={alt}
                    className="w-full h-[170px] rounded-lg"
                />
            )} */}
            {/* <div className="flex items-center gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag.title}
                        className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
                        style={{ backgroundColor: tag.bg, color: tag.text }}
                    >
                        {tag.title}
                    </span>
                ))}
            </div> */}
            <div className="w-full flex items-start flex-col gap-0">
                <span className="text-[15.5px] font-medium text-[#555]"> Tên Task: {title}</span>
              <span className="mt-100"> <span className="text-[15.5px] font-medium text-[#555] ">Nội dung: </span>{description}</span>
            </div>
            <div className="w-full border border-dashed"></div>
            <div className="w-full flex items-center flex-col gap-1">
                <div className="flex items-center flex-col gap-1">
                <span className="text-[15.5px] font-medium text-[#555]"> Thời gian còn lại</span>
                    <TimeOutline color={"#666"} width="19px" height="19px" />
                    {days <= 0  && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
                        <span className="text-[13px] text-gray-700">Time's up!</span>
                    ) : (
                        <span className="text-[13px] text-gray-700">
                            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                        </span>
                    )}
                </div>
                <div className={`w-full h-[5px] rounded-full ${progressClass}`}></div>
            </div>
        </div>
    );
};

export default Task;
