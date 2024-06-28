import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Layout, Input, Collapse ,Table } from "antd";
import { useNavigate } from "react-router-dom";
import * as Training from "../../../service/TrainingPrograms";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;

const ViewCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [pageSize]=useState(3)
  const [currentPage,setCurrentPage]=useState(1)


  const columns =[
     {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
     },
     {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
     },
     {
      title: 'file',
      dataIndex: 'filePath',
      key: 'filePath',
      render: (filePath) => <a href={filePath} target="_blank" rel="noopener noreferrer">View File</a>,
     }
        
  ]
  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSelectedTraining = (training) => {
    setSelected(training);
  };

  const filteredCampaigns = campaigns.filter((train) => {
    return train.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const onchange =(page)=>{
    setCurrentPage(page)
  }

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await Training.fetchTraining();
        setCampaigns(res.events);
      } catch (error) {
        message.error("Error fetching campaigns: " + error.message);
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const userRole = localStorage.getItem('role').toLowerCase();
  const handleJobs = (item) => {
    navigate(`/${userRole}/TrainingPrograms/${item.id}`, {
      state: { item },
    });
  };
  const textStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "30px",
    transition: "all 0.3s ease",
  };

  const textHoverStyle = {
    textDecoration: "underline",
    transform: "translate3d(1, 2, 3)",
    color:"blue"
  };

  return (
    <Layout>
      <Header style={{ color: 'white' }}>List training program</Header>
      <Content style={{ padding: '10px', minHeight: '80vh' }}>
        <div className="container flex flex-col">
          <Title className="text-center mt-5" level={2}>
            Training List
          </Title>

          <Search
            size="large"
            placeholder="Tìm Kiếm"
            onSearch={onSearch}
            enterButton
            className="container flex flex-row items-center w-full"
          />

          <Row gutter={[16, 16]} className="mt-5">
            {filteredCampaigns.map((campaign) => (
              <Col key={campaign.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                      // title={
              //   <Title  style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              //   {campaign.name}
              //    </Title>
              // }
              // hoverable={true}
              // bordered={true}
              // onClick={() => handleJobs(campaign)}
                  className="hover:shadow-lg transition-shadow duration-300"
                  style={{ overflow: "hidden", width: "1500px" }}
                >
                  <Collapse onChange={() => handleSelectedTraining(campaign)}>
                    <Panel
                      header={
                        <div className="flex cursor-pointer flex-col">
                          <Title style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            Chương trình thực tập: {campaign.name}
                          </Title>
                          <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "20px" }}>
                            <Text strong style={{ fontSize: '20px' }}>Thời gian:</Text> {campaign.duration} months
                          </p>
                          <Text
                            style={hovered === campaign.id ? { ...textStyle, ...textHoverStyle } : textStyle}
                            onClick={() => handleJobs(campaign)}
                            onMouseEnter={() => setHovered(campaign.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="max-w-fit"
                            
                          >
                           xem chi tiết
                          </Text>
                        </div>
                      }
                      key={campaign.id}
                      style={{ borderRadius: "100px" }}
                    >
                      {/* {campaign.resources.map((item) => ( */}
                        {/* // <p key={item.id}>{item.name}</p> */}
                        <Title>resource</Title>
                        <Table  dataSource={campaign.resources} columns={columns} 
                        pagination={{pageSize:pageSize ,current:currentPage,onChange:onchange}} />
                      {/* ))} */}
                    </Panel>
                  </Collapse>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ViewCampaigns;
