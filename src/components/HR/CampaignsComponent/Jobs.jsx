import React, { useState, useEffect } from "react";
import { Card, Space, Image, Pagination, message ,Typography} from "antd";
import moment from "moment";
import SearchBarCampaigns from "./SearchBarCampaigns";
import { useNavigate } from "react-router-dom";
import * as Jobss from "../../../service/JobsService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const { Title}=Typography
const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllJobs();
    }, [currentPage, searchTerm]);

    const fetchAllJobs = async () => {
        try {
            const res = await Jobss.fetchJobs({ searchTerm, max: pageSize });
            setJobs(res.events);
            setTotalJobs(res.total);
        } catch (error) {
            message.error("Error fetching jobs: " + error.message);
            console.error("Error fetching jobs:", error);
        }
    };

    const handleDetails = (item) => {
        navigate(`/hrmanager/Detail/${item.id}`, { state: { item } });
    };

    const handleNewJobs = () => {
        navigate("/hrmanager/NewJobs");
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Title className="text-center" level={1}>
        List Jobs
      </Title>
            <Space direction="vertical" className="flex flex-row items-center ">
                <SearchBarCampaigns onSearch={handleSearch} />
                <ButtonComponent
                    styleButton={{ background: "#06701c", border: "none" }}
                    styleTextButton={{ color: "#fff", fontWeight: "bold" }}
                    size="middle"
                    textbutton="Tạo mới"
                    onClick={handleNewJobs}
                />
            </Space>
            <Space
                className="mt-10 flex-col items-center"
                direction="vertical"
                size="large"
            >
                {jobs.map((item) => (
                    <Card
                        key={item.id}
                        hoverable
                        bordered
                        className="items-center"
                        title={<div className="text-3xl">{item.name}</div>}
                        extra={<a href="#">{item.extra}</a>}
                        style={{ width: 900, borderWidth: 3 }}
                        onClick={() => handleDetails(item)}
                    >
                        <div className="flex">
                            <Image
                                className="border-4 border-gray-300 shadow-xl rounded-lg"
                                preview={false}
                                width={200}
                                src={item.imagePath}
                            />
                            <div className="ml-10">
                                <div className="flex">
                                    <p className="font-bold">Thời gian:</p>
                                    <p className="ml-2">{item.duration}</p>
                                </div>
                                <div className="flex">
                                    <p className="font-bold">Hết hạn:</p>
                                    <p className="ml-2">{moment(item.startDate).format('DD-MM-YYYY')}</p>
                                </div>
                                <div className="flex">
                                    <p className="font-bold">Tổng số thành viên:</p>
                                    <p className="ml-2">{item.totalMember}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
                <Pagination
                    className="mt-6"
                    current={currentPage}
                    total={totalJobs}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </Space>
        </div>
    );
};

export default Jobs;
