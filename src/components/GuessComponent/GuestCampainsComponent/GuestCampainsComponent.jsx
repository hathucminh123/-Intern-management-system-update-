import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Space, Image } from "antd";
import { ClockCircleOutlined, ScheduleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as Campaign from "../../../service/Campaign"
const { Title } = Typography;
import CategoryListComponent from "../CategoryListComponent/CategoryListComponent";




const internships = [
  {
    id: 1,
    title: "Internship Team Summer 2024",
    positions: [
      "Frontend Developer",
      "Backend Developer",
      "Product Mindset",
      "Software Development",
      "Communication",
    ],
    duration: "10 weeks",
    startDate: "03/06/2024",
    // imgurl:'https://geekadventure.vn/_next/image?url=https%3A%2F%2Fadmin.geekadventure.vn%2Fuploads%2F1710823201921_8ba476a272.jpeg&w=1920&q=90'
  },
  {
    id: 2,
    title: "Internship Program Summer 2024",
    positions: [
      "Frontend Developer",
      "Backend Developer",
      "UX/UI Designer",
      "Data Analyst",
      "Marketing Intern",
    ],
    duration: "12 weeks",
    startDate: "06/07/2024",
    imgurl: 'https://geekadventure.vn/_next/image?url=https%3A%2F%2Fadmin.geekadventure.vn%2Fuploads%2F1710823201921_8ba476a272.jpeg&w=1920&q=90'
  },

];



const GuestCampainsComponent = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  console.log(campaigns)
  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const res = await Campaign.fetchCampaigns();
        setCampaigns(res.events);
        console.log("Campaigns data:", res.events); // Add this line
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaignsData();
  }, []);

  return (
    <Space direction="vertical">


      <Title>Những vị trí ứng tuyển: </Title>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "24px" }}>

        {campaigns.map((campaign) => (

          <div key={campaign.id}>
            {campaign.trainingPrograms.map((position, index) => (
              <Button
                key={index}
                className="rounded-full me-2 mb-6"
                style={{ whiteSpace: "normal" }}
              >
                {position.name}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
        <CategoryListComponent />
        <div>
          {campaigns.map((internship) => (


            <Card
              key={internship.id}
              hoverable={true}
              style={{
                width: 900,
                borderWidth: 3,
                marginBottom: 20,
              }}
              onClick={() => navigate(`/guest/detail/${internship.id}`)}
            >
              <Space direction='horizontal'>
                <div>
                  <Title className="text-center" level={3}>
                    {internship.name}
                  </Title>
                  <div style={{ display: "flex", flexWrap: "wrap", marginTop: "24px" }}>
                    {internship.trainingPrograms.map((position, index) => (
                      <Button
                        key={index}
                        className="rounded-full me-2 mb-6"
                        style={{ whiteSpace: "normal" }}
                      >
                        {position.name}

                      </Button>

                    ))}
                  </div>
                  <div className="flex mt-4">
                    <ClockCircleOutlined />
                    <div className="ml-3">Kỳ thực tập:</div>
                    <div className="ml-3 font-bold">{internship.duration} months</div>
                  </div>
                  {/* <div className="flex mt-4">
              <ScheduleOutlined />
              <div className="ml-3">Ngày bắt đầu dự kiến:</div>
              <div className="ml-3 font-bold">asdasd</div>
            </div> */}
                </div>


                {internship?.imagePath ? (

                  <Image

                    preview={false}
                    src={internship.imagePath}
                    width={300}
                  />

                ) : (
                  // <Image
                  //   preview={false}
                  //   src="path_to_default_image" // Thay đổi bằng đường dẫn ảnh mặc định của bạn
                  //   width={300}
                  // />
                  internships.map((intern, index) => (
                    <Image
                      key={index}
                      preview={false}
                      src={intern.imgurl}
                      width={300}
                    />
                  ))
                )}



              </Space>
            </Card>

          ))}
        </div>
      </div>

    </Space>
  );
};

export default GuestCampainsComponent;
