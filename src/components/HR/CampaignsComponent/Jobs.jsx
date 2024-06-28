import React, { useState, useEffect } from "react";
import { Card, Space, Image, Pagination, message, Typography, Layout, Input } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import * as Jobss from "../../../service/JobsService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const { Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(2); // Items per page
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (value) => setSearchQuery(value);

  const filteredJobs = jobs.filter((job) => {
    const matchesName = job.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesName;
  });

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const res = await Jobss.fetchJobs();
      setJobs(res.events);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate jobs to display based on current page and page size
  const currentJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Layout>
      <Header style={{ color: 'white' }}>List Jobs</Header>
      <Content style={{ padding: '24px', minHeight: '80vh' }}>
        <div className="flex flex-col items-center w-full">
          <Title className="text-center" level={1}>
            List Jobs
          </Title>
          <Space direction="vertical" className="flex flex-row items-center">
            <Search
              size="large"
              placeholder="Tìm Kiếm"
              onSearch={onSearch}
              enterButton
            />
            <ButtonComponent
              styleButton={{ background: "#06701c", border: "none" }}
              styleTextButton={{ color: "#fff", fontWeight: "bold" }}
              size="middle"
              textbutton="Tạo mới"
              onClick={handleNewJobs}
            />
          </Space>
          <Space className="mt-10 flex-col items-center" direction="vertical" size="large">
            {currentJobs.map((item) => (
              <Card
                key={item.id}
                hoverable
                bordered
                className="items-center"
                title={<div className="text-3xl">Lập trình viên {item.name}</div>}
                extra={<a href="#">{item.extra}</a>}
                style={{ width: 900, borderWidth: 3 }}
                onClick={() => handleDetails(item)}
              >
                <div className="flex">
                  <Image
                    className="border-4 border-gray-300 shadow-xl rounded-lg"
                    preview={false}
                    width={200}
                    height={150}
                    src={item.imagePath}
                  />
                  <div className="ml-10">
                    <div className="flex">
                      <p className="font-bold">Thời gian:</p>
                      <p className="ml-2">{item.duration} months</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold">Ngày bắt đầu:</p>
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
              total={filteredJobs.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default Jobs;
